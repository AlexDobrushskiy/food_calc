from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.db.models import Sum

USER_ROLE_USER = 0
USER_ROLE_MANAGER = 1
USER_ROLE_ADMIN = 2

USER_ROLE_CHOICES = (
    (USER_ROLE_USER, 'User'),
    (USER_ROLE_MANAGER, 'Manager'),
    (USER_ROLE_ADMIN, 'Admin'),
)

CALORIES_PER_DAY_DEFAULT = 2000


class User(AbstractUser):
    role = models.IntegerField(choices=USER_ROLE_CHOICES, default=USER_ROLE_USER)


class MealManager(models.Manager):
    def with_calories_by_day(self):
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("""
      SELECT q.id, q.date, q.user_id, q.text, q.calories, s.sumc 
      FROM main_meal q 
      JOIN (SELECT date, user_id, sum(calories) as sumc from main_meal GROUP BY date, user_id) s 
      ON 
      q.date=s.date AND q.user_id=s.user_id""")
            result_list = []
            for row in cursor.fetchall():
                p = self.model(id=row[0], date=row[1], user_id=row[2], text=row[3], calories=row[4])
                p.sum_calories_per_day = row[4]
                result_list.append(p)
        return result_list


class Meal(models.Model):
    objects = MealManager()
    # Each entry has a date, time, text, and num of calories.
    date = models.DateField()
    time = models.TimeField()
    text = models.CharField(max_length=100)
    calories = models.PositiveIntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    @property
    def exceeded_calories_per_day(self):
        calories_per_day = Meal.objects.filter(date=self.date, user=self.user).aggregate(sum=Sum('calories'))['sum']
        setting, _ = CaloriesPerDay.objects.get_or_create(user=self.user)
        return calories_per_day > setting.value

    def __str__(self):
        return '{} by user {}'.format(self.text, self.user.username)


class CaloriesPerDay(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    value = models.PositiveIntegerField(default=CALORIES_PER_DAY_DEFAULT)

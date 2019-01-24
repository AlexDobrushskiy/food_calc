from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

USER_ROLE_USER = 0
USER_ROLE_MANAGER = 1
USER_ROLE_ADMIN = 2

USER_ROLE_CHOICES = (
    ('User', USER_ROLE_USER),
    ('Manager', USER_ROLE_MANAGER),
    ('Admin', USER_ROLE_ADMIN),
)


class User(AbstractUser):
    role = models.IntegerField(choices=USER_ROLE_CHOICES, default=USER_ROLE_USER)


class Meal(models.Model):
    # Each entry has a date, time, text, and num of calories.
    date = models.DateField()
    time = models.TimeField()
    text = models.TextField()
    calories = models.IntegerField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)

    def __str__(self):
        return '{} by user {}'.format(self.text, self.user.username)

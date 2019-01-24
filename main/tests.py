import json

from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIClient

from main.models import User, Meal, USER_ROLE_ADMIN, USER_ROLE_MANAGER, USER_ROLE_USER


class MealResourceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='taksa')
        self.user_client = APIClient()
        self.user_client.force_authenticate(user=self.user)

        self.admin = User.objects.create(username='admin', role=USER_ROLE_ADMIN)
        self.admin_client = APIClient()
        self.admin_client.force_authenticate(user=self.admin)

        self.manager = User.objects.create(username='manager', role=USER_ROLE_MANAGER)
        self.manager_client = APIClient()
        self.manager_client.force_authenticate(user=self.manager)

    def test_user_can_create_meal(self):
        response = self.user_client.post('/api/v1/meal/',
                                         {"date": "2019-01-23", "time": "16:20:04", "text": "corn", "calories": 33},
                                         format='json'
                                         )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Meal.objects.all().count(), 1)

    def test_user_can_edit_his_meal(self):
        meal = mommy.make(Meal, user=self.user)
        self.user_client.patch('/api/v1/meal/{}/'.format(meal.id),
                               {
                                   'text': 'best meal',
                                   'calories': 100500

                               },
                               format='json')
        self.assertEqual(Meal.objects.first().text, 'best meal')
        self.assertEqual(Meal.objects.first().calories, 100500)

    def test_admin_can_create_meal_for_user(self):
        self.assertEqual(Meal.objects.count(), 0)
        response = self.admin_client.post('/api/v1/meal/',
                                          {"date": "2019-01-23", "time": "16:20:04", "text": "corn", "calories": 33,
                                           "user": self.user.id},
                                          format='json'
                                          )
        self.assertEqual(Meal.objects.count(), 1)
        self.assertEqual(Meal.objects.first().user_id, self.user.id)

    def test_admin_can_edit_users_meal(self):
        meal = mommy.make(Meal, user=self.user)
        self.admin_client.patch('/api/v1/meal/{}/'.format(meal.id),
                                {
                                    'text': 'best meal',
                                    'calories': 100500

                                },
                                format='json')
        self.assertEqual(Meal.objects.first().text, 'best meal')
        self.assertEqual(Meal.objects.first().calories, 100500)

    def test_manager_cant_edit_users_meal(self):
        meal = mommy.make(Meal, user=self.user)
        response = self.manager_client.patch('/api/v1/meal/{}/'.format(meal.id),
                                             {
                                                 'text': 'best meal',
                                                 'calories': 100500

                                             },
                                             format='json')
        self.assertEqual(response.status_code, 404)

    def test_manager_cant_even_read_users_meal(self):
        meal = mommy.make(Meal, user=self.user)
        response = self.manager_client.get('/api/v1/meal/{}/'.format(meal.id))
        self.assertEqual(response.status_code, 404)

    def test_user_get_only_own_meals(self):
        meal1 = mommy.make(Meal, user=self.user)
        meal2 = mommy.make(Meal, user=self.manager)
        response = self.user_client.get('/api/v1/meal/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], meal1.id)

    def test_manager_get_only_own_meals(self):
        meal1 = mommy.make(Meal, user=self.user)
        meal2 = mommy.make(Meal, user=self.manager)
        response = self.manager_client.get('/api/v1/meal/')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], meal2.id)

    def test_admin_get_all_meals(self):
        meal1 = mommy.make(Meal, user=self.user)
        meal2 = mommy.make(Meal, user=self.manager)
        response = self.admin_client.get('/api/v1/meal/')
        self.assertEqual(len(response.data), 2)


class UserResourceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='taksa')
        self.user_client = APIClient()
        self.user_client.force_authenticate(user=self.user)

        self.admin = User.objects.create(username='admin', role=USER_ROLE_ADMIN)
        self.admin_client = APIClient()
        self.admin_client.force_authenticate(user=self.admin)

        self.manager = User.objects.create(username='manager', role=USER_ROLE_MANAGER)
        self.manager_client = APIClient()
        self.manager_client.force_authenticate(user=self.manager)

    def test_user_have_no_access(self):
        response = self.user_client.get('/api/v1/user/')
        self.assertEqual(response.status_code, 403)

    def test_manager_has_read_access(self):
        response = self.manager_client.get('/api/v1/user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    def test_admin_has_read_access(self):
        response = self.admin_client.get('/api/v1/user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

    def test_manager_can_create(self):
        response = self.manager_client.post('/api/v1/user/', {
            'username': 'soldier',
            'password': 'sold12asdAS'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 4)

    def test_manager_can_edit(self):
        response = self.manager_client.patch('/api/v1/user/{}/'.format(self.user.id),
                                             {'username': 'master'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(id=1).username, 'master')

    def test_manager_can_delete(self):
        response = self.manager_client.delete('/api/v1/user/{}/'.format(self.user.id))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(User.objects.count(), 2)

    def test_admin_can_create(self):
        response = self.admin_client.post('/api/v1/user/', {
            'username': 'soldier',
            'password': 'sold12asdAS'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 4)

    def test_admin_can_edit(self):
        response = self.admin_client.patch('/api/v1/user/{}/'.format(self.user.id),
                                           {'username': 'master'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(id=1).username, 'master')

    def test_admin_can_delete(self):
        response = self.admin_client.delete('/api/v1/user/{}/'.format(self.user.id))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(User.objects.count(), 2)

    def test_admin_can_change_user_role(self):
        response = self.admin_client.patch('/api/v1/user/{}/'.format(self.user.id),
                                           {'role': USER_ROLE_ADMIN})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(id=1).role, USER_ROLE_ADMIN)

    def test_manager_cant_change_user_role(self):
        response = self.manager_client.patch('/api/v1/user/{}/'.format(self.user.id),
                                             {'role': USER_ROLE_ADMIN})
        # it returns 200, but silently skips role field
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(id=1).role, USER_ROLE_USER)

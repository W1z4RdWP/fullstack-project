from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    middle_name = models.CharField(verbose_name='Отчество', blank=True, null=True)
    age = models.PositiveIntegerField()
    avatar = models.FileField(default='media/profile_pics/default.jpg')
    allowed_to_post = models.BooleanField(default=False)


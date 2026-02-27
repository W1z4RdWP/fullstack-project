from django.urls import path
from blog import views as blog_views
from . import views as api_views

app_name = 'api'

urlpatterns = [
    path('register/', api_views.register_user, name='register_user'),
    path('create_post/', api_views.create_post, name='create_post'),
    path('get_all_posts/', api_views.get_all_posts, name='get_all_posts'),
]
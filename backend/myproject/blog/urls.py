from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('create_post/', views.create_post, name='create_post'),
    path('get_posts/', views.get_all_posts, name='get_posts'),
    path('<int:pk>/post/', views.read_post, name='read_post'),
    path('update_post/<int:pk>/', views.update_post, name='update_post'),
    path('delete_post/<int:pk>/', views.delete_post, name='delete_post'),
]

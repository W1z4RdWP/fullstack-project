from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from blog.models import Post
from .serializers import PostSerializer


@api_view(["GET"])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

def register_user(request):
    headers = {'My-SecretCode': 12345}
    return HttpResponse("<h1>Register user</h1>", status=200, headers=headers)



@api_view(["GET", "POST"])
def create_post(request):
    """CREATE"""
    if request.method == 'POST':
        serializer = PostSerializer(request.data)
        post = serializer.save()
        return Response({"status": "Post Created!", "pk": post.id}, status=status.HTTP_201_CREATED)
    else:
        return Response({"status": "This was GET REQUEST"})
    
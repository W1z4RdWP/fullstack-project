from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from blog.models import Post
from .serializers import PostSerializer, UserSerializer


@api_view(["GET"])
def get_all_posts(request: Request) -> Response:
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_post(request: Request, post_id: int) -> Response:
    try:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except Post.DoesNotExist:
        return Response({"error": "Пост не найден"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["POST"])
def register_user(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"status": "User created!", "pk": user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"status": "Only POST Method is allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(["POST"])
def create_post(request: Request) -> Response:
    """CREATE"""
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            return Response({"status": "Post created!", "pk": post.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"status": "Only POST method is allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["DELETE"])
def delete_post(request: Request, post_id: int) -> Response:
    """DELETE"""
    # serializer = PostSerializer(data=request.data)
    post = Post.objects.get(id=post_id)
    post_title = post.title
    post.delete()
    return Response({"status": f"Post {post_title} have been removed!"}, status=status.HTTP_200_OK)


@api_view(["PATCH"])
def edit_post(request: Request, post_id: int) -> Response:
    """PATCH"""
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response(
            {"error": "Page not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = PostSerializer(post, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


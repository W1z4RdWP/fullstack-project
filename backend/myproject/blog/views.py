from django.shortcuts import render
from .models import Post
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponseNotFound


def create_post(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    """CREATE"""
    if request.method == 'POST':
        post = Post()
        post.title = request.POST.get('post_title')
        post.save()
    return HttpResponseRedirect("/blog/get_posts/")



def get_all_posts(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    """READ"""
    posts = Post.objects.all()
    return render(request, 'blog/index.html', {'posts': posts})


def read_post(request: HttpRequest, pk: int) -> HttpResponse | HttpResponseRedirect:
    """READ"""
    try:
        post = Post.objects.get(id=pk)
        return render(request, "blog/detailed.html", {'post': post})
    except Post.DoesNotExist():
        return HttpResponseNotFound("/blog/get_posts/")


def update_post(request: HttpRequest, pk: int) -> HttpResponse | HttpResponseRedirect:
    """UPDATE"""
    post = Post.objects.get(id=pk)
    if request.method == "POST":
        post.title = request.POST.get("post_title")
        post.save()
        return HttpResponseRedirect("/blog/get_posts/")
    else:
        return render(request, "blog/edit.html", {"post": post})


def delete_post(request: HttpRequest, pk: int) -> HttpResponseRedirect | HttpResponseNotFound:
    """DELETE"""
    try:
        post = Post.objects.get(id=pk)
        if request.method == "GET":
            post.delete()
            return HttpResponseRedirect("/blog/get_posts/")
        return HttpResponseNotFound("/blog/get_posts/")
    except Post.DoesNotExist() as e:
        return HttpResponseNotFound("/blog/get_posts/")

from django.shortcuts import render
from django.contrib.auth import get_user_model
from .models import Chat

# Create your views here.

User = get_user_model()

def index(request):
    users = User.objects.exclude(username=request.user.username)
    return render(request, 'index.html', context={'users':users})

def chatPage(request, username):
    print(username)
    user_obj = User.objects.get(username=username)
    print(user_obj.password)
    users = User.objects.exclude(username=request.user.username)
    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'
    message_objs = Chat.objects.filter(thread_name=thread_name)
    return render(request, 'mainchat.html', context={'users':users, 'user':user_obj, 'loggedUser':request.user, 'messages': message_objs})
from django.urls import path, include

urlpatterns = [
    path('', include('game_app.urls')),
]

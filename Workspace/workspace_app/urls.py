from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='workspace_index'),
    path('api/book/', views.create_booking, name='create_booking'),
]

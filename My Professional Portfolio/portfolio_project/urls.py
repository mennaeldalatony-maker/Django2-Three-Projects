from django.urls import path, include

urlpatterns = [
    path('', include('core_app.urls')),
]

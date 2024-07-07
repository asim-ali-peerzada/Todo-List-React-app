from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView

from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'todos', TodoItemViewSet, basename='todo')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]

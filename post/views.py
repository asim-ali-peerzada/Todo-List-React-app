from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer
from rest_framework import generics,permissions
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status

class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

def get_queryset(self):
    return TodoItem.objects.filter(owner=self.request.user)
    

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
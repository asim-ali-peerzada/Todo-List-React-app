from django.db import models
from django.contrib.auth.models import User



class TodoItem(models.Model):
    text = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)


    def __str__(self):
        return self.text




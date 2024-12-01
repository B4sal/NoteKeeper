# models.py
from django.db import models

class Note(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    autor = models.CharField(max_length=255)
    fecha = models.DateField()

    def __str__(self):
        return self.titulo

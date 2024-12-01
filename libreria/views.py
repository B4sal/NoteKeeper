from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Note
from rest_framework import generics
from .serializers import NoteSerializer

# Create your views here.
def inicio(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descripcion = request.POST.get('descripcion')
        autor = request.POST.get('autor')
        fecha = request.POST.get('fecha')
        Note.objects.create(titulo=titulo, descripcion=descripcion, autor=autor, fecha=fecha)
        return redirect('inicio')
    
    notes = Note.objects.all()
    return render(request, 'paginas/inicio.html', {'notes': notes})

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('api/notes', views.NoteListCreate.as_view(), name='note-list-create'),
    path('api/notes/<int:pk>', views.NoteRetrieveUpdateDestroy.as_view(), name='note-detail'),
]
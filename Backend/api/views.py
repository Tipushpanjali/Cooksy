from django.shortcuts import render
from .models import Image
from .serializers import ImageSerializer
from rest_framework import viewsets
# Create your views here.
class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('-uploaded_at')
    serializer_class = ImageSerializer
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Image

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_preview', 'uploaded_at')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" height="100" style="object-fit: cover;" />'
        return "No Image"

    image_preview.allow_tags = True
    image_preview.short_description = 'Preview'

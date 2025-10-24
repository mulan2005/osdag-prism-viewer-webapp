from django.contrib import admin
from .models import Plugin

@admin.register(Plugin)
class PluginAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'repo_url', 'installed_at')
    search_fields = ('name', 'repo_url')

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Plugin
from .serializers import PluginSerializer

class PluginViewSet(viewsets.ModelViewSet):
    queryset = Plugin.objects.all()
    serializer_class = PluginSerializer

    @action(detail=False, methods=['post'], url_path='install')
    def install_plugin(self, request):
        """Install a plugin from a repository URL"""
        repo_url = request.data.get('repo_url')
        if not repo_url:
            return Response({'error': 'repo_url is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract name from URL
        name = repo_url.split('/')[-1]
        
        # Create or get plugin
        plugin, created = Plugin.objects.get_or_create(
            repo_url=repo_url,
            defaults={'name': name}
        )
        
        serializer = self.get_serializer(plugin)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='bundle-url')
    def get_bundle_url(self, request, pk=None):
        """Get the bundle URL for a plugin"""
        plugin = self.get_object()
        # For now, return a placeholder URL - in a real implementation,
        # this would generate or fetch the actual bundle URL
        bundle_url = f"http://localhost:8000/static/plugins/{plugin.name}.js"
        return Response({'url': bundle_url})

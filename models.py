from django.db import models

class Plugin(models.Model):
    name = models.CharField(max_length=100)
    repo_url = models.URLField()
    installed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

from django.db import models


# AJK TODO make an abstract model storing created/updated/archived timestamps
class Book(models.Model):
    title = models.CharField(max_length=1024)
    author = models.CharField(max_length=1024, blank=True)
    location = models.PositiveIntegerField(null=True)

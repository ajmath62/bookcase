from django.db import models
from django.utils import timezone


class AbstractModel(models.Model):
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now=True)
    archived_on = models.DateTimeField(null=True)
    
    @property
    def is_archived(self):
        return self.archived_on is None

    def archive(self):
        self.archived_on = timezone.now()
        self.save()

    @classmethod
    def get_active(cls):
        return cls.objects.filter(archived_on__isnull=True)
    
    class Meta:
        abstract = True


class Book(AbstractModel):
    title = models.CharField(max_length=1024)
    author = models.CharField(max_length=1024, blank=True)
    location = models.PositiveIntegerField(null=True)

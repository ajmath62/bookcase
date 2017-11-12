from rest_framework.viewsets import ModelViewSet

from rest_api.models import Book
from rest_api.serializers import BookSerializer


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

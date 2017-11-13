from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from rest_api.models import Book
from rest_api.serializers import BookSerializer


class BookViewSet(ModelViewSet):
    queryset = Book.objects.filter(archived=False)
    serializer_class = BookSerializer

    @detail_route(methods=['POST'])
    def edit(self, request, pk=None):
        obj_qs = self.queryset.filter(pk=pk)
        if not obj_qs.exists():
            return Response('No object found with that ID', status=status.HTTP_404_NOT_FOUND)

        obj = obj_qs.get()
        data = request.data
        # AJK TODO validate (via serializer)
        if 'title' in data:
            obj.title = data['title']
        if 'author' in data:
            obj.author = data['author']
        obj.save()
        return Response('book updated', status=200)

    @detail_route(methods=['POST'])
    def delete(self, request, pk=None):
        obj_qs = self.queryset.filter(pk=pk)
        if not obj_qs.exists():
            return Response('No object found with that ID', status=status.HTTP_404_NOT_FOUND)

        obj = obj_qs.get()
        obj.archive()
        return Response('book deleted', status=200)

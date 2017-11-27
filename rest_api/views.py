from rest_framework import status
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from rest_api.models import Book
from rest_api.serializers import BookSerializer


class BookViewSet(ModelViewSet):
    queryset = Book.get_active().order_by('location')
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
    
    @detail_route(methods=['POST'], url_path='place-after')
    def place_after(self, request, pk=None):
        after_pk = request.data['after']
        pk = int(pk)  # It was a str
        
        if pk == after_pk:
          # If the two books are the same, do nothing
            return Response('no movement', status=200)
        # AJK TODO allow for after_pk == None (both here and frontend)
        
        loc_dict = dict(Book.objects.filter(pk__in=[pk, after_pk]).values_list('pk', 'location'))
        loc = loc_dict[pk]
        after_loc = loc_dict[after_pk]
        
        if not Book.objects.filter(location=after_loc+1).exists():
            # If the first book can be placed immediately after the second book without
            # moving any other books, do that.
            Book.objects.filter(pk=pk).update(location=after_loc+1)
            return Response('book moved', status=200)
        
        print(loc, after_loc)
        if loc < after_loc:
            # Move all books from loc+1 to after_loc (inclusive) one location down
            # Then move loc to after_loc
            pass
        else:
            # Move all books from after_loc+1 to loc-1 (inclusive) one location up
            # Then move loc to after_loc+1
            pass
        return Response('book moved', status=200)

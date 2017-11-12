from django.http import HttpResponse


def index(request):
    return HttpResponse('yup that\'s a request', status=201)

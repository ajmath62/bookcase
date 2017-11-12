from rest_framework.routers import DefaultRouter

from rest_api import views


router = DefaultRouter()
router.register(r'', views.BookViewSet, base_name='book')
urlpatterns = router.urls

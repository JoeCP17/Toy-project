"""Backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from mnist import views

from Backend import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('image', views.image),
    path('test', views.image_prediction),
    path('pred', views.save_predict)
]
if settings.DEBUG:  # 개발 모드일 때만
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

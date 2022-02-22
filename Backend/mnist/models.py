from django.db import models
import uuid
import os


# 파일 이름 랜덤
def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('', filename)


# Create your models here.
class ImageInformation(models.Model):
    name = models.CharField(max_length=100)
    images = models.ImageField(name="number", upload_to=get_file_path)

    def str(self):
        return self.name

from django.db import models


# Create your models here.
class ImageInformation(models.Model):
    name = models.CharField(max_length=100)
    images = models.ImageField(name="number", width_field=28, height_field=28)

    def str(self):
        return self.name


from django.shortcuts import render
from mnist.models import ImageInformation


# Create your views here.


def image(request):
    if request.method == "POST":
        ImageInformation.objects.create(
            name=request.POST['name']
        )


def image_prediction(request):
    global image
    if request.method == "POST":
        image_file = request.POST['image_file']
        images = ImageInformation.objects.all().order_by("-id")
        for image in images:
            if image.images == image_file:
                print(image)
                # mnist search
        return render(request, 'templates/test.html', {"image": image})
    else:
        image_file = request.POST['image_file']
        images = ImageInformation.objects.all().order_by("-id")
        for image in images:
            if image.images == image_file:
                print(image)
                # mnist search
        return render(request, 'templates/test.html', {"image": image})


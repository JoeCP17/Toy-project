from http.client import HTTPResponse

import numpy as np
import tensorflow as tf
from django.shortcuts import render
from django.utils.decorators import method_decorator
from mnist.models import ImageInformation
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@method_decorator(csrf_exempt)
def image(request):
    if request.method == "POST":
        ImageInformation.objects.create(
            name=request.POST['name'],
            number=request.FILES['image_file']
        )
        return HTTPResponse("201")


@method_decorator(csrf_exempt)
def image_prediction(request):
    global image

    if request.method == "POST":

        image_file = request.FILES['image_file']
        images = ImageInformation.objects.all().order_by("-id")
        for image in images:
            if image.number == image_file:
                result = predict(image)
                break
        return render(request, 'test.html', {"image": result})


@method_decorator(csrf_exempt)
def save_predict(request):
    if request.method == "POST":
        result = []
        image_file = request.FILES['image_file']
        ImageInformation.objects.create(
            name=request.POST['name'],
            number=image_file
        )
        images = ImageInformation.objects.all().order_by("-id")
        for image in images:
            if image.number == image_file:
                result = predict(image.number)
                print(image.number)
                break
        return render(request, 'test.html', {"image": result})


def predict(image):
    best_score = 0
    index = 0
    model = tf.keras.models.load_model('./mnist/toy.h5')
    img = tf.keras.preprocessing.image.load_img(f'./media/{image}',
                                                target_size=(28, 28, 3), color_mode="grayscale")
    img = np.array(img)
    img = img.astype('float32') / 255.
    img = np.reshape(img, (1, 28, 28, 1))
    scores = model.predict(img)

    for i in range(10):
        # print(scores[0][i])
        if best_score < scores[0][i]:
            best_score = scores[0][i]
            index = i
    # print(index)
    # print(scores[0])
    return [index, best_score]

import numpy as np 
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPooling2D, Dropout, Flatten
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical

# dataset shape
(X_train, y_train), (X_test, y_test) = mnist.load_data()

classes = 10
X_train = X_train.astype('float32') / 255.
X_test = X_test.astype('float32') / 255.
X_train = np.reshape(X_train, (len(X_train), 28, 28, 1))
X_test = np.reshape(X_test, (len(X_test), 28, 28, 1))
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)


model = Sequential()
model.add(Conv2D(32, kernel_size=10, padding="same", activation="relu"))
model.add(MaxPooling2D(2, 2))
model.add(Conv2D(16, kernel_size=8, padding="same", activation="relu"))
model.add(MaxPooling2D(2, 2))
model.add(Conv2D(8, kernel_size=2, padding="same", activation="relu"))
model.add(MaxPooling2D(2, 2))
model.add(Flatten())
model.add(Dense(128, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(64, activation="relu"))
model.add(Dense(32, activation="relu"))
model.add(Dropout(0.25))
model.add(Dense(classes, activation="softmax"))
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["acc"])


model.fit(X_train, y_train, batch_size=128, epochs=15, verbose=1, 
          validation_data=(X_test, y_test), validation_batch_size=128)

print(f"Train acc -> {model.evaluate(X_train, y_train)}")
print(f"Test acc -> {model.evaluate(X_test, y_test)}")

model.save("toy.h5")
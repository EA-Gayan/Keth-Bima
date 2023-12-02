import google.cloud.storage
import tensorflow as tf
from PIL import Image
import numpy as np

model = None
interpreter = None
input_index = None
output_index = None

class_names = ['Bacterial_Leaf_Blight', 'Brown_Spot', 'Healthy', 'Leaf_Blast', 'Leaf_Scald', 'Rice_Hispa']

BUCKET_NAME = "rice-disease"  # Replace with your bucket name


def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


def predictfi(request):
    global model
    if model is None:
        download_blob(
            BUCKET_NAME,
            "model_final.h5",  # Replace with your model filename
            "/tmp/model_final.h5",
        )
        model = tf.keras.models.load_model("/tmp/model_final.h5")

    image_file = request.files["image"]
    image = np.array(
        Image.open(image_file).convert("RGB").resize((256, 256))  # Image resizing
    )
    image = image / 255  # Normalize the image in 0 to 1 range
    img_array = tf.expand_dims(img, 0)
    predictions = model.predict(img_array)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    response = {"class": predicted_class, "confidence": confidence}
    return response

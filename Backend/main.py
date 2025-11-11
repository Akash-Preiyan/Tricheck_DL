from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import joblib
from PIL import Image
from transformers_config import val_transform
import torch
import torch.nn as nn
from typing import cast
import torchvision.models as models
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message":"Hello"}

#HEART DISEASE
class HeartDiseaseInput(BaseModel):
    gender: str
    weight: float
    height: float
    age_in_yrs: float
    ap_hi: float
    ap_lo: float
    cholesterol: str
    gluc: str
    smoke: str
    alco: str
    active: str  

@app.post("/predict/heart")
def predict_heart_disease(data: HeartDiseaseInput):
    # Map categorical fields to numeric
    gender_map = {"Male": 1, "Female": 0}
    yes_no_map = {"Yes": 1, "No": 0}
    level_map = {"Normal": 1, "Above Normal": 2, "Well Above Normal": 3}

    gender = gender_map.get(data.gender, 0)
    smoke = yes_no_map.get(data.smoke, 0)
    alco = yes_no_map.get(data.alco, 0)
    active = yes_no_map.get(data.active, 0)
    cholesterol = level_map.get(data.cholesterol, 1)
    gluc = level_map.get(data.gluc, 1)

    input_data = [[
        data.age_in_yrs, gender, data.height, data.weight, data.ap_hi, data.ap_lo,
        cholesterol, gluc, smoke, alco, active
    ]]

    # Convert to numpy array and predict
    model = joblib.load('./Models/cardiovascular.pkl')
    prediction = model.predict(np.array(input_data))

    reasons = []

    if data.ap_hi > 130:
        reasons.append("High systolic blood pressure")
    if data.ap_lo > 85:
        reasons.append("High diastolic blood pressure")
    if cholesterol > 1:
        reasons.append("Elevated cholesterol levels")
    if gluc > 1:
        reasons.append("Higher glucose levels")
    if smoke == 1:
        reasons.append("Smoking habit")
    if alco == 1:
        reasons.append("Frequent alcohol intake")
    if active == 0:
        reasons.append("Low physical activity")

    # Prepare reasoning text
    if prediction[0] == 1:
        if reasons:
            reason_text = ", ".join(reasons) + " — these factors may increase your heart risk."
        else:
            reason_text = "Some clinical parameters suggest possible cardiovascular risk."
        result = "Heart Disease Detected"
    else:
        reason_text = "Your inputs indicate a healthy cardiovascular profile."
        result = "No Heart Disease"

    return {"prediction": result, "reason": reason_text}


#ALZHEIMER DISEASE
NUM_CLASSES = 4

model = models.resnet50(pretrained=False)
num_ftrs =model.fc.in_features
model.fc = nn.Sequential(
    nn.Dropout(0.5),
    nn.Linear(num_ftrs, 256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, NUM_CLASSES)
) #type: ignore
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

checkpoint = torch.load("./Models/best_alzheimer_model_complete.pth", map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

@app.post("/predict/alzheimer")
async def predict_alzheimer(mri_image: UploadFile = File(...) ):
    image = Image.open(mri_image.file).convert("RGB")
    image_tensor = cast(torch.Tensor, val_transform(image))
    tensor_image = image_tensor.unsqueeze(0)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tensor_image = tensor_image.to(device)
    model.to(device)

    with torch.no_grad():
        outputs = model(tensor_image)
        _, predicted = torch.max(outputs, 1)
        predicted_class = int(predicted.item())

    classes = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']
    result = classes[predicted_class]
    reasons = {
        "MildDemented": "Early stage of Alzheimer's where memory loss and confusion start to appear, but the person can still handle most daily activities.",
        "ModerateDemented": "Middle stage with noticeable memory loss, personality changes, and difficulty with tasks or recognizing familiar people.",
        "NonDemented": "Normal brain condition with no signs of dementia or memory-related diseases.",
        "VeryMildDemented": "Very early stage with only slight memory issues that might not interfere much with daily life."
    }
    predicted_reason = reasons[result]
    return {"prediction" : result, "reason":predicted_reason}


#BRAIN TUMOR DISEASE

brain_model = models.resnet50(pretrained=False)
num_filters = brain_model.fc.in_features
brain_model.fc = nn.Sequential(
    nn.Dropout(0.5),
    nn.Linear(num_filters, 512),
    nn.ReLU(),
    nn.BatchNorm1d(512),
    nn.Dropout(0.3),
    nn.Linear(512, 256),
    nn.ReLU(),
    nn.BatchNorm1d(256),
    nn.Dropout(0.2),
    nn.Linear(256, NUM_CLASSES)
)
brain_model = brain_model.to(device)

brain_checkpoint = torch.load("./Models/best_brain_tumor_model_complete.pth", map_location=device)
brain_model.load_state_dict(brain_checkpoint['model_state_dict'])
brain_model.eval()

@app.post('/predict/brain')
async def predict_brainTumor(mri_image: UploadFile = File(...)):
    image = Image.open(mri_image.file).convert('RGB')
    image_tensor = cast(torch.Tensor, val_transform(image)).unsqueeze(0).to(device)

    with torch.no_grad():
        output = brain_model(image_tensor)
        _, predicted = torch.max(output, 1)
        predicted_class = int(predicted.item())

    classes = ['glioma', 'meningioma', 'notumor', 'pituitary']
    reasons = {
        "glioma": "Glioma is a type of tumor that starts in the glial cells of the brain or spinal cord. It can be slow-growing or aggressive, depending on the subtype.",
        "meningioma": "Meningioma arises from the membranes (meninges) surrounding the brain and spinal cord. Most are benign but can cause pressure on nearby brain tissue.",
        "notumor": "No tumor detected. The MRI scan shows normal brain structure without signs of abnormal growth or mass.",
        "pituitary": "Pituitary tumor develops in the pituitary gland, which controls many hormones. It can affect vision, growth, and hormone balance."
    }

    result = classes[predicted_class]
    predicted_reason = reasons[result]

    return {"prediction": result, "reason": predicted_reason}



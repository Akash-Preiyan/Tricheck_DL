from huggingface_hub import login, HfApi
import os
import zipfile
from dotenv import load_dotenv
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
HF_USERNAME = "Akashaiml"
BASE_PATH = r"D:\AKASH\PROJECTS\Multi_DL_Model\Backend"
MAKE_PRIVATE = False

def upload(api, zip_path, repo_name):
    repo_id = f"{HF_USERNAME}/{repo_name}"

    # Create repo first (IMPORTANT)
    api.create_repo(repo_id=repo_id, repo_type="dataset", exist_ok=True)

    api.upload_file(
        path_or_fileobj=zip_path,
        path_in_repo=os.path.basename(zip_path),
        repo_id=repo_id,
        repo_type="dataset"
    )
    print("Uploaded:", repo_id)




def upload_zip(api, zip_path, repo_name):
    repo_id = f"{HF_USERNAME}/{repo_name}"
    print(f"Uploading {zip_path} to {repo_id} ...")

    try:
        api.upload_file(
            path_or_fileobj=zip_path,
            path_in_repo=os.path.basename(zip_path),
            repo_id=repo_id,
            repo_type="dataset"
        )
        print(f"Success: https://huggingface.co/datasets/{repo_id}\n")
    except Exception as e:
        print("Upload failed:", e)

def upload_large(api, repo_id, folder_path, repo_type="dataset"):
    try:
        api.create_repo(repo_id=repo_id, repo_type=repo_type, private=MAKE_PRIVATE, exist_ok=True)
        api.upload_large_folder(
            folder_path=folder_path,
            repo_id=repo_id,
            repo_type=repo_type,
            path_in_repo="",   # upload to root
        )
        return True
    except Exception as e:
        print(f"Large upload error: {e}")
        return False

    
def upload_file(api, repo_id, file_path, path_in_repo, repo_type="model"):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return False

    try:
        api.create_repo(repo_id=repo_id, repo_type=repo_type, exist_ok=True)
        api.upload_file(
            path_or_fileobj=file_path,
            repo_id=repo_id,
            path_in_repo=path_in_repo,
            repo_type=repo_type
        )
        print(f"Uploaded: {file_path} → {repo_id}/{path_in_repo}")
        return True
    except Exception as e:
        print(f"Error uploading {file_path}: {e}")
        return False

def main():
    print("Logging in.......")
    try:
        login(token=HF_TOKEN)
        print("Login successful")
    except Exception as e:
        print(f"Login failed: {e}")
        return
    
    api = HfApi()

    alzheimer_path = os.path.join(BASE_PATH, "Datasets", "AlzheimerDataset")
    brainTumor_path = os.path.join(BASE_PATH, "Datasets", "BrainTumor")
    cardio_path = os.path.join(BASE_PATH, "Datasets", "CardioDataset")

    alzheimer_model_path = os.path.join(BASE_PATH, "Models", "best_alzheimer_model_complete.pth")
    brain_model_path = os.path.join(BASE_PATH, "Models", "best_brain_tumor_model_complete.pth")
    cardio_model_path = os.path.join(BASE_PATH, "Models", "cardiovascular.pkl")

    upload(api, r"D:\AKASH\PROJECTS\Multi_DL_Model\Backend\Datasets\AlzheimerDataset.zip", "alzheimer-dataset-zip")
    upload(api, r"D:\AKASH\PROJECTS\Multi_DL_Model\Backend\Datasets\BrainTumor.zip", "brain-tumor-dataset-zip")

    # print("Alzheimer Dataset: \n")
    # if os.path.exists(alzheimer_path):
    #     repo_id = f"{HF_USERNAME}/alzheimer-dataset"
    #     if upload_large(api, repo_id, alzheimer_path, "dataset"):
    #         url = f"https://huggingface.co/datasets/{repo_id}"
    #         print(f"Success : {url}\n")
    #     else:
    #         print("Error")


    # print("BrainTumor Dataset: \n")
    # if os.path.exists(brainTumor_path):
    #     repo_id = f"{HF_USERNAME}/braintumor-dataset"
    #     if upload_large(api, repo_id, brainTumor_path, "dataset"):
    #         url = f"https://huggingface.co/datasets/{repo_id}"
    #         print(f"Success : {url}\n")
    #     else:
    #         print("Error")

    # print("Cardio Dataset: \n")
    # if os.path.exists(cardio_path):
    #     repo_id = f"{HF_USERNAME}/cardio-dataset"
    #     if upload_folder(api, repo_id, cardio_path, "dataset"):
    #         url = f"https://huggingface.co/datasets/{repo_id}"
    #         print(f"Success : {url}\n")
    #     else:
    #         print("Error")


    

    # print("Alzheimer Model")
    # if os.path.exists(alzheimer_model_path):
    #     repo_id = f"{HF_USERNAME}/alzheimer-model"
    #     if upload_file(api, repo_id, alzheimer_model_path, "best_alzheimer_model_complete.pth", "model"):
    #         url = f"https://huggingface.co/{repo_id}"
    #         print(f"Success : {url}")
    #     else:
    #         print("Error in Alzheimer model upload")

    # print("Brain Tumor Model")
    # if os.path.exists(brain_model_path):
    #     repo_id = f"{HF_USERNAME}/brainTumor-model"
    #     if upload_file(api, repo_id, alzheimer_model_path, "best_brain_tumor_model_complete.pth", "model"):
    #         url = f"https://huggingface.co/{repo_id}"
    #         print(f"Success : {url}")
    #     else:
    #         print("Error in Brain Tumor model upload")

    # print("Cardio Model")
    # if os.path.exists(cardio_model_path):
    #     repo_id = f"{HF_USERNAME}/cardio-model"
    #     if upload_file(api, repo_id, alzheimer_model_path, "cardiovascular.pkl", "model"):
    #         url = f"https://huggingface.co/{repo_id}"
    #         print(f"Success : {url}")
    #     else:
    #         print("Error in Cardio model upload")

if __name__ == "__main__":
    main()
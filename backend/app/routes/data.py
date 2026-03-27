from fastapi import APIRouter, HTTPException
from app.services import data_services

router = APIRouter()


# helper logic (biar keliatan clean)
def get_status(nilai: int):
    return "lulus" if nilai >= 75 else "tidak lulus"


# GET ALL
@router.get("/data")
def get_all_data():
    data = data_services.get_all_data()

    result = []
    for item in data:
        temp = item.copy()
        temp["status"] = get_status(item["nilai"])
        result.append(temp)

    return {
        "status": "success",
        "data": result
    }


# GET BY ID
@router.get("/data/{id}")
def get_data_by_id(id: int):
    item = data_services.get_data_by_id(id)

    if not item:
        raise HTTPException(status_code=404, detail="Data not found")

    temp = item.copy()
    temp["status"] = get_status(item["nilai"])

    return {
        "status": "success",
        "data": temp
    }
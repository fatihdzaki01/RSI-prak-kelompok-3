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


# POST
@router.post("/data")
def create_data(item: dict):
    new_item = data_services.create_data(item)

    temp = new_item.copy()
    temp["status"] = get_status(new_item["nilai"])

    return {
        "status": "success",
        "data": temp
    }


# PUT
@router.put("/data/{id}")
def update_data(id: int, item: dict):
    updated = data_services.update_data(id, item)

    if not updated:
        raise HTTPException(status_code=404, detail="Data not found")

    temp = updated.copy()
    temp["status"] = get_status(updated["nilai"])

    return {
        "status": "success",
        "data": temp
    }


# DELETE
@router.delete("/data/{id}")
def delete_data(id: int):
    deleted = data_services.delete_data(id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Data not found")

    return {
        "status": "success",
        "message": f"Data dengan id {id} berhasil dihapus"
    }
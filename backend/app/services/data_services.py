import json

FILE = "app/data.json"


def get_all_data():
    with open(FILE) as f:
        return json.load(f)


def get_data_by_id(id: int):
    data = get_all_data()

    for item in data:
        if item["id"] == id:
            return item

    return None
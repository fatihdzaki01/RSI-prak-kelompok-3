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


def post_data(new_data: dict):
    data = get_all_data()

    new_id = max([item["id"] for item in data]) + 1 if data else 1
    new_data["id"] = new_id

    data.append(new_data)

    with open(FILE, "w") as f:
        json.dump(data, f, indent=2)

    return new_data


def put_data(id: int, updated_data: dict):
    data = get_all_data()

    for i, item in enumerate(data):
        if item["id"] == id:
            data[i]["nama"] = updated_data.get("nama", item["nama"])
            data[i]["nilai"] = updated_data.get("nilai", item["nilai"])

            with open(FILE, "w") as f:
                json.dump(data, f, indent=2)

            return data[i]

    return None


def delete_data(id: int):
    data = get_all_data()

    for i, item in enumerate(data):
        if item["id"] == id:
            deleted = data.pop(i)

            with open(FILE, "w") as f:
                json.dump(data, f, indent=2)

            return deleted

    return None
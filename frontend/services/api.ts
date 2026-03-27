const BASE_URL = "http://localhost:8000";

export async function getAllData() {
  const res = await fetch(`${BASE_URL}/data`);
  return res.json();
}

export async function createData(data: any) {
  const res = await fetch(`${BASE_URL}/data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateData(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/data/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteData(id: number) {
  const res = await fetch(`${BASE_URL}/data/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

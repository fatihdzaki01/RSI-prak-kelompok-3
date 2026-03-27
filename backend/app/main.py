from fastapi import FastAPI
from app.routes.data import router as data_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(data_router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # penting!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
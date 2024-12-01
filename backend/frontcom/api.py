from fastapi import APIRouter

from schemas import SetupData

frontcom_router = APIRouter(
    prefix="/comm",
    tags=["API"],
)
setup_data_dict = {}


@frontcom_router.post("/setup")
async def get_setup(setup_data=SetupData):
    global setup_data_dict
    setup_data_dict = setup_data


@frontcom_router.get("/shell")
async def read_root():
    return {"message": "Hello World"}

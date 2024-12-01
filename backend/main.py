from frontcom.api import frontcom_router
from server import app

app.include_router(frontcom_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=3987, reload=True)

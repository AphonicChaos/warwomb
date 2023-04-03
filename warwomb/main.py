import os
import json

from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()
STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")


@app.websocket("/ws")
async def websocket_root(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(json.dumps(data))


app.mount(
    "/",
    StaticFiles(directory=STATIC_DIR, html=True),
    name="static"
)


def start():
    uvicorn.run(
        "warwomb.main:app",
        host="0.0.0.0",
        port=os.getenv("PORT", 8000),
        reload=os.getenv("DEBUG", 'True').lower() == 'true'
    )


if __name__ == "__main__":
    start()

import json

from fastapi import APIRouter, Depends, WebSocket

router = APIRouter(prefix="/ws", tags=['websockets'])


@router.websocket("/")
async def websocket_root(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(json.dumps(data))

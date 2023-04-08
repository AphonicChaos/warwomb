import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(prefix="/ws", tags=['websockets'])


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket):
        self.active_connections.remove(websocket)

    async def send(self, message, websocket):
        await websocket.send_text(message)

    async def broadcast(self, message):
        for connection in self.active_connections:
            connection.send_text(message)


manager = ConnectionManager()


@router.websocket("/")
async def websocket_root(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            manager.send(message, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

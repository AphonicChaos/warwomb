import os
import json

from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqladmin import Admin, ModelView
import uvicorn

from .database import engine
from .admin import (
    UnitAdmin,
    UnitTypeAdmin,
    FactionAdmin,
    AdvantageAdmin,
    WeaponAdmin,
    WeaponEnergyTypeAdmin,
    WeaponQualityAdmin,
    WeaponTypeAdmin,
    authentication_backend
)

STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")

app = FastAPI()
admin = Admin(app, engine, authentication_backend=authentication_backend)


admin.add_view(UnitAdmin)
admin.add_view(UnitTypeAdmin)
admin.add_view(FactionAdmin)
admin.add_view(AdvantageAdmin)
admin.add_view(WeaponAdmin)
admin.add_view(WeaponEnergyTypeAdmin)
admin.add_view(WeaponQualityAdmin)
admin.add_view(WeaponTypeAdmin)


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
        reload=os.getenv("DEBUG", 'True').lower() == 'true',
        forwarded_allow_ips="*",
        proxy_headers=True
    )


if __name__ == "__main__":
    start()

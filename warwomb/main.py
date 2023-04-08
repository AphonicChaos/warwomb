import os
import json
from dotenv import main

from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from sqladmin import Admin
import uvicorn


from .auth import oauth
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

main.load_dotenv()

STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY"))
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


@app.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth")

    return await oauth.google.authorize_redirect(request, str(redirect_uri))


@app.get("/logout")
async def logout(request: Request):
    request.session.pop("user", None)
    return RedirectResponse(url="/")


@app.get("/auth")
async def auth(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user = token.get("userinfo")
    if user:
        request.session["user"] = dict(user)

    return user


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

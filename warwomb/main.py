import os
import json
from dotenv import main

import httpx
from fastapi import FastAPI, Request, WebSocket
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse
from sqladmin import Admin
from sqlmodel import Session, select
import uvicorn


from .auth import oauth
from .database import engine
from .models import AuthProvider, User, Role
from .admin import (
    UserAdmin,
    RoleAdmin,
    UnitAdmin,
    UnitTypeAdmin,
    FactionAdmin,
    AdvantageAdmin,
    WeaponAdmin,
    WeaponEnergyTypeAdmin,
    WeaponQualityAdmin,
    WeaponTypeAdmin,
)

main.load_dotenv()

STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY"))
admin = Admin(app, engine)


admin.add_view(UnitAdmin)
admin.add_view(UnitTypeAdmin)
admin.add_view(FactionAdmin)
admin.add_view(AdvantageAdmin)
admin.add_view(WeaponAdmin)
admin.add_view(WeaponEnergyTypeAdmin)
admin.add_view(WeaponQualityAdmin)
admin.add_view(WeaponTypeAdmin)
admin.add_view(UserAdmin)
admin.add_view(RoleAdmin)


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
    access_token = request.session.pop("access_token", None)

    if access_token:
        httpx.post("https://accounts.google.com/o/oauth2/revoke", data={
            "token": access_token
        })

    return RedirectResponse(url="/")


@app.get("/auth")
async def auth(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    user = {}

    if user_info:
        with Session(engine) as session:
            normal_role = session.exec(
                select(Role).where(Role.name == "normal")
            ).first()
            statement = select(User).where(
                User.email == user_info.email
            )
            user = session.exec(statement).first()

            if not user:
                user = User(
                    email=user_info.email,
                    role=normal_role,
                    auth_provider=AuthProvider.Google
                )
                session.add(user)
                session.commit()
                session.refresh(user)

        request.session["user"] = user.dict()
        request.session["access_token"] = token["access_token"]

    return user.dict()


# app.mount(
#     "/",
#     StaticFiles(directory=STATIC_DIR, html=True),
#     name="static"
# )


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

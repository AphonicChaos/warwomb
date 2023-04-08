
import os
from dotenv import main

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from sqladmin import Admin
import uvicorn


from .database import engine
from .routes import websockets, auth
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


app = FastAPI()
admin = Admin(app, engine)

app.add_middleware(SessionMiddleware, secret_key=os.getenv("APP_SECRET_KEY"))

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

app.include_router(websockets.router)
app.include_router(auth.router)


STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")


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

import os

from dotenv import main
import secure
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware
from sqladmin import Admin
from starlette.exceptions import HTTPException
import uvicorn


from .auth.dependencies import PermissionsValidator, validate_token
from .database import engine
from .routes import websockets
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
    authentication_backend,
)

main.load_dotenv()


app = FastAPI()
admin = Admin(app, engine, authentication_backend=authentication_backend)

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


STATIC_DIR = os.path.abspath(f"{os.path.dirname(__file__)}../../static")

# NEW CODE START {

csp = secure.ContentSecurityPolicy().default_src("'self'").frame_ancestors("'none'")
hsts = secure.StrictTransportSecurity().max_age(31536000).include_subdomains()
referrer = secure.ReferrerPolicy().no_referrer()
cache_value = secure.CacheControl().no_cache().no_store().max_age(0).must_revalidate()
x_frame_options = secure.XFrameOptions().deny()

secure_headers = secure.Secure(
    # csp=csp,
    hsts=hsts,
    referrer=referrer,
    cache=cache_value,
    xfo=x_frame_options,
)


@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.framework.fastapi(response)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CLIENT_HOST")],
    allow_methods=["GET"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=86400,
)


@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc):
    message = str(exc.detail)

    return JSONResponse({"message": message}, status_code=exc.status_code)


@app.get("/api/messages/public")
def public():
    return {"text": "This is a public message."}


@app.get("/api/messages/protected", dependencies=[Depends(validate_token)])
def protected():
    return {"text": "This is a protected message."}


@app.get(
    "/api/messages/admin",
    dependencies=[Depends(PermissionsValidator(["read:admin-messages"]))],
)
def admin():
    return {"text": "This is an admin message."}


# NEW CODE END }


app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")


def start():
    uvicorn.run(
        "warwomb.main:app",
        host="0.0.0.0",
        port=os.getenv("PORT", 8000),
        reload=os.getenv("DEBUG", "True").lower() == "true",
        forwarded_allow_ips="*",
        proxy_headers=True,
    )


if __name__ == "__main__":
    start()

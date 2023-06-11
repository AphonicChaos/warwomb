from fastapi import APIRouter, Depends, Request
import httpx
from sqlmodel import Session, select
from starlette.responses import RedirectResponse

from warwomb.auth import oauth
from warwomb.database import engine
from warwomb.models import AuthProvider, User, Role

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for("auth")

    return await oauth.google.authorize_redirect(request, str(redirect_uri))


@router.get("/redirect")
async def auth(request: Request):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")
    user = {}

    if user_info:
        with Session(engine) as session:
            normal_role = session.exec(
                select(Role).where(Role.name == "normal")
            ).first()
            statement = select(User).where(User.email == user_info.email)
            user = session.exec(statement).first()

            if not user:
                user = User(
                    email=user_info.email,
                    role=normal_role,
                    auth_provider=AuthProvider.Google,
                )
                session.add(user)
                session.commit()
                session.refresh(user)

        request.session["user"] = user.dict()
        request.session["access_token"] = token["access_token"]

    return user.dict()


@router.get("/logout")
async def logout(request: Request):
    request.session.pop("user", None)
    access_token = request.session.pop("access_token", None)

    if access_token:
        httpx.post(
            "https://accounts.google.com/o/oauth2/revoke", data={"token": access_token}
        )

    return RedirectResponse(url="/")

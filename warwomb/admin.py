import os
from typing import Optional

from dotenv import main
from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from .models import Unit


main.load_dotenv()


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form["username"]
        password = form["password"]

        request.session.update({
            "username": username,
            "password": password
        })

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return False

    async def authenticate(
        self,
        request: Request
    ) -> Optional[RedirectResponse]:
        username = request.session.get("username")
        password = request.session.get("password")

        if not all([
            username,
            password,
            username == os.getenv("ADMIN_USER"),
            password == os.getenv("ADMIN_PASS")
        ]):
            return RedirectResponse(
                request.url_for("admin:login"), status_code=302
            )


class UnitAdmin(ModelView, model=Unit):
    column_list = [
        Unit.name,
        Unit.speed,
        Unit.strength,
        Unit.melee_attack,
        Unit.ranged_attack,
        Unit.defense,
        Unit.armor,
        Unit.focus,
        Unit.health,
        Unit.deployment_cost
    ]


authentication_backend = AdminAuth(secret_key="...")

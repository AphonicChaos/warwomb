import os
from typing import Optional

from dotenv import main
from wtforms import fields
from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from fastapi.responses import RedirectResponse
from .auth.dependencies import validate_token
from warwomb.auth.authorization_header_elements import get_bearer_token

from warwomb.models import (
    Role,
    User,
    Advantage,
    Faction,
    Unit,
    UnitType,
    Weapon,
    WeaponEnergyType,
    WeaponQuality,
    WeaponType,
)


main.load_dotenv()


class BaseModelView(ModelView):
    column_exclude_list = ["id"]


class UserAdmin(BaseModelView, model=User):
    column_exclude_list = BaseModelView.column_exclude_list + [User.role_id]
    can_create = False


class RoleAdmin(BaseModelView, model=Role):
    column_exclude_list = BaseModelView.column_exclude_list + [Role.user]
    form_excluded_columns = [Role.user]


class UnitAdmin(BaseModelView, model=Unit):
    pass


class UnitTypeAdmin(BaseModelView, model=UnitType):
    form_excluded_columns = [UnitType.unit]


class FactionAdmin(BaseModelView, model=Faction):
    form_excluded_columns = [Faction.units]


class AdvantageAdmin(BaseModelView, model=Advantage):
    form_excluded_columns = [Advantage.units]


class WeaponAdmin(BaseModelView, model=Weapon):
    form_excluded_columns = [Weapon.units]


class WeaponEnergyTypeAdmin(BaseModelView, model=WeaponEnergyType):
    column_exclude_list = BaseModelView.column_exclude_list + [WeaponEnergyType.weapons]
    form_excluded_columns = [WeaponEnergyType.weapons]


class WeaponQualityAdmin(BaseModelView, model=WeaponQuality):
    name_plural = "Weapon Qualities"
    form_excluded_columns = [WeaponQuality.weapon]
    form_overrides = {"description": fields.TextAreaField}


class WeaponTypeAdmin(BaseModelView, model=WeaponType):
    form_excluded_columns = [WeaponType.weapon]


class AdminAuth0(AuthenticationBackend):
    async def login(self) -> bool:
        pass

    async def logout(self) -> bool:
        pass

    async def authenticate(self, request: Request) -> Optional[RedirectResponse]:
        bearer_token = get_bearer_token(request)
        validate_token(bearer_token)


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form["username"]
        password = form["password"]

        request.session.update({"username": username, "password": password})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return False

    async def authenticate(self, request: Request) -> Optional[RedirectResponse]:
        username = request.session.get("username")
        password = request.session.get("password")

        if not all(
            [
                username,
                password,
                username == os.getenv("ADMIN_USER"),
                password == os.getenv("ADMIN_PASS"),
            ]
        ):
            return RedirectResponse(request.url_for("admin:login"), status_code=302)


authentication_backend = AdminAuth(secret_key=os.getenv("APP_SECRET_KEY"))

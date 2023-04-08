import os
from typing import Optional

from dotenv import main
from wtforms import fields
from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

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
    WeaponType
)


main.load_dotenv()


class BaseModelView(ModelView):
    column_exclude_list = ["id"]


class UserAdmin(BaseModelView, model=User):
    column_exclude_list = BaseModelView.column_exclude_list + [
        User.role_id
    ]
    can_create = False


class RoleAdmin(BaseModelView, model=Role):
    column_exclude_list = BaseModelView.column_exclude_list + [
        Role.user
    ]
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
    column_exclude_list = BaseModelView.column_exclude_list + [
        WeaponEnergyType.weapons
    ]
    form_excluded_columns = [WeaponEnergyType.weapons]


class WeaponQualityAdmin(BaseModelView, model=WeaponQuality):
    name_plural = "Weapon Qualities"
    form_excluded_columns = [WeaponQuality.weapon]
    form_overrides = {
        "description": fields.TextAreaField
    }


class WeaponTypeAdmin(BaseModelView, model=WeaponType):
    form_excluded_columns = [WeaponType.weapon]

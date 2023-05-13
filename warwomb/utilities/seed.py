import os
import json
import sqlalchemy as db
from dotenv import main

main.load_dotenv()

db_engine = None
db_metadata = None
unit_factions_table = None
unit_faction_links_table = None
units_table = None

faction_names_map = {
    "AC": { "dbid": None, "name": "Aeternus Continuum" },
    "EMP": { "dbid": None, "name": "Empyrean" },
    "ISA": { "dbid": None, "name": "Iron Star Alliance" },
    "MW": { "dbid": None, "name": "Marcher Worlds" }
    }

# TODO: add 'tbd' columns to unit data file
unit_column_map = {
    "name": "name",
    "tbd": "speed",
    "tbd": "strength",
    "tbd": "melee_attack",
    "tbd": "ranged_attack",
    "tbd": "defense",
    "tbd": "armor",
    "tbd": "focus",
    "tbd": "health",
    "dc": "deployment_cost"
}

data_file = open('../data_files/warcaster_units.txt', 'r')
unit_dictionary = json.loads(data_file.read())
data_file.close()

def create_db_engine():
    global db_engine, db_metadata
    db_engine = db.create_engine(os.getenv("DATABASE_URL"))
    connection = db_engine.connect()
    db_metadata = db.MetaData()
    connection.close()

def setup_tables():
    global unit_faction_links_table,  unit_factions_table, units_table
    unit_faction_links_table= db.Table('unit_faction_links', db_metadata, db.Column("unit_id", db.Integer), db.Column("unit_faction_id", db.Integer))
    unit_factions_table = db.Table('unit_factions', db_metadata, db.Column("id", db.Integer, primary_key=True, autoincrement=True, nullable=False), db.Column("name", db.String))
    units_table = db.Table('units', db_metadata, 
        db.Column("id", db.Integer,  primary_key=True, autoincrement=True, nullable=False),
        db.Column("name", db.String),
        db.Column("speed", db.Integer),
        db.Column("strength", db.Integer),
        db.Column("melee_attack", db.Integer),
        db.Column("ranged_attack", db.Integer),
        db.Column("defense", db.Integer),
        db.Column("armor", db.Integer),
        db.Column("focus", db.Integer),
        db.Column("health", db.Integer),
        db.Column("deployment_cost", db.Integer))

def reset_tables():
    connection = db_engine.connect()
    connection.execute("truncate table unit_faction_links restart identity cascade")
    connection.execute("truncate table unit_factions restart identity cascade")
    connection.execute("truncate table units restart identity cascade")
    connection.close()

def populate_unit_factions():
    connection = db_engine.connect()
    for key in faction_names_map.keys():
        faction_name = faction_names_map[key]["name"]
        query = db.insert(unit_factions_table).values(name=faction_name)
        proxy = connection.execute(query)
        faction_names_map[key]["dbid"] = proxy.inserted_primary_key[0]
    connection.close()

def create_unit_faction_links(unit_id, faction_names):
    connection = db_engine.connect()
    for faction in faction_names:
        unit_faction_id = faction_names_map[faction]["dbid"]
        query = db.insert(unit_faction_links_table).values(unit_id=unit_id, unit_faction_id=unit_faction_id)
        proxy = connection.execute(query)
    connection.close()

def map_to_values_list(unit_entry):
    missing_data_columns = [
        "speed",
        "strength",
        "melee_attack",
        "ranged_attack",
        "defense",
        "armor",
        "focus",
        "health"
    ]

    value_list = {}
    for column in unit_entry:
        if column in unit_column_map:
            value_list[unit_column_map[column]] = unit_entry[column]

    for column in missing_data_columns:
        value_list[column] = 0

    return value_list

def store_unit_data():
    for unit_entry in unit_dictionary:
        unit_faction_names = unit_entry["factions"]
        query = db.insert(units_table).values([map_to_values_list(unit_entry)]).returning(units_table.c.id)
        row_ids = db_engine.execute(query).fetchall()
        create_unit_faction_links(row_ids[0][0], unit_faction_names)
          
create_db_engine()
setup_tables()
reset_tables()
populate_unit_factions()
store_unit_data()

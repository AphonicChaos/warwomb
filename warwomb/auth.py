from dotenv import main
from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

main.load_dotenv()

config = Config()
oauth = OAuth(config)

oauth.register(
    name="google",
    server_metadata_url=(
        "https://accounts.google.com/"
        ".well-known/openid-configuration"
    ),
    client_kwargs={
        "scope": "openid email profile"
    }
)

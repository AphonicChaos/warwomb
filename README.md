# War Womb

War Womb is a web app that let's you play WarCaster: Neo-Mechanika online.

# Development
 This app is written as a mostly traditional client-server application.
 The source for the frontend is in the 'src' directory, while the source for
 the backend is in 'warwomb'.

## Architecture
Communication between the front and backend is done primarily with websockets,
though there are a few traditional HTTP endpoints.

### Frontend
- TypeScript
- React

#### Files
.
├── static - where client code is output during deployments
└── warwomb-client-old - old client code

### Backend
- Python
- FastAPI
- Auth0

#### Files
.
├── alembic.ini - migration configuration
├── migration - database migrations
├── poetry.lock - versioned dependencies
├── pyproject.toml - package configuration
├── requirements.txt - versioned dependencies for deployment
├── static - static assets
├── warwomb - server source code

## Building
If you'd like to run both the client and server with hot-reload enabled, run
the following commands:

Frontend:
`yarn start`

Backend:
`poetry run start`

In production, `yarn build` is run, which populates the `static` directory, the
contents of which are then served by the FastAPI as static assets.

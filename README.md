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

### Backend
- Python
- FastAPI
- Auth0

## Building
If you'd like to run both the client and server with hot-reload enabled, run
the following commands:

Frontend:
`yarn start`

Backend:
`poetry run start`

In production, `yarn build` is run, which populates the `static` directory, the
contents of which are then served by the FastAPI as static assets.

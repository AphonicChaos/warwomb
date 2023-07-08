# War Womb

War Womb is a web app that let's you play WarCaster: Neo-Mechanika online.

# Development
 This app is written as a mostly traditional client-server application.
 The source for the frontend is in the 'src' directory, while the source for
 the backend is in 'app'.

## Architecture
Communication between the front and backend is done primarily with websockets.

### Frontend
- Haskell
- QML

### Backend
- Haskell

## Building
You can build the whole project with a single command:
```
cabal build
```

If you'd like to write qml with hot reloading, you can use the following commands:
```shell
cd qml
make dev
```

Then, just modify `main.qml` to your heart's content

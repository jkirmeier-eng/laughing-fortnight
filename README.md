
# Some Notes:

This project was built for a hypothetical Ad Adjency my Cousin talked about making.

# Backend API:

On this project I simulate a backend using local storage. This is for demonstration purposes (as there is no actual backend to connect to), but it still provides the project with a sort of independent "virtual API" that it "fetches" from. (I say fetch loosely because I couldn't actually fetch locally, instead I made my own async functions in fakeBackend.js)

You can see resources loaded in.

Login is handled by the Backend API-like-layer providing a token to the frontend on login, which it passes to the backend to get resources.

# Minimalness:

I tried to keep things minimal and simple, and also some pages act more as placeholders / prototypes / proof of concepts. This is because if a company was to use this they would have to fill in a lot of things with company specifics.

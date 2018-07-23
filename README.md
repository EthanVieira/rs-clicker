# RSClicker

We are using Browserify to compile all of our Typescript into one JS file
Browserify Install:

    npm install -g browserify
    npm install -g tsify

Browserify Compile:

    browserify src/game.ts -p [ tsify --noImplicitAny ] > bin/js/bundle.js

Run Game:

    node server/server
# RS Clicker

![alt text](/src/assets/logos/RSCLogo.png "Swanky RS Clicker logo")

## Play online

#### [>Click here to play<](https://ethanvieira.github.io/rs-clicker/)

![alt text](/src/assets/screenshots/Login.png "Login Screen")
![alt text](/src/assets/screenshots/TutorialIsland.png "Tutorial Island")
![alt text](/src/assets/screenshots/WorldMap.png "World Map")

### Run locally with Python server:

Python version 2.x:

`python -m SimpleHTTPServer`

Python version 3.x:

`python -m http.server`

Then open a browser and access it via:

http://192.168.1.2:8000
or
http://127.0.0.1:8000

### TODO

[Trello board for tasks](https://trello.com/b/hJYfFDMr)

[Google doc for future ideas](https://docs.google.com/document/d/14aIu6_-7gJhgkLuyItdyquUk115mISjRNwYPJmxmUm0/edit?usp=sharing)

## Code execution flow
`main.js` -> `scenes/load.js` -> `scenes/main-menu.js` -> `scenes/tutorial-island.js : level.js` -> any other level
  
| File           | Description                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `main.js`      | Sets up phaser and loads all of the scenes. Scene load order affects the z-index                                                        |
| `load.js`      | Init cookies, load item/panel images, and dynamically import all item classes from `*-manifest.js` files and store them in a dictionary |
| `cookie-io.js` | Contains getter/setters for cookie obj. The obj reference is passed between all scenes to get/set save data                             |
| `main-menu.js` | Starts music from `scenes/audio.js`, lets you delete cookies, and start on the last level the user was on                               |
| `level.js`     | Parent class for all levels. Creates the background, targets, and dashboard UI                                                          |
| `dashboard.js` | Contains the visuals and objects for the right portion of the screen (inventory, skills, etc.)                                          |


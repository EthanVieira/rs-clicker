# Code execution flow
| File execution           | Internal references... | &#8595;         |
|--------------------------|------------------------|-----------------|
| `main`                   |                        |                 |
| `scenes/load`            |                        |                 |
|                          | `cookie-io`            |                 |
| `scenes/main-menu`       |                        |                 |
|                          | `scenes/audio`         |                 |
| `scenes/tutorial-island` |                        |                 |
|                          | `scenes/audio`         |                 |
|                          | `ui/dashboard`         |                 |
|                          |                        | `scenes/audio`  |
|                          |                        | `ui/inventory`  |
|                          |                        | `scenes/shop`   |
|                          |                        | `ui/skills`     |
|                          |                        | `ui/quest-list` |
|                          |                        | `ui/equipment`  |
|                          |                        | `ui/clan`       |
|                          | `ui/stats`             |                 |
|                          | `ui/chat`              |                 |
|                          | `targets/target`       |                 |
  
  
### Main file descriptions
| File           | Description                                                                                                                                    |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `main.js`      | Sets up phaser and loads all of the scenes. Scene load order affects the z-index                                                               |
| `load.js`      | Init cookies, load item/panel images, and dynamically import all item classes from `*-manifest.js` files and store them in a dictionary        |
| `cookie-io.js` | Contains getter/setters for cookie obj. The obj reference is passed between all scenes to get/set save data                                    |
| `main-menu.js` | Starts music from `scenes/audio.js`, lets you delete cookies, and start on the last level the user was on                                      |
| `level.js`     | Parent class for all levels. Creates the background, targets, and dashboard UI. Also checks quest completion and animates weapon swing         |
| `dashboard.js` | Contains the visuals and objects for the right portion of the screen (inventory, skills, etc.)                                                 |


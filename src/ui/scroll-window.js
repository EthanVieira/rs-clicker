export class ScrollWindow extends Phaser.Scene {
    name = "";
    characterData;

    constructor(name) {
        super("scroll-window" + name);

        this.name = "scroll-window" + name;
    }

    init(characterData) {
        this.characterData = characterData;
    }

    // Objects passed in need the setX, setY, setVisible functions available
    addObjects(x, y, width, numColumns, objects) {
        if (objects.length > 0) {
            // Add scroll bar and button
            let scrollBar = this.add
                .image(width, 0, "scroll-bar")
                .setDepth(2)
                .setOrigin(0, 0);
            let scrollHeaderHeight = 16;
            let scrollButton = this.add
                .image(width, scrollHeaderHeight, "scroll-button")
                .setDepth(2)
                .setOrigin(0, 0);

            // Position objects
            let xInit = 30,
                yInit = 0,
                row = 0,
                column = 0;
            let xDiff = (width - 20) / numColumns;
            let yDiff = 35 + objects[0].displayHeight;

            for (let i = 0; i < objects.length; i++) {
                objects[i].setX(xInit + xDiff * column);
                objects[i].setY(yInit + yDiff * row);
                objects[i].setVisible(true);
                column++;

                // Go to next row
                if (column >= numColumns) {
                    column = 0;
                    row++;
                }
            }

            // Stretch scroll button depending on # objects
            let lastObj = objects[objects.length - 1];
            let listHeight = lastObj.y + lastObj.displayHeight;
            let scrollBarHeight = scrollBar.displayHeight;

            // Check if scrolling needed
            if (listHeight > scrollBarHeight) {
                // Scale the button image down
                scrollButton.scaleY = scrollBarHeight / listHeight;

                // Shrink scroll distance from default 100 pixels
                let delta = 30;

                // Make scroll button evenly divisible so it will fit properly at the top/bottom
                let deltaOffset =
                    Math.floor(
                        scrollBarHeight -
                            scrollHeaderHeight * 2 -
                            scrollButton.displayHeight
                    ) % delta;
                let negDelta = -1 * delta + deltaOffset;
                let posDelta = delta - deltaOffset;

                // Scale the scroll speed of the objects based on list size
                let objScrollSpeed = (1.2 * listHeight) / scrollBarHeight;

                // Move scroll button & objects
                this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                    if (deltaY > 0) {
                        deltaY = posDelta;
                    } else if (deltaY < 0) {
                        deltaY = negDelta;
                    }

                    // Check top/bottom bounds
                    if (
                        (deltaY < 0 && scrollButton.y + deltaY >= scrollHeaderHeight) ||
                        (deltaY > 0 &&
                            scrollButton.y + scrollButton.displayHeight + deltaY <=
                                scrollBarHeight - scrollHeaderHeight)
                    ) {
                        // Scroll objects faster than scroll bar
                        scrollButton.y += deltaY;
                        objects.forEach((object) => {
                            object.setY(object.y - deltaY * objScrollSpeed);
                        });
                    }
                });
            }

            // Constrain view
            this.cameras.main.setViewport(x, y, width + xInit, scrollBar.displayHeight);
        }
    }
}

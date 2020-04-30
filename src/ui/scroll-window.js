export class ScrollWindow extends Phaser.Scene {
    constructor(name) {
        super("scroll-window" + name);

        this.name = "scroll-window" + name;
    }

    addObjects(x, y, width, numColumns, objects) {
        if (objects.length > 0) {
            // Add scroll bar and button
            let scrollBar = this.add
                .image(width, 0, "scroll-bar")
                .setDepth(2)
                .setOrigin(0, 0);
            let scrollHeaderheight = 16;
            let scrollButton = this.add
                .image(width, scrollHeaderheight, "scroll-button")
                .setDepth(2)
                .setOrigin(0, 0);

            // Position objects
            let xInit = 20;
            let yInit = 50;
            let xDiff = (width - 20) / numColumns;
            let yDiff = 70 + objects[0].displayHeight;
            let row = 0,
                column = 0;
            for (let i = 0; i < objects.length; i++) {
                objects[i].x = xInit + xDiff * column;
                objects[i].y = yInit + yDiff * row;
                column++;

                // Go to next row
                if (column >= numColumns) {
                    column = 0;
                    row++;
                }
            }

            // Stretch scroll button depending on # objects
            let lastObj = objects[objects.length - 1];
            let listHeight = lastObj.y + lastObj.displayHeight/2; //- yInit - y;
            let scrollBarHeight = scrollBar.displayHeight; //- scrollHeaderheight * 2;

            console.log("list:", listHeight);
            console.log("scroll:", scrollBarHeight);

            // No scrolling needed
            if (listHeight <= scrollBarHeight) {
                //scrollButton.scaleY = scrollBarHeight / scrollButton.displayHeight;
            } else {
                // Scrolling needed
                scrollButton.scaleY = scrollBarHeight / listHeight;

                // Move scroll bar & objects
                this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                    // Shrink deltas
                    deltaY *= 2* (scrollHeaderheight / 100);

                    // Make scroll bar evenly divisible so it will fit properly at the bottom
                    let deltaOffset = (scrollBarHeight - scrollHeaderheight * 2) % deltaY;
                    if (deltaOffset != 0 && deltaY < 0) {
                        deltaY += deltaOffset;
                    }
                    else if (deltaOffset != 0 && deltaY > 0) {
                        deltaY -= deltaOffset;
                    }

                    console.log("scroll y", scrollButton.y, "half height", scrollBar.displayHeight/2, "bar height", scrollBarHeight, "left tot", scrollButton.y + deltaY + scrollBar.displayHeight/2)

                    // Check top/bottom bounds
                    if (
                        (deltaY < 0 && scrollButton.y + deltaY >= scrollHeaderheight) ||
                        (deltaY > 0 &&
                            scrollButton.y + scrollBar.displayHeight/2 <=
                                scrollBarHeight + deltaY)
                    ) {
                        scrollButton.y += deltaY;
                        objects.forEach(object => {
                            object.y -= deltaY;
                        });
                    }
                });
            }

            // Constrain view
            this.cameras.main.setViewport(x, y, width + xInit, scrollBar.displayHeight);
        }
    }
}

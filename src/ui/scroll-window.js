export class ScrollWindow extends Phaser.Scene {
    name = "";
    characterData;

    // Input data
    data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        numColumns: 0,
        padding: 0,
        objects: [],
    };

    listHeight = 0;

    // Images
    scrollHeader;
    scrollFooter;
    scrollBackground;
    scrollButton;

    constructor(name) {
        super("scroll-window" + name);

        this.name = "scroll-window" + name;
    }

    init(characterData) {
        this.characterData = characterData;
    }

    addObject(object) {
        this.data.objects.push(object);
    }

    setValues(data) {
        this.data.x = data.x;
        this.data.y = data.y;
        this.data.width = data.width;
        this.data.height = data.height;
        this.data.numColumns = data.numColumns;
        this.data.padding = data.padding;
        this.data.objects = data.objects;
    }

    // Objects passed in need the setX, setY, setVisible functions available
    addObjects(data) {
        if (data.objects.length > 0) {
            this.setValues(data);
            this.refresh();
        }
    }

    refresh(data = this.data) {
        this.setValues(data);

        // Destroy previous scroll bar if it exists
        if (this.scrollHeader != undefined) {
            this.scrollHeader.destroy();
            this.scrollFooter.destroy();
            this.scrollBackground.destroy();
            this.scrollButton.destroy();
        }

        // Add scroll bar images
        this.scrollHeader = this.add
            .image(data.width, 0, "scroll-header")
            .setDepth(4)
            .setOrigin(0, 0);
        let scrollHeaderHeight = this.scrollHeader.displayHeight;

        this.scrollFooter = this.add
            .image(data.width, data.height - scrollHeaderHeight, "scroll-footer")
            .setDepth(4)
            .setOrigin(0, 0);

        this.scrollBackground = this.add
            .image(data.width, scrollHeaderHeight, "scroll-background")
            .setDepth(3)
            .setOrigin(0, 0);

        this.scrollButton = this.add
            .image(data.width, scrollHeaderHeight, "scroll-button")
            .setDepth(4)
            .setOrigin(0, 0);

        // Set default scaling based on height input, may change below based on list height
        this.scrollButton.displayHeight =
            data.height - this.scrollHeader.displayHeight * 2;
        this.scrollBackground.displayHeight =
            data.height - this.scrollHeader.displayHeight * 2;

        // Create scroll bar if needed
        if (data.objects.length > 0) {
            // Position objects
            let xInit = 30,
                yInit = 0,
                row = 0,
                column = 0;
            let xDiff = (data.width - 20) / data.numColumns;
            let yDiff = data.padding + data.objects[0].displayHeight;

            for (let i = 0; i < data.objects.length; i++) {
                data.objects[i].setX(xInit + xDiff * column);
                data.objects[i].setY(yInit + yDiff * row);
                data.objects[i].setVisible(true);
                column++;

                // Go to next row
                if (column >= data.numColumns) {
                    column = 0;
                    row++;
                }
            }

            // Stretch scroll button depending on # objects
            let lastObj = data.objects[data.objects.length - 1];
            this.listHeight = lastObj.y + lastObj.displayHeight;

            // Check if scrolling needed
            if (this.listHeight > data.height) {
                // Scale the button image and background down
                this.scrollButton.scaleY = data.height / this.listHeight;
                this.scrollBackground.displayHeight =
                    data.height - this.scrollHeader.displayHeight * 2;
                let scrollButtonHeight = this.scrollButton.displayHeight;

                // Shrink scroll distance from default 100 pixels
                let delta = 30;

                // Make scroll button evenly divisible so it will fit properly at the top/bottom
                let deltaOffset =
                    Math.floor(
                        data.height - scrollHeaderHeight * 2 - scrollButtonHeight
                    ) % delta;
                let negDelta = -1 * delta + deltaOffset;
                let posDelta = delta - deltaOffset;

                // Scale the scroll speed of the objects based on list size
                let objScrollSpeed = (1.2 * this.listHeight) / data.height;

                // Move scroll button & objects
                this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                    if (this.listHeight > this.data.height) {
                        if (deltaY > 0) {
                            deltaY = posDelta;
                        } else if (deltaY < 0) {
                            deltaY = negDelta;
                        }

                        // Check top/bottom bounds
                        if (
                            (deltaY < 0 &&
                                this.scrollButton.y + deltaY >= scrollHeaderHeight) ||
                            (deltaY > 0 &&
                                this.scrollButton.y + scrollButtonHeight + deltaY <=
                                    this.scrollFooter.y)
                        ) {
                            // Scroll objects faster than scroll bar
                            this.scrollButton.y += deltaY;
                            data.objects.forEach((object) => {
                                object.setY(object.y - deltaY * objScrollSpeed);
                            });
                        }
                    }
                });
            }

            // Constrain view
            this.cameras.main.setViewport(
                data.x,
                data.y,
                data.width + xInit,
                data.height
            );
        }
    }

    setVisible(isVisible) {
        this.data.objects.forEach((obj) => {
            obj.setVisible(isVisible);
        });
        if (this.scrollButton != undefined) {
            this.scrollHeader.visible = isVisible;
            this.scrollFooter.visible = isVisible;
            this.scrollBackground.visible = isVisible;
            this.scrollButton.visible = isVisible;
        }
    }
}

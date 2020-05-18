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
    listDelta = 30;
    curDelta = 0;

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

    // Objects passed in need the setX, setY, setVisible functions available
    addObjects(data) {
        if (data.objects.length > 0) {
            this.refresh(data);
        }
    }

    refresh(data = this.data) {
        this.data = data;

        // Destroy previous scroll bar if it exists
        if (this.scrollHeader != undefined) {
            this.input.removeListener("wheel");
            this.scrollHeader.destroy();
            this.scrollFooter.destroy();
            this.scrollBackground.destroy();
            this.scrollButton.destroy();
        }
        if (this.timer != undefined) {
            this.timer.remove();
        }

        // Add scroll bar images
        this.scrollHeader = this.add
            .image(data.width, 0, "scroll-header")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();
        let scrollHeaderHeight = this.scrollHeader.displayHeight;

        this.scrollFooter = this.add
            .image(data.width, data.height - scrollHeaderHeight, "scroll-footer")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();

        this.scrollBackground = this.add
            .image(data.width, scrollHeaderHeight, "scroll-background")
            .setDepth(3)
            .setOrigin(0, 0);

        this.scrollButton = this.add
            .image(data.width, scrollHeaderHeight, "scroll-button")
            .setDepth(4)
            .setOrigin(0, 0)
            .setInteractive();

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

                // Make scroll button evenly divisible so it will fit properly at the top/bottom
                let remainingListDist = this.listHeight - data.height;
                let remainingScrollBarDist =
                    this.scrollBackground.displayHeight - this.scrollButton.displayHeight;

                // Get closest delta that can divide evenly into the remaining list length
                let defaultScrollDist = lastObj.displayHeight / 2;
                let roundedDelta = Math.floor(remainingListDist / defaultScrollDist);
                this.listDelta = remainingListDist / roundedDelta;

                // Move scroll button & objects
                this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
                    this.scroll(deltaY, remainingScrollBarDist, remainingListDist);
                });

                // Setup timer to check if scrollheader/footer is being held
                this.timer = this.time.addEvent({
                    delay: 100,                // ms
                    callback: () => {
                        this.scroll(this.curDelta, remainingScrollBarDist, remainingListDist);
                    },
                    loop: true,
                    paused: true,
                });

                this.scrollHeader.on("pointerdown", () => {
                    this.scroll(-1, remainingScrollBarDist, remainingListDist);
                    this.curDelta = -1;
                    this.timer.paused = false;
                });
                this.scrollHeader.on("pointerup", () => {
                    this.timer.paused = true;
                    this.timer.elapsed = 0;
                });

                this.scrollFooter.on("pointerdown", () => {
                    this.scroll(1, remainingScrollBarDist, remainingListDist);
                    this.curDelta = 1;
                    this.timer.paused = false;
                });
                this.scrollFooter.on("pointerup", () => {
                    this.timer.paused = true;
                    this.timer.elapsed = 0;
                });

                this.input.setDraggable(this.scrollButton);
                this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
                    let drag = dragY - this.scrollButton.y;
                    if (Math.abs(drag) > 5) {
                        this.scroll(dragY - this.scrollButton.y, remainingScrollBarDist, remainingListDist);
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

    scroll(deltaY, remainingScrollBarDist, remainingListDist) {
        if (this.listHeight > this.data.height) {
            if (deltaY > 0) {
                deltaY = this.listDelta;
            } else if (deltaY < 0) {
                deltaY = this.listDelta * -1;
            }

            // Scale scroll bar delta
            let scrollBarDelta =
                deltaY * (remainingScrollBarDist / remainingListDist);

            // Check top/bottom bounds
            let scrollButtonHeight = this.scrollButton.displayHeight;
            let scrollHeaderHeight = this.scrollHeader.displayHeight;
            let upperBound = this.scrollButton.y + scrollBarDelta;
            let lowerBound = Math.floor(
                this.scrollButton.y + scrollButtonHeight + scrollBarDelta
            );
            if (
                (scrollBarDelta < 0 && upperBound >= scrollHeaderHeight) ||
                (scrollBarDelta > 0 && lowerBound <= this.scrollFooter.y)
            ) {
                // Scroll objects
                this.scrollButton.y += scrollBarDelta;
                this.data.objects.forEach((object) => {
                    object.setY(object.y - deltaY);
                });
            }
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

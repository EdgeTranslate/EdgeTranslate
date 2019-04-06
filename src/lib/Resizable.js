export default function(element, location, parameter) {
    this.callback = parameter.callback;
    this.cursorChange = false;
    this.element = element;
    this.location = location;
    this.mouseDown = false;
    this.originBase = 0;
    this.originLength = 0;
    this.preFunction = parameter.preFunction;
    this.range = parameter.dragSensitivity ? parameter.dragSensitivity : 6;
    this.parentElement = parameter.parentElement
        ? parameter.parentElement
        : document.documentElement;

    this.dragHover = dragHover.bind(this);
    this.dragStart = dragStart.bind(this);
    this.dragging = dragging.bind(this);
    this.dragStop = dragStop.bind(this);

    this.setLocation = function(location) {
        this.location = location;
    };

    this.enableResize = function() {
        this.parentElement.addEventListener("mousemove", this.dragHover);
        this.parentElement.addEventListener("mousedown", this.dragStart);
        this.parentElement.addEventListener("mousemove", this.dragging);
        this.parentElement.addEventListener("mouseup", this.dragStop);
    };

    this.disableResize = function() {
        this.parentElement.removeEventListener("mousemove", this.dragHover);
        this.parentElement.removeEventListener("mousedown", this.dragStart);
        this.parentElement.removeEventListener("mousemove", this.dragging);
        this.parentElement.removeEventListener("mouseup", this.dragStop);
    };
}

function dragHover(event) {
    if (this.element && !this.mouseDown && this.element.getClientRects().length > 0) {
        let boundary_up, boundary_right, boundary_down, boundary_left;
        boundary_up = this.element.getClientRects()[0].top;
        boundary_right = this.element.getClientRects()[0].left + this.element.clientWidth;
        boundary_down = this.element.getClientRects()[0].top + this.element.clientHeight;
        boundary_left = this.element.getClientRects()[0].left;
        switch (this.location) {
            case "up":
                if (
                    Math.abs(event.y - boundary_up) <= this.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    this.cursorChange = true;
                    this.element.style.cursor = "s-resize";
                    this.parentElement.style.cursor = "s-resize";
                } else {
                    if (this.element.style.cursor === "s-resize" && this.cursorChange === true) {
                        this.cursorChange = false;
                        this.element.style.cursor = "auto";
                        this.parentElement.style.cursor = "auto";
                    }
                }
                break;
            case "right":
                if (
                    Math.abs(event.x - boundary_right) <= this.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    this.cursorChange = true;
                    this.element.style.cursor = "e-resize";
                    this.parentElement.style.cursor = "e-resize";
                } else {
                    if (this.element.style.cursor === "e-resize" && this.cursorChange === true) {
                        this.cursorChange = false;
                        this.element.style.cursor = "auto";
                        this.parentElement.style.cursor = "auto";
                    }
                }
                break;
            case "down":
                if (
                    Math.abs(event.y - boundary_down) <= this.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    this.cursorChange = true;
                    this.element.style.cursor = "s-resize";
                    this.parentElement.style.cursor = "s-resize";
                } else {
                    if (this.element.style.cursor === "s-resize" && this.cursorChange === true) {
                        this.cursorChange = false;
                        this.element.style.cursor = "auto";
                        this.parentElement.style.cursor = "auto";
                    }
                }
                break;
            case "left":
                if (
                    Math.abs(event.x - boundary_left) <= this.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    this.cursorChange = true;
                    this.element.style.cursor = "e-resize";
                    this.parentElement.style.cursor = "e-resize";
                } else {
                    if (this.element.style.cursor === "e-resize" && this.cursorChange === true) {
                        this.cursorChange = false;
                        this.element.style.cursor = "auto";
                        this.parentElement.style.cursor = "auto";
                    }
                }
                break;
            default:
        }
    }
}

function dragStart(event) {
    if (this.element && this.element.getClientRects().length > 0) {
        let boundary_up, boundary_right, boundary_down, boundary_left;
        boundary_up = this.element.getClientRects()[0].top;
        boundary_right = this.element.getClientRects()[0].left + this.element.clientWidth;
        boundary_down = this.element.getClientRects()[0].top + this.element.clientHeight;
        boundary_left = this.element.getClientRects()[0].left;
        switch (this.location) {
            case "up":
                this.originBase = event.screenY;
                this.originLength = this.element.clientHeight;
                if (
                    Math.abs(event.y - boundary_up) <= this.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    this.mouseDown = true;
                    this.element.style.position = "sticky";
                    this.element.style.top = boundary_up + "px";
                    if (this.preFunction) {
                        this.preFunction(this.element);
                    }
                }
                break;
            case "right":
                this.originBase = event.screenX;
                this.originLength = this.element.clientWidth;
                if (
                    Math.abs(event.x - boundary_right) <= this.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    this.mouseDown = true;
                    if (this.preFunction) {
                        this.preFunction(this.element);
                    }
                }
                break;
            case "down":
                this.originBase = event.screenY;
                this.originLength = this.element.clientHeight;
                if (
                    Math.abs(event.y - boundary_down) <= this.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    this.mouseDown = true;
                    if (this.preFunction) {
                        this.preFunction(this.element);
                    }
                }
                break;
            case "left":
                this.originBase = event.screenX;
                this.originLength = this.element.clientWidth;
                if (
                    Math.abs(event.x - boundary_left) <= this.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    this.element.style.position = "fixed";
                    this.element.style.top = "";
                    this.element.style.left = boundary_left;
                    this.mouseDown = true;
                    if (this.preFunction) {
                        this.preFunction(this.element);
                    }
                }
                break;
            default:
        }
    }
}

function dragging(event) {
    if (this.mouseDown) {
        event.preventDefault();
        switch (this.location) {
            case "up":
                this.element.style.cursor = "s-resize";
                this.parentElement.style.cursor = "s-resize";
                this.element.style.height =
                    this.originLength + (this.originBase - event.screenY) + "px";
                this.element.style.top = event.screenY + "px";
                break;
            case "right":
                this.element.style.cursor = "e-resize";
                this.parentElement.style.cursor = "e-resize";
                this.element.style.width =
                    this.originLength - (this.originBase - event.screenX) + "px";
                break;
            case "down":
                this.element.style.cursor = "s-resize";
                this.parentElement.style.cursor = "s-resize";
                this.element.style.height =
                    this.originLength - (this.originBase - event.screenY) + "px";
                break;
            case "left":
                this.element.style.cursor = "e-resize";
                this.parentElement.style.cursor = "e-resize";
                this.element.style.width =
                    this.originLength + this.originBase - event.screenX + "px";
                this.element.style.left = event.screenX + "px";
                break;
            default:
        }
        return false; // to prevent default action for other Browser
    }
}

function dragStop() {
    if (this.mouseDown) {
        this.mouseDown = false;

        if (this.callback) {
            this.callback(this.element);
        }
    }
}

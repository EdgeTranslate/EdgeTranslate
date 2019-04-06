export default function(element, location, parameter) {
    this.parentElement = parameter.parentElement
        ? parameter.parentElement
        : document.documentElement;

    this.parentElement.dragProperties = {
        callback: parameter.callback,
        cursorChange: false,
        element: element,
        location: location,
        mouseDown: false,
        originBase: 0,
        originLength: 0,
        preFunction: parameter.preFunction,
        range: parameter.dragSensitivity ? parameter.dragSensitivity : 6
    };

    this.setLocation = function(location) {
        this.parentElement.location = location;
    };

    this.enableResize = function() {
        this.parentElement.addEventListener("mousemove", dragHover);
        this.parentElement.addEventListener("mousedown", dragStart);
        this.parentElement.addEventListener("mousemove", dragging);
        this.parentElement.addEventListener("mouseup", dragStop);
    };

    this.disableResize = function() {
        this.parentElement.removeEventListener("mousemove", dragHover);
        this.parentElement.removeEventListener("mousedown", dragStart);
        this.parentElement.removeEventListener("mousemove", dragging);
        this.parentElement.removeEventListener("mouseup", dragStop);
    };
}

function findTargetElement(element) {
    while (!element.dragProperties && element.parentElement) {
        element = element.parentElement;
    }
    return element;
}

function dragHover(event) {
    let targetElement = findTargetElement(event.target);
    let properties = targetElement.dragProperties;

    if (
        properties &&
        properties.element &&
        !properties.mouseDown &&
        properties.element.getClientRects().length > 0
    ) {
        let boundary_up, boundary_right, boundary_down, boundary_left;
        boundary_up = properties.element.getClientRects()[0].top;
        boundary_right =
            properties.element.getClientRects()[0].left + properties.element.clientWidth;
        boundary_down =
            properties.element.getClientRects()[0].top + properties.element.clientHeight;
        boundary_left = properties.element.getClientRects()[0].left;
        switch (properties.location) {
            case "up":
                if (
                    Math.abs(event.y - boundary_up) <= properties.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    properties.cursorChange = true;
                    properties.element.style.cursor = "s-resize";
                    targetElement.style.cursor = "s-resize";
                } else {
                    if (
                        properties.element.style.cursor === "s-resize" &&
                        properties.cursorChange === true
                    ) {
                        properties.cursorChange = false;
                        properties.element.style.cursor = "auto";
                        targetElement.style.cursor = "auto";
                    }
                }
                break;
            case "right":
                if (
                    Math.abs(event.x - boundary_right) <= properties.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    properties.cursorChange = true;
                    properties.element.style.cursor = "e-resize";
                    targetElement.style.cursor = "e-resize";
                } else {
                    if (
                        properties.element.style.cursor === "e-resize" &&
                        properties.cursorChange === true
                    ) {
                        properties.cursorChange = false;
                        properties.element.style.cursor = "auto";
                        targetElement.style.cursor = "auto";
                    }
                }
                break;
            case "down":
                if (
                    Math.abs(event.y - boundary_down) <= properties.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    properties.cursorChange = true;
                    properties.element.style.cursor = "s-resize";
                    targetElement.style.cursor = "s-resize";
                } else {
                    if (
                        properties.element.style.cursor === "s-resize" &&
                        properties.cursorChange === true
                    ) {
                        properties.cursorChange = false;
                        properties.element.style.cursor = "auto";
                        targetElement.style.cursor = "auto";
                    }
                }
                break;
            case "left":
                if (
                    Math.abs(event.x - boundary_left) <= properties.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    properties.cursorChange = true;
                    properties.element.style.cursor = "e-resize";
                    targetElement.style.cursor = "e-resize";
                } else {
                    if (
                        properties.element.style.cursor === "e-resize" &&
                        properties.cursorChange === true
                    ) {
                        properties.cursorChange = false;
                        properties.element.style.cursor = "auto";
                        targetElement.style.cursor = "auto";
                    }
                }
                break;
            default:
        }
    }
}

function dragStart(event) {
    let targetElement = findTargetElement(event.target);
    let properties = targetElement.dragProperties;

    if (properties && properties.element && properties.element.getClientRects().length > 0) {
        let boundary_up, boundary_right, boundary_down, boundary_left;
        boundary_up = properties.element.getClientRects()[0].top;
        boundary_right =
            properties.element.getClientRects()[0].left + properties.element.clientWidth;
        boundary_down =
            properties.element.getClientRects()[0].top + properties.element.clientHeight;
        boundary_left = properties.element.getClientRects()[0].left;
        switch (properties.location) {
            case "up":
                properties.originBase = event.screenY;
                properties.originLength = properties.element.clientHeight;
                if (
                    Math.abs(event.y - boundary_up) <= properties.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    properties.mouseDown = true;
                    properties.element.style.position = "sticky";
                    properties.element.style.top = boundary_up + "px";
                    if (properties.preFunction) {
                        properties.preFunction(properties.element);
                    }
                }
                break;
            case "right":
                properties.originBase = event.screenX;
                properties.originLength = properties.element.clientWidth;
                if (
                    Math.abs(event.x - boundary_right) <= properties.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    properties.mouseDown = true;
                    if (properties.preFunction) {
                        properties.preFunction(properties.element);
                    }
                }
                break;
            case "down":
                properties.originBase = event.screenY;
                properties.originLength = properties.element.clientHeight;
                if (
                    Math.abs(event.y - boundary_down) <= properties.range &&
                    event.x > boundary_left &&
                    event.x < boundary_right
                ) {
                    properties.mouseDown = true;
                    if (properties.preFunction) {
                        properties.preFunction(properties.element);
                    }
                }
                break;
            case "left":
                properties.originBase = event.screenX;
                properties.originLength = properties.element.clientWidth;
                if (
                    Math.abs(event.x - boundary_left) <= properties.range &&
                    event.y > boundary_up &&
                    event.y < boundary_down
                ) {
                    properties.element.style.position = "absolute";
                    properties.element.style.top = "";
                    properties.element.style.left = boundary_left;
                    properties.mouseDown = true;
                    if (properties.preFunction) {
                        properties.preFunction(properties.element);
                    }
                }
                break;
            default:
        }
    }
}

function dragging(event) {
    let targetElement = findTargetElement(event.target);
    let properties = targetElement.dragProperties;

    if (properties && properties.mouseDown) {
        event.preventDefault();
        switch (properties.location) {
            case "up":
                properties.element.style.cursor = "s-resize";
                targetElement.style.cursor = "s-resize";
                properties.element.style.height =
                    properties.originLength + (properties.originBase - event.screenY) + "px";
                properties.element.style.top = event.screenY + "px";
                break;
            case "right":
                properties.element.style.cursor = "e-resize";
                targetElement.style.cursor = "e-resize";
                properties.element.style.width =
                    properties.originLength - (properties.originBase - event.screenX) + "px";
                break;
            case "down":
                properties.element.style.cursor = "s-resize";
                targetElement.style.cursor = "s-resize";
                properties.element.style.height =
                    properties.originLength - (properties.originBase - event.screenY) + "px";
                break;
            case "left":
                properties.element.style.cursor = "e-resize";
                targetElement.style.cursor = "e-resize";
                properties.element.style.width =
                    properties.originLength + properties.originBase - event.screenX + "px";
                properties.element.style.left = event.screenX + "px";
                break;
            default:
        }
        return false; // to prevent default action for other Browser
    }
}

function dragStop(event) {
    let targetElement = findTargetElement(event.target);
    let properties = targetElement.dragProperties;

    if (properties && properties.mouseDown) {
        properties.mouseDown = false;

        if (properties.callback) {
            properties.callback(properties.element);
        }
    }
}

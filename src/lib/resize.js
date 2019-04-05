export default function(element, location, parameter) {
    var properties = {
        callback: parameter.callback,
        element: element,
        location: location,
        mouseDown: false,
        originBase: 0,
        originLength: 0,
        parentElement: parameter.parentElement,
        preFunction: parameter.preFunction,
        range: parameter.dragSensitivity
    };

    function dragHover(event) {
        if (
            properties.element &&
            !properties.mouseDown &&
            properties.element.getClientRects().length > 0
        ) {
            let boundary;
            switch (properties.location) {
                case "up":
                    boundary = properties.element.getClientRects()[0].top;
                    break;
                case "right":
                    boundary =
                        properties.element.getClientRects()[0].left +
                        properties.element.clientWidth;
                    // console.log(boundary);
                    break;
                case "down":
                    boundary =
                        properties.element.getClientRects()[0].top +
                        properties.element.clientHeight;
                    break;
                case "left":
                    boundary = properties.element.getClientRects()[0].left;
                    // console.log(boundary);
                    break;
                default:
            }
            if (Math.abs(event.x - boundary) <= properties.range) {
                properties.parentElement.style.cursor = "e-resize";
            } else {
                properties.parentElement.style.cursor = "auto";
            }
        }
    }

    function dragStart(event) {
        if (properties.element && properties.element.getClientRects().length > 0) {
            let boundary;
            switch (properties.location) {
                case "up":
                    boundary = properties.element.getClientRects()[0].top;
                    properties.originBase = event.screenY;
                    properties.originLength = properties.element.clientHeight;
                    break;
                case "right":
                    boundary =
                        properties.element.getClientRects()[0].left +
                        properties.element.clientWidth;
                    properties.originBase = event.screenX;
                    properties.originLength = properties.element.clientWidth;
                    break;
                case "down":
                    boundary =
                        properties.element.getClientRects()[0].top +
                        properties.element.clientHeight;
                    properties.originBase = event.screenY;
                    properties.originLength = properties.element.clientHeight;
                    break;
                case "left":
                    boundary = properties.element.getClientRects()[0].left;
                    properties.originBase = event.screenX;
                    properties.originLength = properties.element.clientWidth;
                    break;
                default:
            }
            if (Math.abs(event.x - boundary) <= properties.range) {
                properties.mouseDown = true;
                if (properties.preFunction) {
                    properties.preFunction(properties.element);
                }
            }
        }
    }

    function dragging(event) {
        if (properties.mouseDown) {
            properties.parentElement.style.cursor = "e-resize";
            event.preventDefault();
            switch (properties.location) {
                case "up":
                    break;
                case "right":
                    properties.element.style.width =
                        properties.originLength - (properties.originBase - event.screenX) + "px";
                    break;
                case "down":
                    break;
                case "left":
                    properties.element.style.width =
                        properties.originLength + properties.originBase - event.screenX + "px";
                    break;
                default:
            }
            return false; // to prevent default action for other Browser
        }
    }

    function dragStop() {
        if (properties.mouseDown) {
            properties.parentElement.style.cursor = "auto";
            properties.mouseDown = false;
            if (properties.callback) {
                properties.callback(properties.element);
            }
        }
    }

    if (!properties.parentElement) {
        properties.parentElement = document.documentElement;
    }
    if (!properties.range) {
        properties.range = 6;
    }
    properties.parentElement.addEventListener("mousemove", dragHover);
    properties.parentElement.addEventListener("mousedown", dragStart);
    properties.parentElement.addEventListener("mousemove", dragging);
    properties.parentElement.addEventListener("mouseup", dragStop);

    return properties;
}

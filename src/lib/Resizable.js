export default (function() {
    function Resizable(element, location, parameter) {
        this.parentElement = parameter.parentElement
            ? parameter.parentElement
            : document.documentElement;

        this.parentElement.dragProperties = {
            callback: parameter.callback,
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

    function findResizable(element) {
        while (!element.dragProperties && element.parentElement) {
            element = element.parentElement;
        }
        return element;
    }

    Resizable.prototype.dragHover = function dragHover(event) {
        let resizable = findResizable(event.target);
        let properties = resizable.dragProperties;

        if (properties) {
            if (properties.element && !properties.mouseDown) {
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
                    resizable.style.cursor = "e-resize";
                } else {
                    resizable.style.cursor = "auto";
                }
            }
        }
    };

    Resizable.prototype.dragStart = function dragStart(event) {
        let resizable = findResizable(event.target);
        let properties = resizable.dragProperties;

        if (properties) {
            if (properties.element) {
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
    };

    Resizable.prototype.dragging = function dragging(event) {
        let resizable = findResizable(event.target);
        let properties = resizable.dragProperties;

        if (properties) {
            if (properties.mouseDown) {
                resizable.style.cursor = "e-resize";
                event.preventDefault();
                switch (properties.location) {
                    case "up":
                        break;
                    case "right":
                        properties.element.style.width =
                            properties.originLength -
                            (properties.originBase - event.screenX) +
                            "px";
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
    };

    Resizable.prototype.dragStop = function dragStop(event) {
        let resizable = findResizable(event.target);
        let properties = resizable.dragProperties;

        if (properties) {
            if (properties.mouseDown) {
                properties.mouseDown = false;
                resizable.style.cursor = "auto";
                if (properties.callback) {
                    properties.callback(properties.element);
                }
            }
        }
    };

    return Resizable;
})();

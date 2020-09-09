import css from "css";
// import style from "./moveable.css";
// const style = require("./moveable.css");

export default class moveable {
    constructor(targetElement, options) {
        // store all event handlers the user set
        this.handlers = {};
        // store the target moveable element
        this.targetElement = targetElement;
        // store the options the user set
        this.options = options;
        // flag if the element is dragging
        this.dragging = false;
        // store some drag status value
        this.dragSore = {};

        // store the activated resizable direction of the target element
        // all valid directions: [s, se, e, ne, n, nw, w, sw]
        this.directions = [];
        this.parseDirection();
        this.resizeInitiate();
    }

    /**
     * parse the direction option in this.options to an array
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     */
    parseDirection() {
        switch (getVarType(this.options.directions)) {
            case "Array":
                this.directions = this.options.directions;
                break;
            case "string": {
                let arr = this.options.directions.match(/([swne]+)/g);
                for (let i in arr) {
                    this.directions.push(arr[i]);
                }
                break;
            }
            case "Object": {
                for (let d in this.options.directions) this.directions.push(d);
                break;
            }
            case "undefined":
                this.directions = ["s", "se", "e", "ne", "n", "nw", "w", "sw"];
        }
    }

    /**
     * add mouse down event listener
     * set drag start status
     */
    dragStart() {
        if (this.options.draggable) {
            this.dragEnd();
            this.targetElement.addEventListener("mousedown", e => {
                this.dragging = true;
                // store the start css translate value. [x,y]
                this.dragSore.startTranslate = [];
                // store the start mouse absolute position. [x,y]
                this.dragSore.startMouse = [e.pageX, e.pageY];
                // store the start element absolute position. [x,y]
                this.dragSore.startElement = [
                    this.targetElement.getBoundingClientRect().left +
                        document.documentElement.scrollLeft,
                    this.targetElement.getBoundingClientRect().top +
                        document.documentElement.scrollTop
                ];

                this.handlers.dragStart({
                    inputEvent: e,
                    set: position => {
                        this.dragSore.startTranslate = position;
                        this.targetElement.style.transform = `translate(${position[0]}px,${position[1]}px)`;
                    },
                    stop: () => {
                        this.dragging = false;
                    },
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY
                });
                if (this.dragging) this.drag();
            });
        }
    }

    /**
     * add mouse move event listener
     * calculate the current translate value
     */
    drag() {
        this.dragSore.dragHandler = function(e) {
            if (this.handlers.drag) {
                // calculate the current translate value
                let translate = [
                    e.pageX - this.dragSore.startMouse[0] + this.dragSore.startTranslate[0],
                    e.pageY - this.dragSore.startMouse[1] + this.dragSore.startTranslate[1]
                ];
                this.handlers.drag({
                    inputEvent: e,
                    target: this.targetElement,
                    transform: `translate(${translate[0]}px,${translate[1]}px)`,
                    translate: translate
                });
            }
        }.bind(this);
        if (this.dragging) {
            document.documentElement.addEventListener("mousemove", this.dragSore.dragHandler);
        }
    }

    /**
     * add mouse up event listener
     * remove dragging event
     */
    dragEnd() {
        document.documentElement.addEventListener("mouseup", () => {
            if (this.dragging) {
                this.dragging = false;
                document.documentElement.removeEventListener(
                    "mousemove",
                    this.dragSore.dragHandler
                );
                if (this.handlers.dragEnd) this.handlers.dragEnd();
            }
        });
    }

    /**
     *  valid directions: s, se, e, ne, n, nw, w, sw
     */
    resizeInitiate() {
        if (this.options.resizable) {
            for (let direction of this.options.direction) {
                switch (direction) {
                    case "s":
                        break;
                    case "se":
                        break;
                    case "e":
                        break;
                    case "ne":
                        break;
                    case "n":
                        break;
                    case "nw":
                        break;
                    case "w":
                        break;
                    case "sw":
                        break;
                }
            }
        }
        // TODO
    }

    resizeStart() {
        // TODO
    }

    resize() {
        // TODO
    }

    resizeEnd() {
        // TODO
    }

    /**
     * add event handler to the movable object
     * @param {String} eventType the name of event type. enum:{dragStart,drag,dragEnd,resizeStart,resize,resizeEnd}
     * @param {function} handler the handler function of the corresponding event type
     */
    on(eventType, handler) {
        this.handlers[eventType] = handler;
        switch (eventType) {
            case "dragStart":
                this.dragStart();
                break;
            case "drag":
                break;
        }
        return this;
    }

    /**
     * make the target movable element to do the request movement
     * @param {String} moveableType "draggable": do drag movement. "resizable": do resize movement
     * @param {Object} moveableParameter the specific moveable parameters
     */
    request(moveableType, moveableParameter) {
        switch (moveableType) {
            case "draggable":
                this.dragRequest(moveableParameter);
                break;
            case "resizable":
                break;
        }
    }

    /**
     *	drag the target draggable element to the request position
     * @param {Object} draggableParameter {x:absolute x value,y:absolute y value,deltaX: delta x value, deltaY: delta y value}
     */
    dragRequest(draggableParameter) {
        if (this.options.draggable) {
            if (draggableParameter) {
                /* drag start */
                this.dragging = true;
                // store the start css translate value. [x,y]
                this.dragSore.startTranslate = [];

                this.handlers.dragStart &&
                    this.handlers.dragStart({
                        set: position => {
                            this.dragSore.startTranslate = position;
                        },
                        stop: () => {
                            this.dragging = false;
                        }
                    });

                /* dragging event */
                let translate;
                if (draggableParameter.x !== undefined && draggableParameter.y !== undefined)
                    translate = [draggableParameter.x, draggableParameter.y];
                else if (
                    draggableParameter.deltaX !== undefined &&
                    draggableParameter.deltaY !== undefined
                ) {
                    translate = [
                        this.dragSore.startTranslate[0] + draggableParameter.deltaX,
                        this.dragSore.startTranslate[1] + draggableParameter.deltaY
                    ];
                }
                this.handlers.drag &&
                    this.handlers.drag({
                        target: this.targetElement,
                        transform: `translate(${translate[0]}px,${translate[1]}px)`,
                        translate: translate
                    });

                /* dragging end */
                this.dragging = false;
                this.handlers.dragEnd && this.handlers.dragEnd();
            }
        }
    }

    resizeRequest(resizeParameter) {
        // TODO
    }
}

/**
 * pre precess a css string to an object
 * @param {String} style css style string
 * @returns {Object} {selectorName:{property:value},...,stringifyItems:function,toString:function}
 */
function cssPreProcess(style) {
    let ast = css.parse(style);
    let result = {};
    for (let rule of ast.stylesheet.rules) {
        let item = {};
        let selector = rule.selectors[0];
        for (let declaration of rule.declarations) {
            item[declaration.property] = declaration.value;
        }
        result[selector] = item;
    }
    /**
     * stringify css entries of property and value
     * @param {Object} items {cssProperty: value}
     */
    result.stringifyItems = function(items) {
        let text = "";
        for (let key in items) {
            text += `${key}: ${items[key]};\n`;
        }
        return text;
    };
    result.toString = function() {
        let text = "";
        for (let selector in this) {
            if (typeof this[selector] !== "function")
                text += `${selector}{\n${this.stringifyItems(this[selector])}}\n`;
        }
        return text;
    };
    return result;
}

function getVarType(val) {
    let type = typeof val;
    // object need to be judged by Object.prototype.toString.call
    if (type === "object") {
        let typeStr = Object.prototype.toString.call(val);
        // parse [object String]
        typeStr = typeStr.split(" ")[1];
        type = typeStr.substring(0, typeStr.length - 1);
    }
    return type;
}

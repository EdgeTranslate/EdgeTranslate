/**
 * module: content
 * part: display
 * function: add moveable(draggable and resizable) function to a specific element
 */

import css from "css";
import style from "./moveable.css"; // read plain content from css file

export default class moveable {
    constructor(targetElement, options) {
        // store all event handlers the user set
        this.handlers = {};
        // store the target moveable element
        this.targetElement = targetElement;
        // store the options the user set
        this.options = options;

        /* draggable part */
        // flag if the element is dragging
        this.dragging = false;
        // store some drag status value
        this.dragStore = {};
        this.dragInitiate();

        /* resizable part */
        // store some resize status value
        this.resizeStore = {};
        // flag if the element is resizing
        this.resizing = false;
        // store the threshold value for resizable function
        this.resizeThreshold = {};
        // store the activated resizable direction of the target element
        // all valid directions: [s, se, e, ne, n, nw, w, sw]
        this.directions = {};
        this.resizeInitiate();
    }

    /**
     * do some initial thing for draggable function
     * 1. generate drag start and drag event handlers by wrapping this.dragStart and this.drag
     * 2. add mouse down event listener to the target draggable element
     */
    dragInitiate() {
        if (this.options.draggable) {
            this.dragEnd();
            // wrap a drag start event handler
            this.dragStartHandler = function(e) {
                this.dragStart(e);
            }.bind(this);
            // wrap a drag(dragging) event handler
            this.dragHandler = function(e) {
                this.drag(e);
            }.bind(this);
            this.targetElement.addEventListener("mousedown", this.dragStartHandler);
        }
    }

    /**
     * the drag start event handler(mouse down event handler)
     * store some status value of drag start event
     * @param {event} e the mouse down event
     */
    dragStart(e) {
        this.dragging = true;
        // store the start css translate value. [x,y]
        this.dragStore.startTranslate = [];
        // store the start mouse absolute position. [x,y]
        this.dragStore.startMouse = [e.pageX, e.pageY];
        // store the start element absolute position. [x,y]
        this.dragStore.startElement = [
            this.targetElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
            this.targetElement.getBoundingClientRect().top + document.documentElement.scrollTop
        ];

        this.handlers.dragStart &&
            this.handlers.dragStart({
                inputEvent: e,
                set: position => {
                    this.dragStore.startTranslate = [position[0], position[1]]; // deep copy
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
        if (this.dragging) document.documentElement.addEventListener("mousemove", this.dragHandler);
    }

    /**
     * the drag(dragging) event handler(mouse move event handler)
     * calculate the current translate value
     * call the drag event handler given by users
     * @param {event} e the mouse move event
     */
    drag(e) {
        e.preventDefault();
        // calculate the current translate value
        this.dragStore.currentTranslate = [
            e.pageX - this.dragStore.startMouse[0] + this.dragStore.startTranslate[0],
            e.pageY - this.dragStore.startMouse[1] + this.dragStore.startTranslate[1]
        ];
        this.handlers.drag &&
            this.handlers.drag({
                inputEvent: e,
                target: this.targetElement,
                transform: `translate(${this.dragStore.currentTranslate[0]}px,${this.dragStore.currentTranslate[1]}px)`,
                translate: [this.dragStore.currentTranslate[0], this.dragStore.currentTranslate[1]] // deep copy
            });
    }

    /**
     * add mouse up event listener
     * remove the dragging event listener
     */
    dragEnd() {
        document.documentElement.addEventListener("mouseup", () => {
            if (this.dragging) {
                this.dragging = false;
                document.documentElement.removeEventListener("mousemove", this.dragHandler);
                if (this.handlers.dragEnd)
                    this.handlers.dragEnd({
                        translate: [
                            this.dragStore.currentTranslate[0],
                            this.dragStore.currentTranslate[1]
                        ]
                    }); // deep copy
            }
        });
    }

    /**
     * do some initial thing for resizable function:
     * 1. generate resize start and resize event handlers by wrapping this.resizeStart and this.resize
     * 2. add resizable div elements to the target element
     * 3. add mouse down event listener to the resizable div element
     */
    resizeInitiate() {
        if (this.options.resizable) {
            this.resizeEnd();
            // wrap a resize start event handler
            this.resizeStartHandler = function(e) {
                this.resizeStart(e);
            }.bind(this);
            // wrap a resize(resizing) event handler
            this.resizeHandler = function(e) {
                this.resize(e);
            }.bind(this);

            // parse the direction parameter given by users
            this.parseDirection();

            // parse the resize threshold parameter given by users
            this.parseThreshold();

            // create resizable div elements
            this.createResizableDivElements();
        }
    }

    /**
     * create resizable div elements and their div container according to direction settings
     */
    createResizableDivElements() {
        let cssObject = cssPreProcess(style);
        /* create a container for resizable div elements */
        // if the container has not been created
        if (!this.resizeStore.divContainer) {
            let divContainer = document.createElement("div");
            let divContainerID = "resizable-container";
            divContainer.id = divContainerID;
            divContainer.style.cssText = cssObject.stringifyItems(cssObject[`#${divContainerID}`]);
            this.targetElement.appendChild(divContainer);
            this.resizeStore.divContainer = divContainer;
            this.resizeStore.divContainer.addEventListener("mousedown", this.resizeStartHandler);
        }
        // clear all existed div elements
        else this.resizeStore.divContainer.innerHTML = "";

        /* create resizable div elements according to direction settings */
        for (let direction in this.directions) {
            // css setting of the specific div
            let divCss = cssObject[`#resizable-${direction}`];
            // store the css size value (used for width height properties)
            let sizeThresholdCSSValue = `${this.resizeThreshold[direction]}px`;
            // store the css position value ((used for left right top bottom properties))
            let positionThresholdCSSValue = `-${this.resizeThreshold[direction]}px`;
            /* change css setting according to direction */
            switch (direction) {
                case "s":
                    divCss.bottom = positionThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
                case "se":
                    divCss.right = positionThresholdCSSValue;
                    divCss.bottom = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
                case "e":
                    divCss.right = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    break;
                case "ne":
                    divCss.right = positionThresholdCSSValue;
                    divCss.top = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
                case "n":
                    divCss.top = positionThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
                case "nw":
                    divCss.left = positionThresholdCSSValue;
                    divCss.top = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
                case "w":
                    divCss.left = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    break;
                case "sw":
                    divCss.left = positionThresholdCSSValue;
                    divCss.bottom = positionThresholdCSSValue;
                    divCss.width = sizeThresholdCSSValue;
                    divCss.height = sizeThresholdCSSValue;
                    break;
            }
            /* create resizable div elements and append to the container */
            let div = document.createElement("div");
            div.id = `resizable-${direction}`;
            div.style.cssText = cssObject.stringifyItems(divCss);
            this.resizeStore.divContainer.appendChild(div);
            // store the div resizable element
            this.directions[direction] = div;
        }
    }

    /**
     * set new directions for the target resizable elements
     * and recreate div resizable elements
     * @param {Object} directionsOptions new direction options
     */
    setDirections(directionsOptions) {
        this.options.directions = directionsOptions;
        this.parseDirection();
        if (this.options.resizable) this.createResizableDivElements();
    }

    /**
     * parse the direction option in this.options to an object(e.g.: {s:null,se:null})
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support array(e.g.: [s,se]), string(e.g.: "s,se") and object(e.g.: {s:null,se:null}) these types of parameter
     */
    parseDirection() {
        this.directions = {};
        switch (getVarType(this.options.directions)) {
            case "Array":
                for (let d of this.options.directions) this.directions[d] = null;
                break;
            case "string": {
                let arr = this.options.directions.match(/([swne]+)/g);
                for (let i in arr) this.directions[arr[i]] = null;
                break;
            }
            case "Object": {
                this.directions = this.options.directions;
                break;
            }
            case "undefined":
                this.directions = {
                    s: null,
                    se: null,
                    e: null,
                    ne: null,
                    n: null,
                    nw: null,
                    w: null,
                    sw: null
                };
        }
    }

    /**
     * parse the threshold option in this.options to an object(e.g.: {s:10,se:10})
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support number(e.g.: 10), object(e.g.: {s:5, se:3, edge: 5, corner: 2}) and undefined these types of parameter
     * Hint: "corner" in object means value of directions:[s,e,n,w]."edge" in object means value of directions:[se,ne,nw,sw]
     */
    parseThreshold() {
        let defaultThreshold = 10;
        this.resizeThreshold = {
            s: defaultThreshold,
            se: defaultThreshold,
            e: defaultThreshold,
            ne: defaultThreshold,
            n: defaultThreshold,
            nw: defaultThreshold,
            w: defaultThreshold,
            sw: defaultThreshold
        };
        switch (getVarType(this.options.threshold)) {
            // set all directions to the given number
            case "number":
                for (let t in this.resizeThreshold)
                    this.resizeThreshold[t] = this.options.threshold;
                break;
            case "Object": {
                for (let t in this.options.threshold) {
                    let value = this.options.threshold[t];
                    // set all div elements' threshold in four corners to the given value
                    if (t === "corner") {
                        this.resizeThreshold.se = value;
                        this.resizeThreshold.ne = value;
                        this.resizeThreshold.nw = value;
                        this.resizeThreshold.sw = value;
                    }
                    // set all div elements' threshold on edges to the given value
                    else if (t === "edge") {
                        this.resizeThreshold.e = value;
                        this.resizeThreshold.n = value;
                        this.resizeThreshold.s = value;
                        this.resizeThreshold.w = value;
                    } else this.resizeThreshold[t] = value;
                }
                break;
            }
            // use default resize threshold value
            case "undefined":
                break;
        }
    }

    /**
     * set new resize threshold value for the target resizable elements
     * and recreate div resizable elements
     * @param {Object} thresholdOptions new threshold options
     */
    setThreshold(thresholdOptions) {
        this.options.threshold = thresholdOptions;
        this.parseThreshold();
        if (this.options.resizable) this.createResizableDivElements();
    }

    /**
     * the resize start event handler(mouse down event handler)
     * store some status value of resize start event
     * @param {event} e the mouse down event
     */
    resizeStart(e) {
        this.resizing = true;
        // store the start css translate value. [x,y]
        // this.resizeStore.startTranslate
        // store the current css translate value. [x,y]
        this.resizeStore.currentTranslate;
        // store the start mouse absolute position. [x,y]
        this.resizeStore.startMouse = [e.pageX, e.pageY];
        // store the start element absolute position. [x,y]
        this.resizeStore.startElement = [
            this.targetElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
            this.targetElement.getBoundingClientRect().top + document.documentElement.scrollTop
        ];
        this.resizeStore.startWidth = this.targetElement.offsetWidth;
        this.resizeStore.startHeight = this.targetElement.offsetHeight;
        // store the activated resizable div elements
        this.resizeStore.target = e.target;

        /* call the drag start handler written by the user */
        this.handlers.resizeStart &&
            this.handlers.resizeStart({
                // set the start position
                set: position => {
                    this.resizeStore.startTranslate = [position[0], position[1]]; // deep copy
                    this.targetElement.style.transform = `translate(${position[0]}px,${position[1]}px)`;
                },
                // stop the following drag and dragEnd events
                stop: () => {
                    this.resizing = false;
                },
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY
            });
        if (this.resizing)
            document.documentElement.addEventListener("mousemove", this.resizeHandler);
    }

    /**
     * the resize(resizing) event handler(mouse move event handler)
     * calculate the current translate value and the size of target element
     * call the resize event handler given by users
     * @param {event} e the mouse move event
     */
    resize(e) {
        e.preventDefault();
        // the delta position of mouse
        let delta = [
            e.pageX - this.dragStore.startMouse[0],
            e.pageY - this.dragStore.startMouse[1]
        ];
        // store updated width, height, translate value
        let width = this.resizeStore.startWidth,
            height = this.resizeStore.startHeight,
            translate = [this.resizeStore.startTranslate[0], this.resizeStore.startTranslate[1]]; // deep copy

        /* calculate width, height, translate value according to different activated resizable div elements*/
        switch (this.resizeStore.target) {
            case this.directions["s"]:
                height += delta[1];
                break;
            case this.directions["se"]:
                width += delta[0];
                height += delta[1];
                break;
            case this.directions["e"]:
                width += delta[0];
                break;
            case this.directions["ne"]:
                width += delta[0];
                height -= delta[1];
                translate[1] += delta[1];
                break;
            case this.directions["n"]:
                height -= delta[1];
                translate[1] += delta[1];
                break;
            case this.directions["nw"]:
                width -= delta[0];
                height -= delta[1];
                translate = [(translate[0] += delta[0]), (translate[1] += delta[1])];
                break;
            case this.directions["w"]:
                width -= delta[0];
                translate[0] += delta[0];
                break;
            case this.directions["sw"]:
                width -= delta[0];
                height += delta[1];
                translate[0] += delta[0];
                break;
        }
        // store the current translate value. used in resize end handler
        this.resizeStore.currentTranslate = translate;
        /* call the resize event handler given by users */
        this.handlers.resize &&
            this.handlers.resize({
                target: this.targetElement,
                width: width,
                height: height,
                translate: [translate[0], translate[1]] // the target translate(deep copied) value the element should move
            });
    }

    /**
     * add mouse up event listener
     * remove the resizing event listener
     */
    resizeEnd() {
        document.documentElement.addEventListener("mouseup", () => {
            if (this.resizing) {
                this.resizing = false;
                document.documentElement.removeEventListener("mousemove", this.resizeHandler);
                if (this.handlers.resizeEnd)
                    this.handlers.resizeEnd({
                        translate: [
                            this.resizeStore.currentTranslate[0],
                            this.resizeStore.currentTranslate[1]
                        ] // deep copy
                    });
            }
        });
    }

    /**
     * add an event handler to the movable object
     * @param {String} eventType the name of event type. enum:{dragStart,drag,dragEnd,resizeStart,resize,resizeEnd}
     * @param {function} handler the handler function of the corresponding event type
     */
    on(eventType, handler) {
        this.handlers[eventType] = handler;
        return this;
    }

    /**
     * make the target movable element to do the request movement
     * @param {String} moveableType "draggable": do drag movement. "resizable": do resize movement
     * @param {Object} moveableParameter the specific moveable parameters
     * @returns {boolean} if the request has been executed successfully
     */
    request(moveableType, moveableParameter) {
        switch (moveableType) {
            case "draggable":
                return this.dragRequest(moveableParameter);
            case "resizable":
                return this.resizeRequest(moveableParameter);
            default:
                return false;
        }
    }

    /**
     *	drag the target draggable element to the request position
     * @param {Object} draggableParameter {x:absolute x value,y:absolute y value,deltaX: delta x value, deltaY: delta y value}
     * @returns {boolean} if the drag request has been executed successfully
     */
    dragRequest(draggableParameter) {
        if (!this.options.draggable || !draggableParameter) return false;
        /* calculate the translate value according to parameters */
        let translate;
        if (draggableParameter.x !== undefined && draggableParameter.y !== undefined)
            translate = [draggableParameter.x, draggableParameter.y];
        else if (
            draggableParameter.deltaX !== undefined &&
            draggableParameter.deltaY !== undefined
        ) {
            translate = [
                this.dragStore.startTranslate[0] + draggableParameter.deltaX,
                this.dragStore.startTranslate[1] + draggableParameter.deltaY
            ];
        } else return false;

        /* drag start */
        this.dragging = true;
        // store the start css translate value. [x,y]
        this.dragStore.startTranslate = [];

        this.handlers.dragStart &&
            this.handlers.dragStart({
                set: position => {
                    this.dragStore.startTranslate = position;
                },
                stop: () => {
                    this.dragging = false;
                }
            });

        /* dragging event */
        this.handlers.drag &&
            this.handlers.drag({
                target: this.targetElement,
                transform: `translate(${translate[0]}px,${translate[1]}px)`,
                translate: translate
            });

        /* dragging end */
        this.dragging = false;
        this.handlers.dragEnd &&
            this.handlers.dragEnd({
                translate: [translate[0], translate[1]] // deep copy
            });
        return true;
    }

    /**
     * resize the target resizable element to the request size
     * @param {Object} resizeParameter {width: resize to the ${width} value, height: resize to the ${height} value}
     * @returns {boolean} if the resize request has been executed successfully
     */
    resizeRequest(resizeParameter) {
        /* judge resizable condition */
        if (
            !this.options.resizable ||
            !resizeParameter ||
            resizeParameter.width === undefined ||
            resizeParameter.height === undefined
        )
            return false;
        /* start resize */
        // store the start css translate value. [x,y]
        this.resizeStore.startTranslate = [];
        this.handlers.resizeStart &&
            this.handlers.resizeStart({
                set: position => {
                    this.resizeStore.startTranslate = position;
                }
            });

        /* resize the element */
        this.handlers.resize &&
            this.handlers.resize({
                target: this.targetElement,
                width: resizeParameter.width,
                height: resizeParameter.height,
                translate: this.resizeStore.startTranslate
            });
        /* resize end */
        this.handlers.resizeEnd &&
            this.handlers.resizeEnd({
                translate: this.resizeStore.startTranslate
            });
        return true;
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

/**
 * detect the type of the given variable
 * @param {Object} val any type of variable
 */
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

/**
 * module: content
 * part: display.moveable
 * function: add resizable function to a specific element
 */

import css from "css";
import style from "./resizable.css"; // read plain content from css file

export default class resizable {
    constructor(targetElement, options, handlers) {
        this.targetElement = targetElement;
        this.options = options;
        this.handlers = handlers;

        /* resizable part */
        // store some resize status value
        this.store = {};
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
     * do some initial thing for resizable function:
     * 1. generate resize start and resize event handlers by wrapping this.resizeStart and this.resize
     * 2. add resizable div elements to the target element
     * 3. add mouse down event listener to the resizable div element
     */
    resizeInitiate() {
        this.resizeEnd();
        // wrap a resize start event handler
        this.resizeStartHandler = (e) => {
            this.resizeStart(e);
        };
        // wrap a resize(resizing) event handler
        this.resizeHandler = (e) => {
            this.resize(e);
        };

        // parse the direction parameter given by users
        this.directions = resizable.parseDirection(this.options.directions);

        // parse the resize threshold parameter given by users
        this.resizeThreshold = resizable.parseThreshold(this.options.threshold);

        // create resizable div elements
        this.createResizableDivElements();

        // initialize the size limit
        this.sizeLimit = {
            minWidth: this.options.minWidth !== undefined ? this.options.minWidth : 0,
            maxWidth:
                this.options.maxWidth !== undefined
                    ? this.options.maxWidth
                    : Number.POSITIVE_INFINITY,
            minHeight: this.options.minHeight !== undefined ? this.options.minHeight : 0,
            maxHeight:
                this.options.maxHeight !== undefined
                    ? this.options.maxHeight
                    : Number.POSITIVE_INFINITY,
        };
    }

    /**
     * create resizable div elements and their div container according to direction settings
     */
    createResizableDivElements() {
        let cssObject = cssPreProcess(style);
        /* create a container for resizable div elements */
        // if the container has not been created
        if (!this.store.divContainer) {
            let divContainer = document.createElement("div");
            let divContainerID = "resizable-container";
            divContainer.id = divContainerID;
            divContainer.style.cssText = cssObject.stringifyItems(cssObject[`#${divContainerID}`]);
            this.targetElement.appendChild(divContainer);
            this.store.divContainer = divContainer;
            this.store.divContainer.addEventListener("mousedown", this.resizeStartHandler);
        }
        // clear all existed div elements
        else this.store.divContainer.innerHTML = "";

        /* create resizable div elements according to direction settings */
        for (let direction in this.directions) {
            // css setting of the specific div
            let divCss = cssObject[`#resizable-${direction}`];
            // store the css size value (used for width height properties)
            let sizeThresholdCSSValue = `${this.resizeThreshold[direction]}px`;
            // store the css position value ((used for left right top bottom properties))
            let positionThresholdCSSValue;
            /**
             * set thresholdPosition to decide where the resizable area is
             * "in": the activated resizable area is within the target element
             * "center": the activated resizable area is half within the target element and half out of the it
             * "out": the activated resizable area is out of the target element
             * a number(0~1): a ratio which determines the how much the the activated resizable area beyond the element
             */
            switch (this.options.thresholdPosition) {
                case undefined:
                case "in":
                    positionThresholdCSSValue = "0";
                    break;
                case "center":
                    positionThresholdCSSValue = `-${0.5 * this.resizeThreshold[direction]}px`;
                    break;
                case "out":
                    positionThresholdCSSValue = `-${this.resizeThreshold[direction]}px`;
                    break;
                default:
                    if (getVarType(this.options.thresholdPosition) === "number")
                        positionThresholdCSSValue = `-${
                            this.options.thresholdPosition * this.resizeThreshold[direction]
                        }px`;
                    break;
            }
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
            div.setAttribute("class", "resizable-div");
            div.style.cssText = cssObject.stringifyItems(divCss);
            this.store.divContainer.appendChild(div);
            // store the div resizable element
            this.directions[direction] = div;
        }
    }

    /**
     * set new directions for the target resizable elements
     * and recreate div resizable elements
     * @param {Array|string|Object|undefined} directionsOption new direction options
     */
    setDirections(directionsOption) {
        this.directions = resizable.parseDirection(directionsOption);
        this.createResizableDivElements();
    }

    /**
     * parse the direction option in this.options to an object(e.g.: {s:null,se:null})
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support array(e.g.: [s,se]), string(e.g.: "s,se") and object(e.g.: {s:null,se:null}) these types of parameter
     * @param {Array|string|Object|undefined} option new direction option
     * @returns {Object} a parsed direction option object(e.g.: {s:null,se:null})
     */
    static parseDirection(option) {
        let directions = {};
        switch (getVarType(option)) {
            case "Array":
                for (let d of option) directions[d] = null;
                break;
            case "string": {
                let arr = option.match(/([swne]+)/g);
                for (let i in arr) directions[arr[i]] = null;
                break;
            }
            case "Object": {
                directions = option;
                break;
            }
            case "undefined":
                directions = {
                    s: null,
                    se: null,
                    e: null,
                    ne: null,
                    n: null,
                    nw: null,
                    w: null,
                    sw: null,
                };
        }
        return directions;
    }

    /**
     * parse new resize threshold value for the target resizable elements
     * and recreate div resizable elements
     * @param {number|Object|undefined} thresholdOption new threshold options
     */
    setThreshold(thresholdOption) {
        this.resizeThreshold = resizable.parseThreshold(thresholdOption);
        this.createResizableDivElements();
    }

    /**
     * parse the threshold option in this.options to an object(e.g.: {s:10,se:10})
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support number(e.g.: 10), object(e.g.: {s:5, se:3, edge: 5, corner: 2}) and undefined these types of parameter
     * Hint: "corner" in object means value of directions:[s,e,n,w]."edge" in object means value of directions:[se,ne,nw,sw]
     * @param {number|Object|undefined} option the threshold option
     * @returns {Object} the parsed result object(e.g.: {s:10,se:10})
     */
    static parseThreshold(option) {
        let defaultThreshold = 10;
        let resizeThreshold = {
            s: defaultThreshold,
            se: defaultThreshold,
            e: defaultThreshold,
            ne: defaultThreshold,
            n: defaultThreshold,
            nw: defaultThreshold,
            w: defaultThreshold,
            sw: defaultThreshold,
        };
        switch (getVarType(option)) {
            // set all directions to the given number
            case "number":
                for (let t in resizeThreshold) resizeThreshold[t] = option;
                break;
            case "Object": {
                for (let t in option) {
                    let value = option[t];
                    // set all div elements' threshold in four corners to the given value
                    if (t === "corner") {
                        resizeThreshold.se = value;
                        resizeThreshold.ne = value;
                        resizeThreshold.nw = value;
                        resizeThreshold.sw = value;
                    }
                    // set all div elements' threshold on edges to the given value
                    else if (t === "edge") {
                        resizeThreshold.e = value;
                        resizeThreshold.n = value;
                        resizeThreshold.s = value;
                        resizeThreshold.w = value;
                    } else resizeThreshold[t] = value;
                }
                break;
            }
            // use default resize threshold value
            case "undefined":
                break;
        }
        return resizeThreshold;
    }

    /**
     * the resize start event handler(mouse down event handler)
     * store some status value of resize start event
     * @param {event} e the mouse down event
     */
    resizeStart(e) {
        this.resizing = true;
        // store the start css translate value. [x,y]
        this.store.startTranslate = [0, 0];
        // store the current css translate value. [x,y]
        this.store.currentTranslate;
        // store the start mouse absolute position. [x,y]
        this.store.startMouse = [e.pageX, e.pageY];
        // store the start element absolute position. [x,y]
        this.store.startElement = [
            this.targetElement.getBoundingClientRect().left + this.options.container.scrollLeft,
            this.targetElement.getBoundingClientRect().top + this.options.container.scrollTop,
        ];
        // store the start size(width and height) of the element
        this.store.startSize = [this.targetElement.offsetWidth, this.targetElement.offsetHeight];
        // store the current width and height of the element
        this.store.currentSize = this.store.startSize;
        // store the activated resizable div elements
        this.store.target = e.target;

        /* call the drag start handler written by the user */
        this.handlers.resizeStart &&
            this.handlers.resizeStart({
                // set the start position
                set: (position) => {
                    this.store.startTranslate = [position[0], position[1]]; // deep copy
                    this.targetElement.style.transform = `translate(${position[0]}px,${position[1]}px)`;
                },
                // stop the following drag and dragEnd events
                stop: () => {
                    this.resizing = false;
                },
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            });

        // store the current translate value. used in resize end handler
        this.store.currentTranslate = this.store.startTranslate;

        if (this.resizing) {
            e.preventDefault();
            this.options.container.addEventListener("mousemove", this.resizeHandler);
        }
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
        let delta = [e.pageX - this.store.startMouse[0], e.pageY - this.store.startMouse[1]];
        // store updated width, height, translate value
        let width = this.store.startSize[0],
            height = this.store.startSize[1],
            translate = [this.store.startTranslate[0], this.store.startTranslate[1]]; // deep copy

        /* calculate width, height, translate value according to different activated resizable div elements*/
        switch (this.store.target) {
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
        /**
         * compare the new size with
         * size limitation(given by users) to make sure it's within the size limitation.
         */
        if (width < this.sizeLimit.minWidth) {
            width = this.sizeLimit.minWidth;
            translate[0] = this.store.currentTranslate[0];
        } else if (width > this.sizeLimit.maxWidth) {
            width = this.sizeLimit.maxWidth;
            translate[0] = this.store.currentTranslate = [0];
        }
        if (height < this.sizeLimit.minHeight) {
            height = this.sizeLimit.minHeight;
            translate[1] = this.store.currentTranslate[1];
        } else if (height > this.sizeLimit.maxHeight) {
            height = this.sizeLimit.maxHeight;
            translate[1] = this.store.currentTranslate[1];
        }

        // store the current translate value. used in resize end handler
        this.store.currentTranslate = translate;
        // store the current width and height of the element
        this.store.currentSize = [width, height];
        /* call the resize event handler given by users */
        this.handlers.resize &&
            this.handlers.resize({
                inputEvent: e,
                target: this.targetElement,
                width,
                height,
                translate: [translate[0], translate[1]], // the target translate(deep copied) value the element should move
            });
    }

    /**
     * add mouse up event listener
     * remove the resizing event listener
     */
    resizeEnd() {
        this.options.container.addEventListener("mouseup", (e) => {
            if (this.resizing) {
                this.resizing = false;
                this.options.container.removeEventListener("mousemove", this.resizeHandler);
                if (this.handlers.resizeEnd)
                    this.handlers.resizeEnd({
                        target: this.targetElement,
                        inputEvent: e,
                        translate: [this.store.currentTranslate[0], this.store.currentTranslate[1]], // deep copy
                        width: this.store.currentSize[0],
                        height: this.store.currentSize[1],
                    });
            }
        });
    }

    /**
     * resize the target resizable element to the request size
     * @param {Object} resizeParameter {width: resize to the ${width} value, height: resize to the ${height} value}
     * @returns {boolean} if the resize request has been executed successfully
     */
    request(resizeParameter) {
        /* judge resizable condition */
        if (resizeParameter.width === undefined || resizeParameter.height === undefined)
            return false;
        /* start resize */
        // store the start css translate value. [x,y]
        this.store.startTranslate = [];
        this.handlers.resizeStart &&
            this.handlers.resizeStart({
                set: (position) => {
                    this.store.startTranslate = position;
                    this.targetElement.style.transform = `translate(${position[0]}px,${position[1]}px)`;
                },
            });

        /* resize the element */
        this.handlers.resize &&
            this.handlers.resize({
                target: this.targetElement,
                width: resizeParameter.width,
                height: resizeParameter.height,
                translate: this.store.startTranslate,
            });
        /* resize end */
        this.handlers.resizeEnd &&
            this.handlers.resizeEnd({
                translate: this.store.startTranslate,
                target: this.targetElement,
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
    result.stringifyItems = function (items) {
        let text = "";
        for (let key in items) {
            text += `${key}: ${items[key]};\n`;
        }
        return text;
    };
    result.toString = function () {
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

/**
 * module: content
 * part: display.moveable
 * function: add draggable function to a specific element
 */

export default class draggable {
    constructor(targetElement, options, handlers) {
        this.targetElement = targetElement;
        this.options = options;
        this.handlers = handlers;

        /* draggable part */
        // flag if the element is dragging
        this.dragging = false;
        // store some drag status value
        this.store = {};
        // store the drag bounds setting
        this.bounds = {};
        // flag if the bound event activated
        this.bounding = false;
        this.dragInitiate();
    }

    /**
     * do some initial thing for draggable function
     * 1. generate drag start and drag event handlers by wrapping this.dragStart and this.drag
     * 2. add mouse down event listener to the target draggable element
     */
    dragInitiate() {
        this.dragEnd();
        this.setBounds(this.options.bounds);
        // wrap a drag start event handler
        this.dragStartHandler = (e) => {
            this.dragStart(e);
        };
        // wrap a drag(dragging) event handler
        this.dragHandler = (e) => {
            this.drag(e);
        };
        this.targetElement.addEventListener("mousedown", this.dragStartHandler);
    }

    /**
     * parse the bounds option(e.g.: {left:0, right:100,top:0,bottom:100}) given by users. If one direction is not defined, set an infinity value.
     * @param {Object} boundsOption the given bounds option
     */
    static parseBounds(boundsOption) {
        let bounds = {};
        boundsOption = boundsOption || {};
        bounds.left =
            boundsOption.left !== undefined ? boundsOption.left : Number.NEGATIVE_INFINITY;
        bounds.top = boundsOption.top !== undefined ? boundsOption.top : Number.NEGATIVE_INFINITY;
        bounds.right =
            boundsOption.right !== undefined ? boundsOption.right : Number.POSITIVE_INFINITY;
        bounds.bottom =
            boundsOption.bottom !== undefined ? boundsOption.bottom : Number.POSITIVE_INFINITY;
        return bounds;
    }

    /**
     * set a new bounds option
     * @param {Object} boundsOption the given bounds option
     */
    setBounds(boundsOption) {
        this.bounds = draggable.parseBounds(boundsOption);
    }

    /**
     * the drag start event handler(mouse down event handler)
     * store some status value of drag start event
     * @param {event} e the mouse down event
     */
    dragStart(e) {
        if (e.target.getAttribute("class") === "resizable-div") return;
        this.dragging = true;
        // store the start css translate value. [x,y]
        this.store.startTranslate = [];
        // store the start mouse absolute position. [x,y]
        this.store.startMouse = [e.pageX, e.pageY];
        let offset = [
            this.targetElement.getBoundingClientRect().left + this.options.container.scrollLeft,
            this.targetElement.getBoundingClientRect().top + this.options.container.scrollTop,
        ];
        // store the start element absolute position. {left:leftOffset,top: topOffset,right:rightOffset,bottom:bottomOffset}
        this.store.startElement = {
            left: offset[0],
            top: offset[1],
            right: offset[0] + this.targetElement.offsetWidth,
            bottom: offset[1] + this.targetElement.offsetHeight,
        };

        this.handlers.dragStart &&
            this.handlers.dragStart({
                inputEvent: e,
                set: (position) => {
                    this.store.startTranslate = [position[0], position[1]]; // deep copy
                    this.targetElement.style.transform = `translate(${position[0]}px,${position[1]}px)`;
                },
                stop: () => {
                    this.dragging = false;
                },
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            });

        // store the current translate value
        this.store.currentTranslate = this.store.startTranslate;

        if (this.dragging) {
            e.preventDefault();
            this.options.container.addEventListener("mousemove", this.dragHandler);
        }
    }

    /**
     * the drag(dragging) event handler(mouse move event handler)
     * calculate the current translate value
     * call the drag event handler given by users
     * @param {event} e the mouse move event
     */
    drag(e) {
        e.preventDefault();
        let delta = [e.pageX - this.store.startMouse[0], e.pageY - this.store.startMouse[1]];
        // calculate the current translate value
        let currentTranslate = [
            delta[0] + this.store.startTranslate[0],
            delta[1] + this.store.startTranslate[1],
        ];
        // update right and bottom value. cause the size of the target value might change
        this.store.startElement.right =
            this.store.startElement.left + this.targetElement.offsetWidth;
        this.store.startElement.bottom =
            this.store.startElement.top + this.targetElement.offsetHeight;
        // calculate the distance between the bounds and the current element position
        let boundsDistance = {
            left: this.bounds.left - (delta[0] + this.store.startElement.left),
            top: this.bounds.top - (delta[1] + this.store.startElement.top),
            right: delta[0] + this.store.startElement.right - this.bounds.right,
            bottom: delta[1] + this.store.startElement.bottom - this.bounds.bottom,
        };
        // flag whether the current position beyond the drag area
        let flag = false;
        // store the direction in which the element is out of the boundary
        let direction;
        // beyond the left boundary
        if (boundsDistance.left >= 0) {
            flag = true;
            direction = "left";
            currentTranslate[0] += boundsDistance[direction];
        }
        // beyond the top boundary
        if (boundsDistance.top >= 0) {
            flag = true;
            direction = "top";
            currentTranslate[1] += boundsDistance[direction];
        }
        // beyond the right boundary
        if (boundsDistance.right >= 0) {
            flag = true;
            direction = "right";
            currentTranslate[0] -= boundsDistance[direction];
        }
        // beyond the bottom boundary
        if (boundsDistance.bottom >= 0) {
            flag = true;
            direction = "bottom";
            currentTranslate[1] -= boundsDistance[direction];
        }

        if (flag) {
            // drag out of the area first time
            if (!this.bounding) {
                this.bounding = true;
                this.boundStart(direction);
            }
            this.bound(direction, boundsDistance[direction]);
        }

        // the target element is in the drag area
        if (this.bounding && !flag) {
            this.bounding = false;
            this.boundEnd();
        }
        this.store.currentTranslate = [currentTranslate[0], currentTranslate[1]];

        this.handlers.drag &&
            this.handlers.drag({
                inputEvent: e,
                target: this.targetElement,
                transform: `translate(${this.store.currentTranslate[0]}px,${this.store.currentTranslate[1]}px)`,
                translate: this.store.currentTranslate,
                delta, // delta position
            });
    }

    /**
     * add mouse up event listener
     * remove the dragging event listener
     */
    dragEnd() {
        this.options.container.addEventListener("mouseup", (e) => {
            if (this.dragging) {
                this.dragging = false;
                this.options.container.removeEventListener("mousemove", this.dragHandler);
                if (this.handlers.dragEnd)
                    this.handlers.dragEnd({
                        inputEvent: e,
                        translate: [this.store.currentTranslate[0], this.store.currentTranslate[1]],
                    }); // deep copy
            }
        });
    }

    /**
     * the event handler when target element start to exceed the boundary
     * @param {string} direction in which direction the element exceeds the boundary
     */
    boundStart(direction) {
        this.handlers.boundStart &&
            this.handlers.boundStart({
                direction,
            });
    }

    /**
     * the event handler when the target element exceeds the boundary
     * @param {string} direction in which direction the element exceeds the boundary
     * @param {number} distance how far the element exceeds the boundary. distance>=0
     */
    bound(direction, distance) {
        // if the user set the bound event handler, call it
        this.handlers.bound &&
            this.handlers.bound({
                direction,
                distance,
            });
    }

    /**
     * call boundEnd function when the target element is first within the drag area
     */
    boundEnd() {
        this.handlers.boundEnd && this.handlers.boundEnd();
    }

    /**
     *	drag the target draggable element to the request position
     * @param {Object} draggableParameter {x:absolute x value,y:absolute y value,deltaX: delta x value, deltaY: delta y value}
     * @returns {boolean} if the drag request has been executed successfully
     */
    request(draggableParameter) {
        /* calculate the translate value according to parameters */
        let translate;
        if (draggableParameter.x !== undefined && draggableParameter.y !== undefined)
            translate = [draggableParameter.x, draggableParameter.y];
        else if (
            draggableParameter.deltaX !== undefined &&
            draggableParameter.deltaY !== undefined
        ) {
            translate = [
                this.store.startTranslate[0] + draggableParameter.deltaX,
                this.store.startTranslate[1] + draggableParameter.deltaY,
            ];
        } else return false;

        /* drag start */
        this.dragging = true;
        // store the start css translate value. [x,y]
        this.store.startTranslate = [];

        this.handlers.dragStart &&
            this.handlers.dragStart({
                set: (position) => {
                    this.store.startTranslate = position;
                },
                stop: () => {
                    this.dragging = false;
                },
            });

        /* dragging event */
        this.handlers.drag &&
            this.handlers.drag({
                target: this.targetElement,
                transform: `translate(${translate[0]}px,${translate[1]}px)`,
                translate,
            });

        /* dragging end */
        this.dragging = false;
        this.handlers.dragEnd &&
            this.handlers.dragEnd({
                translate: [translate[0], translate[1]], // deep copy
            });
        return true;
    }
}

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
}

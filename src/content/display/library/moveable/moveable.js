/**
 * module: content
 * part: display.moveable
 * function: add moveable(draggable and resizable) function to a specific element
 */

import resizable from "./resizable";
import draggable from "./draggable";

export default class moveable {
    constructor(targetElement, options) {
        // store all event handlers the user set
        this.handlers = {};
        // store the target moveable element
        this.targetElement = targetElement;
        // store the options the user set
        this.options = options;
        this.options.container = options.container || document.documentElement;

        if (this.options.resizable)
            this.resizable = new resizable(this.targetElement, this.options, this.handlers);
        if (this.options.draggable)
            this.draggable = new draggable(this.targetElement, this.options, this.handlers);
    }

    /**
     * set new directions for the target resizable elements
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support array(e.g.: [s,se]), string(e.g.: "s,se") and object(e.g.: {s:null,se:null}) these types of parameter
     * @param {Array|string|Object|undefined} directionsOption new direction options
     * @returns {boolean} if you set value successfully
     */
    setDirections(directionsOption) {
        if (this.resizable) {
            this.resizable.setDirections(directionsOption);
            return true;
        }
        return false;
    }

    /**
     * set a new resize threshold value for the target resizable elements
     * all valid directions: [s, se, e, ne, n, nw, w, sw]
     * support number(e.g.: 10), object(e.g.: {s:5, se:3, edge: 5, corner: 2}) and undefined these types of parameter
     * Hint: "corner" in object means value of directions:[s,e,n,w]."edge" in object means value of directions:[se,ne,nw,sw]
     * @param {number|Object|undefined} thresholdOption new threshold options
     * @returns {boolean} if you set value successfully
     */
    setThreshold(thresholdOption) {
        if (this.resizable) {
            this.resizable.setThreshold(thresholdOption);
            return true;
        }
        return false;
    }

    /**
     * set a new bounds option(e.g.: {left:0, right:100,top:0,bottom:100}) given by users. If one direction is not defined, set an infinity value.
     * @param {Object} boundsOption the given bounds option
     * @returns {boolean} if you set value successfully
     */
    setBounds(boundsOption) {
        if (this.draggable) {
            this.draggable.setBounds(boundsOption);
            return true;
        }
        return false;
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
        if (!moveableParameter) return false;
        switch (moveableType) {
            case "draggable":
                if (this.draggable) return this.draggable.request(moveableParameter);
                return false;
            case "resizable":
                if (this.resizable) return this.resizable.request(moveableParameter);
                return false;
            default:
                return false;
        }
    }
}

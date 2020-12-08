/**
 * module: content
 * part: display.message
 * function: show users messages including(info, success, warning, error)
 */

import messageTemplate from "./message.xhtml";
import { delayPromise } from "common/scripts/promise.js";

// prefix for CSS selector name
const SELECTOR_PREFIX = "edge-translate-message-";
const STYLE_PATH = "content/display/library/message/message.css";
// the animation duration in CSS file
const ANIMATION_DURATION = 400;

export default class Message {
    /**
     * @param {string} position enum{"center", "left", "right"} locate the position on screen to display all messages
     */
    constructor(position = "center") {
        /* create a shadow dom container */
        this.messageContainer = document.createElement("div");
        this.messageContainer.id = `${SELECTOR_PREFIX}container`;
        this.messageContainer.classList.add(`${SELECTOR_PREFIX}${position}`);
        // store a shadow dom which is used to attach message container
        this.shadowDom = this.messageContainer.attachShadow({ mode: "open" });

        /* append style element */
        let styleElement = document.createElement("link");
        styleElement.rel = "stylesheet";
        styleElement.type = "text/css";
        styleElement.href = chrome.runtime.getURL(STYLE_PATH);
        this.shadowDom.appendChild(styleElement);

        document.documentElement.appendChild(this.messageContainer);

        // listen to click event for closeIcon
        this.shadowDom.addEventListener("click", event => {
            const path = event.path;
            let closeIconClicked = false;
            for (let i = 0; i < path.length; i++) {
                if (path[i] === this.shadowDom) {
                    if (closeIconClicked && i - 1 >= 0) this.disappearMessage(path[i - 1]);
                    return;
                }
                // the close icon is clicked
                else if (path[i].classList.contains(`${SELECTOR_PREFIX}close`))
                    closeIconClicked = true;
            }
        });
    }

    /**
     * show message on the screen
     * @param {object} messageOption definition is same as the default option below
     */
    showMessage(messageOption) {
        // definition of default option
        const option = {
            // type = enum{"info", "success", "warning", "error"}
            type: "info",
            element: null,
            // title of the message
            title: null,
            // detail of the message
            detail: null,
            // can't be smaller than ${ANIMATION_DURATION}
            duration: 3000,
            timeoutId: -1,
            /**
             * whether to show the close icon
             * if duration <= 0, we will ignore this option and show the close icon
             */
            closeIcon: false
        };
        Object.assign(option, messageOption);
        if (!option.title) return;
        if (option.duration < ANIMATION_DURATION) option.duration = 0;

        let messageElement = document.createElement("div");
        messageElement.innerHTML = messageTemplate.apply(option);
        messageElement = messageElement.firstChild;
        option.element = messageElement;
        this.shadowDom.insertBefore(messageElement, this.shadowDom.firstChild);

        const setDisappearTimeout = () => {
            if (option.duration)
                option.timeoutId = setTimeout(() => {
                    this.disappearMessage(option.element);
                }, option.duration);
        };
        setDisappearTimeout();

        // if the mouse move into the message element, the message won't disappear.
        // to make sure the user has enough time to read the message
        messageElement.addEventListener("mouseenter", () => {
            if (option.timeoutId !== -1) clearTimeout(option.timeoutId);
        });
        // resume timeout after user's mouse leave the message element
        messageElement.addEventListener("mouseleave", () => setDisappearTimeout());
    }

    /**
     * private function
     * disappear the message on screen
     * @param {Element} messageElement the message element to be removed
     */
    async disappearMessage(messageElement) {
        if (messageElement instanceof Element) {
            messageElement.classList.add(`${SELECTOR_PREFIX}disappear-animation`);
            await delayPromise(ANIMATION_DURATION);
            if (this.shadowDom.contains(messageElement)) this.shadowDom.removeChild(messageElement);
        }
    }
}

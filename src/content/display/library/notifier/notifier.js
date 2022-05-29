/**
 * module: content
 * part: display.notifier
 * function:  a notifier to notify users of messages including(info, success, warning, error)
 */
/** @jsx h */
import { h } from "preact";
import render from "preact-render-to-string";
import NotifierTemplate from "./notifier.jsx";
import { delayPromise } from "common/scripts/promise.js";

// prefix for CSS selector name
const SELECTOR_PREFIX = "edge-translate-notifier-";
const STYLE_PATH = "content/display/library/notifier/notification.css";
// the animation duration in CSS file
const ANIMATION_DURATION = 400;

export default class Notifier {
    /**
     * @param {string} position enum{"center", "left", "right"} locate the position on screen to display all notification
     */
    constructor(position = "center") {
        this.position = position;
        this.notificationCount = 0;
    }

    createContainer() {
        /* create a shadow dom container */
        this.notifierContainer = document.createElement("div");
        this.notifierContainer.classList.add(
            `${SELECTOR_PREFIX}${this.position}`,
            `${SELECTOR_PREFIX}container`
        );
        // store a shadow dom which is used to attach notifier container
        this.shadowDom = this.notifierContainer.attachShadow({ mode: "open" });

        /* append style element */
        let styleElement = document.createElement("link");
        styleElement.rel = "stylesheet";
        styleElement.type = "text/css";
        styleElement.href = chrome.runtime.getURL(STYLE_PATH);
        this.shadowDom.appendChild(styleElement);

        document.documentElement.appendChild(this.notifierContainer);

        // listen to click event for closeIcon
        this.shadowDom.addEventListener("click", (event) => {
            const path = event.path;
            let closeIconClicked = false;
            for (let i = 0; i < path.length; i++) {
                if (path[i] === this.shadowDom) {
                    if (closeIconClicked && i - 1 >= 0) this.destroyNotification(path[i - 1]);
                    return;
                }
                // the close icon is clicked
                else if (path[i].classList.contains(`${SELECTOR_PREFIX}close`))
                    closeIconClicked = true;
            }
        });
    }

    destroyContainer() {
        if (document.documentElement.contains(this.notifierContainer)) {
            document.documentElement.removeChild(this.notifierContainer);
            this.notifierContainer = null;
            this.shadowDom = null;
        }
    }

    /**
     * notify users of messages on the screen
     * @param {object} notificationOption definition is same as the default option below
     */
    notify(notificationOption) {
        // definition of default option
        const option = {
            // type = enum{"info", "success", "warning", "error"}
            type: "info",
            element: null,
            // title of the notification
            title: null,
            // detail of the notification
            detail: null,
            // can't be smaller than ${ANIMATION_DURATION}
            duration: 3000,
            timeoutId: -1,
            /**
             * whether to show the close icon
             * if duration <= 0, we will ignore this option and show the close icon
             */
            closeIcon: false,
        };
        Object.assign(option, notificationOption);
        if (!option.title) return;
        if (option.duration < ANIMATION_DURATION) option.duration = 0;

        if (!this.notifierContainer) this.createContainer();

        let notificationElement = document.createElement("div");
        notificationElement.innerHTML = render(<NotifierTemplate {...option} />);
        notificationElement = notificationElement.firstChild;
        option.element = notificationElement;
        this.shadowDom.insertBefore(notificationElement, this.shadowDom.firstChild);

        const setDestroyTimeout = () => {
            if (option.duration)
                option.timeoutId = setTimeout(() => {
                    this.destroyNotification(option.element);
                }, option.duration);
        };
        setDestroyTimeout();

        // if the mouse move into the notification element, the notification won't disappear.
        // to make sure the user has enough time to read the notification
        notificationElement.addEventListener("mouseenter", () => {
            if (option.timeoutId !== -1) clearTimeout(option.timeoutId);
        });
        // resume timeout after user's mouse leave the notification element
        notificationElement.addEventListener("mouseleave", () => setDestroyTimeout());
        this.notificationCount++;
    }

    /**
     * private function
     * disappear the notification on screen
     * @param {Element} notificationElement the notification element to be removed
     */
    async destroyNotification(notificationElement) {
        if (notificationElement instanceof Element) {
            notificationElement.classList.add(`${SELECTOR_PREFIX}disappear-animation`);
            await delayPromise(ANIMATION_DURATION);
            if (this.shadowDom.contains(notificationElement))
                this.shadowDom.removeChild(notificationElement);
            this.notificationCount--;
            if (this.notificationCount === 0) this.destroyContainer();
        }
    }
}

/** @jsx h */
import { h, render } from "preact";
import Panel from "./Panel.jsx";

(async function initialize() {
    render(<Panel />, document.documentElement);
    // Prepare this polyfill for the useMeasure hook of "react-use".
    if (!window.ResizeObserver) {
        window.ResizeObserver = (await import("resize-observer-polyfill")).default;
    }
})();

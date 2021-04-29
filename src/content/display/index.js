/** @jsx h */
import { h, render } from "preact";
import Panel from "./Panel.jsx";

window.onload = () => {
    render(<Panel />, document.documentElement);
};

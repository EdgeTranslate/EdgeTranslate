import messageTemplate from "./message.html";
import render from "../render";

export default class Message {
    constructor() {
        this.messageFragment = document.createElement("div");
        this.messageFragment.style.zIndex = 100000000;
        // store a shadow dom which is used to attach message fragment
        this.shadowDom = this.messageFragment.attachShadow({ mode: "open" });
        this.shadowDom.innerHTML = render(messageTemplate);
        this.messages = [];
    }

    showMessage() {
        document.documentElement.appendChild(this.messageFragment);
    }

    displayMessage() {
        document.body.removeChild(this.messageFragment);
    }
}

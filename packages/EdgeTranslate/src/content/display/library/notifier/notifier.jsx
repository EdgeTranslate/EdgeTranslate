/** @jsx h */
import { h } from "preact";
import SuccessIcon from "./icons/success.svg";
import InfoIcon from "./icons/info.svg";
import WarningIcon from "./icons/warning.svg";
import ErrorIcon from "./icons/error.svg";
import CloseIcon from "./icons/close.svg";

/**
 * @param {{
 *   type: "success" | "info" | "warning" | "error",
 *   title: string,
 *   detail: string?,
 *   closeIcon: boolean,
 *   duration: number,
 * }} props notification content
 * @returns {h.JSX.Element} element
 */
export default function NotifierTemplate(props) {
    return (
        <div
            class={`edge-translate-notifier-item edge-translate-notifier-show-animation edge-translate-notifier-${props.type}`}
        >
            <div class="edge-translate-notifier-icon">
                {props.type === "success" && <SuccessIcon />}
                {props.type === "info" && <InfoIcon />}
                {props.type === "warning" && <WarningIcon />}
                {props.type === "error" && <ErrorIcon />}
            </div>
            <div class="edge-translate-notifier-content">
                <div class="edge-translate-notifier-title">{props.title}</div>
                <div class="edge-translate-notifier-detail">{props.detail}</div>
            </div>
            <div class="edge-translate-notifier-close">
                {(props.closeIcon || props.duration <= 0) && <CloseIcon />}
            </div>
        </div>
    );
}

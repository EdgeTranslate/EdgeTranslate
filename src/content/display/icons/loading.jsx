/**
 * This file is used as a svg element.
 * Because svg loader can't process "stroke-width" and "stroke-dasharray" of <circle /> properly, we wrap this svg as a preact component.
 */

/** @jsx h */
import { h } from "preact";

export default function Loading(props) {
    return (
        <svg
            class={props.className}
            id={props.id}
            xmlns="http://www.w3.org/2000/svg"
            style={props.style}
            width="32px"
            height="32px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                stroke-width="10"
                r="32"
                stroke-dasharray="113.09733552923255 39.69911184307752"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                />
            </circle>
        </svg>
    );
}

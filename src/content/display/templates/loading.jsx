/** @jsx h */
import { h } from "preact";
import { CommonPrefix } from "./Panel.jsx";

export default function Loading() {
    return (
        <div id={`${CommonPrefix}loading-effect`} class={`${CommonPrefix}lds-cs`}>
            <div style="width:100%;height:100%;" class={`${CommonPrefix}lds-ellipsis`}>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
                <div>
                    <div />
                </div>
            </div>
        </div>
    );
}

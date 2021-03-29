/** @jsx h */
import { h } from "preact";
import SettingIcon from "../icons/setting.svg";
import PinIcon from "../icons/pin.svg";
import UnpinIcon from "../icons/unpin.svg";
import CloseIcon from "../icons/close.svg";

export const CommonPrefix = "edge-translate-";

export default function Panel() {
    return (
        <div id={`${CommonPrefix}panel`} style="position: fixed;">
            <link
                type="text/css"
                rel="stylesheet"
                href={chrome.runtime.getURL("content/display/style/display.css")}
            />
            <div id={`${CommonPrefix}head`}>
                <div id={`${CommonPrefix}head-icons`}>
                    <div class={`${CommonPrefix}head-icon`} id={`${CommonPrefix}icon-options`}>
                        <SettingIcon />
                    </div>
                    <div class={`${CommonPrefix}head-icon`} id={`${CommonPrefix}icon-pin`}>
                        <PinIcon />
                    </div>
                    <div class={`${CommonPrefix}head-icon`} id={`${CommonPrefix}icon-unpin`}>
                        <UnpinIcon />
                    </div>
                    <div class={`${CommonPrefix}head-icon`} id={`${CommonPrefix}icon-close`}>
                        <CloseIcon />
                    </div>
                </div>
            </div>
            <div id={`${CommonPrefix}source-option`}>
                <span>正在使用</span>
                <span>谷歌翻译</span>
            </div>
            <div id={`${CommonPrefix}body`} />
        </div>
    );
}

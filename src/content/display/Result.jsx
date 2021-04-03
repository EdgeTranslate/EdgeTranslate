/** @jsx h */
import { h } from "preact";
import { CommonPrefix } from "./Panel.jsx";
import EditIcon from "./icons/edit.svg";
import EditDoneIcon from "./icons/edit-done.svg";
import PronounceIcon from "./icons/pronounce.svg";
import PronounceLoadingIcon from "./icons/loading.jsx";
import CopyIcon from "./icons/copy.svg";

/**
 * props:{
 *     content: object; // translation result
 *     sourcePronouncing: boolean;
 *     targetPronouncing: boolean;
 *     setSourcePronounce: (boolean)=>void;
 *     setTargetPronounce: (boolean)=>void;
 * }
 */
export default function Result(props) {
    return (
        <div id={`${CommonPrefix}result`}>
            <div class={`${CommonPrefix}block`} id={`${CommonPrefix}source`}>
                <div class={`${CommonPrefix}text-block`}>
                    <div id={`${CommonPrefix}source-text`} class={`${CommonPrefix}may-need-rtl`}>
                        {props.originalText}
                    </div>
                    <EditIcon id={`${CommonPrefix}icon-edit`} class={`${CommonPrefix}icon-edit`} />
                    <EditDoneIcon
                        id={`${CommonPrefix}icon-edit-done`}
                        class={`${CommonPrefix}icon-edit`}
                    />
                </div>
                <div class={`${CommonPrefix}pronounce-block`}>
                    {props.sourcePronouncing ? (
                        <PronounceLoadingIcon
                            id={`${CommonPrefix}icon-pronounce-source-loading`}
                            class={`${CommonPrefix}icon-pronounce-loading`}
                        />
                    ) : (
                        <PronounceIcon
                            id={`${CommonPrefix}icon-pronounce-source`}
                            class={`${CommonPrefix}icon-pronounce`}
                            onClick={() => props.setSourcePronounce(true)}
                        />
                    )}
                    <span class={`${CommonPrefix}pronounce-text ${CommonPrefix}may-need-rtl`}>
                        {props.sPronunciation}
                    </span>
                </div>
            </div>
            <div class={`${CommonPrefix}block`} id={`${CommonPrefix}target`}>
                <div class={`${CommonPrefix}text-block`}>
                    <div id={`${CommonPrefix}target-text`} class={`${CommonPrefix}may-need-rtl`}>
                        {props.mainMeaning}
                    </div>
                    <CopyIcon id={`${CommonPrefix}icon-copy`} />
                </div>
                <div class={`${CommonPrefix}pronounce-block`}>
                    {props.targetPronouncing ? (
                        <PronounceLoadingIcon
                            id={`${CommonPrefix}icon-pronounce-target-loading`}
                            class={`${CommonPrefix}icon-pronounce-loading`}
                        />
                    ) : (
                        <PronounceIcon
                            id={`${CommonPrefix}icon-pronounce-target`}
                            class={`${CommonPrefix}icon-pronounce`}
                            onClick={() => props.setTargetPronounce(true)}
                        />
                    )}
                    <span class={`${CommonPrefix}pronounce-text ${CommonPrefix}may-need-rtl`}>
                        {props.tPronunciation}
                    </span>
                </div>
            </div>
            <div class={`${CommonPrefix}block`} id={`${CommonPrefix}detail`}>
                <div class={`${CommonPrefix}block-head`}>
                    <span
                        class={`${CommonPrefix}block-head-spot`}
                        style="background-color: #00BFA5;"
                    />
                    <span class={`${CommonPrefix}block-head-title`}>具体含义</span>
                    <div class={`${CommonPrefix}block-head-dividing-line`} />
                </div>
                <div class={`${CommonPrefix}block-content`} />
            </div>
        </div>
    );
}

/** @jsx h */
import { h, Fragment } from "preact";
import { useEffect, useRef, useReducer } from "preact/hooks";
import styled from "styled-components";
import Channel from "common/scripts/channel.js";
import Notifier from "./library/notifier/notifier.js";
import { CommonPrefix, checkTimestamp } from "./Panel.jsx";
import EditIcon from "./icons/edit.svg";
import EditDoneIcon from "./icons/edit-done.svg";
import PronounceIcon from "./icons/pronounce.svg";
import PronounceLoadingIcon from "./icons/loading.jsx";
import CopyIcon from "./icons/copy.svg";

// TTS speeds
let sourceTTSSpeed = "fast",
    targetTTSSpeed = "fast";
// Communication channel.
const channel = new Channel();
const notifier = new Notifier("center");

/**
 * props:{
 *     content: object; // translation result
 * }
 */
export default function Result(props) {
    /**
     * the pronounce status
     */
    const [sourcePronouncing, setSourcePronounce] = useReducer(sourcePronounce, false),
        [targetPronouncing, setTargetPronounce] = useReducer(targetPronounce, false);
    // indicate whether user can edit and copy the translation result
    const [copyResult, setCopyResult] = useReducer(copyContent, false);
    const translateResultElRef = useRef();

    useEffect(() => {
        sourceTTSSpeed = "fast";
        targetTTSSpeed = "fast";

        /*
         * COMMUNICATE WITH BACKGROUND MODULE
         */
        const cancelers = [];
        cancelers.push(
            channel.on("pronouncing_finished", (detail) => {
                if (checkTimestamp(detail.timestamp)) {
                    if (detail.pronouncing === "source") setSourcePronounce(false);
                    else if (detail.pronouncing === "target") setTargetPronounce(false);
                }
            })
        );

        cancelers.push(
            channel.on("pronouncing_error", (detail) => {
                if (checkTimestamp(detail.timestamp)) {
                    if (detail.pronouncing === "source") setSourcePronounce(false);
                    else if (detail.pronouncing === "target") setTargetPronounce(false);
                    notifier.notify({
                        type: "error",
                        title: chrome.i18n.getMessage("AppName"),
                        detail: chrome.i18n.getMessage("PRONOUN_ERR"),
                    });
                }
            })
        );

        cancelers.push(
            channel.on("command", (detail) => {
                switch (detail.command) {
                    case "pronounce_original":
                        setSourcePronounce(true);
                        break;
                    case "pronounce_translated":
                        setTargetPronounce(true);
                        break;
                    case "copy_result":
                        if (window.translateResult.mainMeaning && translateResultElRef.current) {
                            setCopyResult({ copy: true, element: translateResultElRef.current });
                        }
                        break;
                    default:
                        break;
                }
            })
        );

        return () => {
            // remove all of event listeners before destroying the component
            cancelers.forEach((canceler) => canceler());
        };
    }, []);

    return (
        <Fragment>
            <Source>
                <TextLine>
                    <div class={`${CommonPrefix}may-need-rtl`}>{props.originalText}</div>
                    <StyledEditIcon />
                    <StyledEditDoneIcon />
                </TextLine>
                <PronounceLine>
                    {sourcePronouncing ? (
                        <StyledPronounceLoadingIcon />
                    ) : (
                        <StyledPronounceIcon onClick={() => setSourcePronounce(true)} />
                    )}
                    <PronounceText class={`${CommonPrefix}may-need-rtl`}>
                        {props.sPronunciation}
                    </PronounceText>
                </PronounceLine>
            </Source>
            <Target>
                <TextLine>
                    <div
                        class={`${CommonPrefix}may-need-rtl`}
                        contenteditable={copyResult}
                        onBlur={() => setCopyResult({ copy: false })}
                        ref={translateResultElRef}
                    >
                        {props.mainMeaning}
                    </div>
                    <StyledCopyIcon
                        onClick={() =>
                            setCopyResult({
                                copy: true,
                                element: translateResultElRef.current,
                            })
                        }
                    />
                </TextLine>
                <PronounceLine>
                    {targetPronouncing ? (
                        <StyledPronounceLoadingIcon />
                    ) : (
                        <StyledPronounceIcon onClick={() => setTargetPronounce(true)} />
                    )}
                    <PronounceText class={`${CommonPrefix}may-need-rtl`}>
                        {props.tPronunciation}
                    </PronounceText>
                </PronounceLine>
            </Target>
            <Detail>
                <BlockHead>
                    <DetailHeadSpot />
                    <BlockHeadTitle>具体含义</BlockHeadTitle>
                    <BlockSplitLine />
                </BlockHead>
                <BlockContent />
            </Detail>
        </Fragment>
    );
}

/**
 * STYLE FOR THE COMPONENT START
 */

const BlockPadding = "10px";
const BlockMarginVertical = "4px";
const BlockMarginHorizon = "8px";
const LightPrimary = "rgba(74, 140, 247, 0.7)";

/**
 * basic style for a block used to display content
 */
export const Block = styled.div`
    width: calc(100% - 2 * ${BlockMarginHorizon});
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${BlockPadding};
    margin: ${BlockMarginVertical} ${BlockMarginHorizon};
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
`;

const Source = styled(Block)`
    font-weight: normal;
`;
const Target = styled(Block)`
    font-weight: normal;
`;
const Detail = styled(Block)`
    font-weight: normal;
`;

const TextLine = styled.div`
    width: 100%;
    display: flex;
    margin: 5px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledEditIcon = styled(EditIcon)`
    width: 16px;
    height: 16px;
    fill: Gray;
    flex-shrink: 0;
`;

const StyledEditDoneIcon = styled(EditDoneIcon)`
    width: 16px;
    height: 16px;
    fill: Gray;
    flex-shrink: 0;
`;

const PronounceLine = styled.div`
    width: 100%;
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const PronounceText = styled.span`
    margin-left: 10px;
`;

const StyledCopyIcon = styled(CopyIcon)`
    width: 20px;
    height: 20px;
    fill: Gray;
    flex-shrink: 0;
`;

const StyledPronounceIcon = styled(PronounceIcon)`
    width: 20px;
    height: 20px;
    fill: ${LightPrimary};
    flex-shrink: 0;

    &:hover {
        fill: orange !important;
    }
`;

const StyledPronounceLoadingIcon = styled(PronounceLoadingIcon)`
    width: 24px;
    height: 24px;
    fill: ${LightPrimary};
    padding: 0;
    flex-shrink: 0;

    circle {
        fill: none;
        stroke: ${LightPrimary} !important;
    }import { useState } from 'preact/hooks';

`;

const BlockHead = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`;

const BlockHeadTitle = styled.span`
    margin-left: 5px;
`;

/**
 * common style for the spot of block head
 */
const BlockHeadSpot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
`;

const BlockSplitLine = styled.div`
    width: 98%;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.25);
    margin: 5px 0;
`;

const BlockContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const DetailHeadSpot = styled(BlockHeadSpot)`
    background-color: #00bfa5;
`;

/**
 * STYLE FOR THE COMPONENT END
 */

/**
 * A reducer for source pronouncing state
 * Send message to background to pronounce the translating text.
 */
function sourcePronounce(_, startPronounce) {
    if (startPronounce)
        channel
            .request("pronounce", {
                pronouncing: "source",
                text: window.translateResult.originalText,
                language: window.translateResult.sourceLanguage,
                speed: sourceTTSSpeed,
            })
            .then(() => {
                if (sourceTTSSpeed === "fast") {
                    sourceTTSSpeed = "slow";
                } else {
                    sourceTTSSpeed = "fast";
                }
            });
    return startPronounce;
}

/**
 * A reducer for target pronouncing state
 */
function targetPronounce(_, startPronounce) {
    if (startPronounce)
        channel
            .request("pronounce", {
                pronouncing: "target",
                text: window.translateResult.mainMeaning,
                language: window.translateResult.targetLanguage,
                speed: targetTTSSpeed,
            })
            .then(() => {
                if (targetTTSSpeed === "fast") {
                    targetTTSSpeed = "slow";
                } else {
                    targetTTSSpeed = "fast";
                }
            });
    return startPronounce;
}

/**
 * A reducer for copying state of translation result
 * @param {*} _
 * @param {
 *     copy: boolean;  // new state
 *     element: HTMLElement; // the element for displaying translation results
 * } action
 */
function copyContent(_, action) {
    if (action.copy && action.element) {
        /**
         * This line is to make sure the div element is editable before the focus action.
         * Because of the react mechanism, contenteditable={copyResult} will work after this function is executed.
         */
        action.element.setAttribute("contenteditable", "true");

        action.element.focus();

        // select all content automatically
        let range = document.createRange();
        range.selectNodeContents(action.element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand("copy");
    } else if (!action.copy) window.getSelection().removeAllRanges();
    return action.copy;
}

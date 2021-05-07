/** @jsx h */
import { h, Fragment } from "preact";
import { useEffect, useRef, useReducer, useState } from "preact/hooks";
import styled from "styled-components";
import Channel from "common/scripts/channel.js";
import Notifier from "./library/notifier/notifier.js";
import DOMPurify from "dompurify";
import { checkTimestamp } from "./Panel.jsx";
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
 * @param {{
 *   mainMeaning: string,
 *   originalText: string,
 *   tPronunciation: string?,
 *   sPronunciation: string?,
 *   detailedMeanings: Array<{
 *     pos: string,
 *     meaning: string,
 *     synonyms: Array<string>?,
 *   }>?,
 *   definitions: Array<{
 *     pos: string,
 *     meaning: string,
 *     synonyms: Array<string>?,
 *     example: string?,
 *   }>?,
 *   examples: Array<{
 *     source: string?,
 *     target: string?,
 *   }>?,
 * }} props translate result
 *
 * @returns {h.JSX.Element} element
 */
export default function Result(props) {
    /**
     * The order state of displaying contents.
     */
    const [contentDisplayOrder, setContentDisplayOrder] = useState([]);

    /**
     * The visible state of contents.
     */
    const [displayTPronunciation, setDisplayTPronunciation] = useState(false);
    const [displaySPronunciation, setDisplaySPronunciation] = useState(false);
    const [contentFilter, setContentFilter] = useState({});

    /**
     * Text direction state.
     */
    const [textDirection, setTextDirection] = useState("ltr");

    /**
     * the pronounce status
     */
    const [sourcePronouncing, setSourcePronounce] = useReducer(sourcePronounce, false),
        [targetPronouncing, setTargetPronounce] = useReducer(targetPronounce, false);

    // indicate whether user can edit and copy the translation result
    const [copyResult, setCopyResult] = useReducer(copyContent, false);
    const translateResultElRef = useRef();

    // indicate whether user is editing the original text
    const [editing, setEditing] = useReducer(_setEditing, false);
    const originalTextElRef = useRef();

    const TargetContent = (
        <Fragment key={"mainMeaning"}>
            {props.mainMeaning?.length > 0 && (
                <Target>
                    <TextLine>
                        <div
                            dir={textDirection}
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
                        {displayTPronunciation && (
                            <PronounceText dir={textDirection}>
                                {props.tPronunciation}
                            </PronounceText>
                        )}
                    </PronounceLine>
                </Target>
            )}
        </Fragment>
    );

    const SourceContent = (
        <Fragment key={"originalText"}>
            {props.originalText?.length > 0 && (
                <Source>
                    <TextLine>
                        <div dir={textDirection} contenteditable={editing} ref={originalTextElRef}>
                            {props.originalText}
                        </div>
                        {editing ? (
                            <StyledEditDoneIcon
                                onClick={() =>
                                    setEditing({
                                        edit: false,
                                        element: originalTextElRef.current,
                                    })
                                }
                            />
                        ) : (
                            <StyledEditIcon
                                onClick={() =>
                                    setEditing({
                                        edit: true,
                                        element: originalTextElRef.current,
                                    })
                                }
                            />
                        )}
                    </TextLine>
                    <PronounceLine>
                        {sourcePronouncing ? (
                            <StyledPronounceLoadingIcon />
                        ) : (
                            <StyledPronounceIcon onClick={() => setSourcePronounce(true)} />
                        )}
                        {displaySPronunciation && (
                            <PronounceText dir={textDirection}>
                                {props.sPronunciation}
                            </PronounceText>
                        )}
                    </PronounceLine>
                </Source>
            )}
        </Fragment>
    );

    const DetailContent = (
        <Fragment key={"detailedMeanings"}>
            {props.detailedMeanings?.length > 0 && (
                <Detail>
                    <BlockHead>
                        <DetailHeadSpot />
                        <BlockHeadTitle>
                            {chrome.i18n.getMessage("DetailedMeanings")}
                        </BlockHeadTitle>
                        <BlockSplitLine />
                    </BlockHead>
                    <BlockContent>
                        {props.detailedMeanings.map((detail, detailIndex) => (
                            <Fragment key={`detail-${detailIndex}`}>
                                <Position>{detail.pos}</Position>
                                <DetailMeaning>{detail.meaning}</DetailMeaning>
                                {detail.synonyms?.length > 0 && (
                                    <Fragment>
                                        <SynonymTitle>
                                            {chrome.i18n.getMessage("Synonyms")}
                                        </SynonymTitle>
                                        <SynonymLine>
                                            {detail.synonyms.map((word, synonymIndex) => (
                                                <SynonymWord key={`detail-synonym-${synonymIndex}`}>
                                                    {word}
                                                </SynonymWord>
                                            ))}
                                        </SynonymLine>
                                    </Fragment>
                                )}
                            </Fragment>
                        ))}
                    </BlockContent>
                </Detail>
            )}
        </Fragment>
    );

    const DefinitionContent = (
        <Fragment key={"definitions"}>
            {props.definitions?.length > 0 && (
                <Definition>
                    <BlockHead>
                        <DefinitionHeadSpot />
                        <BlockHeadTitle>{chrome.i18n.getMessage("Definitions")}</BlockHeadTitle>
                        <BlockSplitLine />
                    </BlockHead>
                    <BlockContent>
                        {props.definitions.map((definition, definitionIndex) => (
                            <Fragment key={`definition-${definitionIndex}`}>
                                <Position>{definition.pos}</Position>
                                <DetailMeaning>{definition.meaning}</DetailMeaning>
                                {definition.example && (
                                    <DefinitionExample>{`"${definition.example}"`}</DefinitionExample>
                                )}
                                {definition.synonyms?.length > 0 && (
                                    <Fragment>
                                        <SynonymTitle>
                                            {chrome.i18n.getMessage("Synonyms")}
                                        </SynonymTitle>
                                        <SynonymLine>
                                            {definition.synonyms.map((word, synonymIndex) => (
                                                <SynonymWord
                                                    key={`definition-synonym-${synonymIndex}`}
                                                >
                                                    {word}
                                                </SynonymWord>
                                            ))}
                                        </SynonymLine>
                                    </Fragment>
                                )}
                            </Fragment>
                        ))}
                    </BlockContent>
                </Definition>
            )}
        </Fragment>
    );

    const ExampleContent = (
        <Fragment key={"examples"}>
            {props.examples?.length > 0 && (
                <Example>
                    <BlockHead>
                        <ExampleHeadSpot />
                        <BlockHeadTitle>{chrome.i18n.getMessage("Examples")}</BlockHeadTitle>
                        <BlockSplitLine />
                    </BlockHead>
                    <BlockContent>
                        <ExampleList>
                            {props.examples.map((example, index) => (
                                <ExampleItem key={`example-${index}`}>
                                    {example.source && (
                                        <ExampleSource
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(example.source, {
                                                    ALLOWED_TAGS: ["b"],
                                                }),
                                            }}
                                        />
                                    )}
                                    {example.target && (
                                        <div
                                            // eslint-disable-next-line react/no-danger
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(example.target, {
                                                    ALLOWED_TAGS: ["b"],
                                                }),
                                            }}
                                        />
                                    )}
                                </ExampleItem>
                            ))}
                        </ExampleList>
                    </BlockContent>
                </Example>
            )}
        </Fragment>
    );

    /**
     * Content maps.
     */
    const CONTENTS = {
        mainMeaning: TargetContent,
        originalText: SourceContent,
        detailedMeanings: DetailContent,
        definitions: DefinitionContent,
        examples: ExampleContent,
    };

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

        /**
         * Update displaying contents based on user's setting.
         */
        chrome.storage.sync.get(
            ["LayoutSettings", "TranslateResultFilter", "ContentDisplayOrder"],
            (result) => {
                setContentDisplayOrder(result.ContentDisplayOrder);
                setDisplaySPronunciation(result.TranslateResultFilter["sPronunciation"]);
                setDisplayTPronunciation(result.TranslateResultFilter["tPronunciation"]);
                setContentFilter(result.TranslateResultFilter);
                setTextDirection(result.LayoutSettings.RTL ? "rtl" : "ltr");
            }
        );
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== "sync") return;

            if (changes.ContentDisplayOrder) {
                setContentDisplayOrder(changes.ContentDisplayOrder.newValue);
            }

            if (changes.TranslateResultFilter) {
                setDisplaySPronunciation(changes.TranslateResultFilter.newValue["sPronunciation"]);
                setDisplayTPronunciation(changes.TranslateResultFilter.newValue["tPronunciation"]);
                setContentFilter(changes.TranslateResultFilter.newValue);
            }

            if (changes.LayoutSettings) {
                setTextDirection(changes.LayoutSettings.newValue.RTL ? "rtl" : "ltr");
            }
        });

        return () => {
            // remove all of event listeners before destroying the component
            cancelers.forEach((canceler) => canceler());
        };
    }, []);

    return (
        <Fragment>
            {contentDisplayOrder
                .filter((content) => contentFilter[content])
                .map((content) => CONTENTS[content])}
        </Fragment>
    );
}

/**
 * STYLE FOR THE COMPONENT START
 */

const BlockPadding = "10px";
const BlockMarginVertical = "4px";
export const BlockMarginHorizon = "8px";
const LightPrimary = "rgba(74, 140, 247, 0.7)";
const Gray = "#919191";

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
    background-color: rgba(250, 250, 250, 1);
    border-radius: 10px;
    box-shadow: 0px 3px 6px rgba(127, 127, 127, 0.25);
    line-height: 120%;
    letter-spacing: 0.02em;
`;

const Source = styled(Block)`
    font-weight: normal;
    white-space: pre-wrap;
`;

const Target = styled(Block)`
    font-weight: normal;
    white-space: pre-wrap;
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
    width: 18px;
    height: 18px;
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
`;

const StyledEditDoneIcon = styled(EditDoneIcon)`
    width: 18px;
    height: 18px;
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
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
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
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
    }
`;

const BlockHead = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
`;

const BlockHeadTitle = styled.span`
    font-size: small;
    margin-left: ${BlockPadding};
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
    width: 100%;
    height: 1px;
    margin: 5px 0;
    flex-shrink: 0;
    border: none;
    background: rgba(0, 0, 0, 0.25);
`;

const BlockContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const DetailHeadSpot = styled(BlockHeadSpot)`
    background-color: #00bfa5;
`;

const Position = styled.div`
    color: ${Gray};
`;

const DetailMeaning = styled.div`
    padding: 5px 0;
    margin-left: 10px;
`;

const SynonymTitle = styled.div`
    color: ${Gray};
    font-size: small;
    margin-left: 10px;
`;

const SynonymLine = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    margin-left: 10px;
`;

const SynonymWord = styled.span`
    padding: 2px 10px;
    margin: 0 2px 3px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 32px;
    cursor: pointer;
    font-size: small;
`;

const Definition = styled(Block)``;

const DefinitionHeadSpot = styled(BlockHeadSpot)`
    background-color: #ff4081;
`;

const DefinitionExample = styled(DetailMeaning)`
    color: #5f6368;
`;

const Example = styled(Block)``;

const ExampleHeadSpot = styled(BlockHeadSpot)`
    background-color: #3d5afe;
`;

const ExampleList = styled.ol`
    list-style-type: decimal;
    padding-left: 1rem;
    margin: 0;
`;

const ExampleItem = styled.li`
    padding: 5px 0;
`;

const ExampleSource = styled.div`
    padding-bottom: 5px;
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

/**
 * The following 4 functions are intended to prevent input events from being caught by other elements.
 */

/**
 * Prevent keydown event from propagation.
 *
 * @param {Event} event keydown event.
 */
function onKeyDownInTextEditor(event) {
    event.stopPropagation();
}

/**
 * Prevent keyup event from propagation.
 *
 * @param {Event} event keyup event.
 */
function onKeyUpInTextEditor(event) {
    event.stopPropagation();
}

/**
 * When the input box gets focused, prevent input events from propagation.
 *
 * @param {Event} event focus event.
 */
function onTextEditorFocused(event) {
    event.target.addEventListener("keydown", onKeyDownInTextEditor);
    event.target.addEventListener("keyup", onKeyUpInTextEditor);
}

/**
 * When the input box gets blurred, allow input events propagation.
 *
 * @param {Event} event blur event.
 */
function onTextEditorBlurred(event) {
    event.target.removeEventListener("keydown", onKeyDownInTextEditor);
    event.target.removeEventListener("keyup", onKeyUpInTextEditor);
}

/**
 * Edit original text.
 *
 * @param {HTMLElement} originalTextEle original text element
 */
function editOriginalText(originalTextEle) {
    // Prevent input events from propagation.
    originalTextEle.addEventListener("focus", onTextEditorFocused);
    originalTextEle.addEventListener("blur", onTextEditorBlurred);

    // Expand original text for reading and editing.
    originalTextEle.style.overflow = "inherit";
    originalTextEle.style["white-space"] = "inherit";
    originalTextEle.title = "";

    // Auto focus.
    originalTextEle.focus();
}

/**
 * Submit and translate edited text.
 *
 * @param {HTMLElement} originalTextEle original text element
 */
function submitEditedText(originalTextEle) {
    // Allow input events propagation.
    originalTextEle.removeEventListener("focus", onTextEditorFocused);
    originalTextEle.removeEventListener("blur", onTextEditorBlurred);

    let text = originalTextEle.textContent.trim();
    if (text.length > 0) {
        // to make sure the new text is different from the original text
        if (text.valueOf() !== window.translateResult.originalText.valueOf()) {
            // Do translating.
            channel.request("translate", { text });
        }
    } else {
        // Restore original text.
        originalTextEle.textContent = window.translateResult.originalText;
    }
}

/**
 * A reducer for updating editing state of original text.
 *
 * @param {any} _ nothing
 * @param {{edit: boolean, element: HTMLElement}} state new state information
 * @returns new state
 */
function _setEditing(_, state) {
    if (state.element) {
        if (state.edit) {
            editOriginalText(state.element);
        } else {
            submitEditedText(state.element);
        }
    }
    return state.edit;
}

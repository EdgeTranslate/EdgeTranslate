/** @jsx h */
import { h, Fragment } from "preact";
import { useEffect, useRef, useReducer, useState } from "preact/hooks";
import styled, { ThemeProvider } from "styled-components";
import Channel from "common/scripts/channel.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";
import Notifier from "./library/notifier/notifier.js";
import DOMPurify from "dompurify";
import { checkTimestamp } from "./Panel.jsx";
import DrawerBlock from "./DrawerBlock.jsx";
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
 *   mainMeaning: string;
 *   originalText: string;
 *   tPronunciation?: string;
 *   sPronunciation?: string;
 *   detailedMeanings?: Array<{
 *     pos: string;
 *     meaning: string;
 *     synonyms?: Array<string>;
 *   }>;
 *   definitions?: Array<{
 *     pos: string;
 *     meaning: string;
 *     synonyms?: Array<string>;
 *     example?: string;
 *   }>;
 *   examples?: Array<{
 *     source?: string;
 *     target?: string;
 *   }>;
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
    const [displayTPronunciationIcon, setDisplayTPronunciationIcon] = useState(false);
    const [displaySPronunciationIcon, setDisplaySPronunciationIcon] = useState(false);
    const [contentFilter, setContentFilter] = useState({});

    /**
     * Text direction state.
     */
    const [textDirection, setTextDirection] = useState("ltr");

    /**
     * Whether to fold too long translation content.
     */
    const [foldLongContent, setFoldLongContent] = useState(true);

    /**
     * The pronounce status
     */
    const [sourcePronouncing, setSourcePronounce] = useReducer(sourcePronounce, false),
        [targetPronouncing, setTargetPronounce] = useReducer(targetPronounce, false);

    // Indicate whether user can edit and copy the translation result
    const [copyResult, setCopyResult] = useReducer(copyContent, false);
    const translateResultElRef = useRef();

    // Indicate whether user is editing the original text
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
                            style={{ paddingLeft: 3 }}
                        >
                            {props.mainMeaning}
                        </div>
                        <StyledCopyIcon
                            role="button"
                            onClick={() =>
                                setCopyResult({
                                    copy: true,
                                    element: translateResultElRef.current,
                                })
                            }
                            title={chrome.i18n.getMessage("CopyResult")}
                        />
                    </TextLine>
                    {(displayTPronunciationIcon || displayTPronunciation) && (
                        <PronounceLine>
                            {displayTPronunciationIcon &&
                                (targetPronouncing ? (
                                    <StyledPronounceLoadingIcon />
                                ) : (
                                    <StyledPronounceIcon
                                        role="button"
                                        onClick={() => setTargetPronounce(true)}
                                    />
                                ))}
                            {displayTPronunciation && (
                                <PronounceText
                                    dir={textDirection}
                                    DrawerHeight={TextContentDrawerHeight}
                                    DisableDrawer={!foldLongContent}
                                >
                                    {props.tPronunciation}
                                </PronounceText>
                            )}
                        </PronounceLine>
                    )}
                </Target>
            )}
        </Fragment>
    );

    const SourceContent = (
        <Fragment key={"originalText"}>
            {props.originalText?.length > 0 && (
                <Source>
                    <TextLine>
                        <div
                            dir={textDirection}
                            contenteditable={editing}
                            ref={originalTextElRef}
                            style={{ paddingLeft: 3 }}
                        >
                            {props.originalText}
                        </div>
                        {editing ? (
                            <StyledEditDoneIcon
                                role="button"
                                title={chrome.i18n.getMessage("Retranslate")}
                                onClick={() =>
                                    setEditing({
                                        edit: false,
                                        element: originalTextElRef.current,
                                    })
                                }
                            />
                        ) : (
                            <StyledEditIcon
                                role="button"
                                title={chrome.i18n.getMessage("EditText")}
                                onClick={() =>
                                    setEditing({
                                        edit: true,
                                        element: originalTextElRef.current,
                                    })
                                }
                            />
                        )}
                    </TextLine>
                    {(displaySPronunciationIcon || displaySPronunciation) && (
                        <PronounceLine>
                            {displaySPronunciationIcon &&
                                (sourcePronouncing ? (
                                    <StyledPronounceLoadingIcon />
                                ) : (
                                    <StyledPronounceIcon
                                        role="button"
                                        onClick={() => setSourcePronounce(true)}
                                    />
                                ))}
                            {displaySPronunciation && (
                                <PronounceText
                                    dir={textDirection}
                                    DrawerHeight={TextContentDrawerHeight}
                                    DisableDrawer={!foldLongContent}
                                >
                                    {props.sPronunciation}
                                </PronounceText>
                            )}
                        </PronounceLine>
                    )}
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
                    <BlockContent
                        DrawerHeight={BlockContentDrawerHeight}
                        DisableDrawer={!foldLongContent}
                    >
                        {props.detailedMeanings.map((detail, detailIndex) => (
                            <Fragment key={`detail-${detailIndex}`}>
                                <Position dir={textDirection}>{detail.pos}</Position>
                                <DetailMeaning dir={textDirection}>{detail.meaning}</DetailMeaning>
                                {detail.synonyms?.length > 0 && (
                                    <Fragment>
                                        <SynonymTitle dir={textDirection}>
                                            {chrome.i18n.getMessage("Synonyms")}
                                        </SynonymTitle>
                                        <SynonymLine>
                                            {detail.synonyms.map((word, synonymIndex) => (
                                                <SynonymWord
                                                    key={`detail-synonym-${synonymIndex}`}
                                                    dir={textDirection}
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
                    <BlockContent
                        DrawerHeight={BlockContentDrawerHeight}
                        DisableDrawer={!foldLongContent}
                    >
                        {props.definitions.map((definition, definitionIndex) => (
                            <Fragment key={`definition-${definitionIndex}`}>
                                <Position dir={textDirection}>{definition.pos}</Position>
                                <DetailMeaning dir={textDirection}>
                                    {definition.meaning}
                                </DetailMeaning>
                                {definition.example && (
                                    <DefinitionExample
                                        dir={textDirection}
                                    >{`"${definition.example}"`}</DefinitionExample>
                                )}
                                {definition.synonyms?.length > 0 && (
                                    <Fragment>
                                        <SynonymTitle dir={textDirection}>
                                            {chrome.i18n.getMessage("Synonyms")}
                                        </SynonymTitle>
                                        <SynonymLine>
                                            {definition.synonyms.map((word, synonymIndex) => (
                                                <SynonymWord
                                                    key={`definition-synonym-${synonymIndex}`}
                                                    dir={textDirection}
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
                    <BlockContent
                        DrawerHeight={BlockContentDrawerHeight}
                        DisableDrawer={!foldLongContent}
                    >
                        <ExampleList dir={textDirection}>
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
                                        <ExampleTarget
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
        getOrSetDefaultSettings(
            ["LayoutSettings", "TranslateResultFilter", "ContentDisplayOrder"],
            DEFAULT_SETTINGS
        ).then((result) => {
            setContentDisplayOrder(result.ContentDisplayOrder);
            setDisplaySPronunciation(result.TranslateResultFilter["sPronunciation"]);
            setDisplayTPronunciation(result.TranslateResultFilter["tPronunciation"]);
            setDisplaySPronunciationIcon(result.TranslateResultFilter["sPronunciationIcon"]);
            setDisplayTPronunciationIcon(result.TranslateResultFilter["tPronunciationIcon"]);
            setContentFilter(result.TranslateResultFilter);
            setTextDirection(result.LayoutSettings.RTL ? "rtl" : "ltr");
            setFoldLongContent(result.LayoutSettings.FoldLongContent);
        });
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== "sync") return;

            if (changes.ContentDisplayOrder) {
                setContentDisplayOrder(changes.ContentDisplayOrder.newValue);
            }

            if (changes.TranslateResultFilter) {
                setDisplaySPronunciation(changes.TranslateResultFilter.newValue["sPronunciation"]);
                setDisplayTPronunciation(changes.TranslateResultFilter.newValue["tPronunciation"]);
                setDisplaySPronunciationIcon(
                    changes.TranslateResultFilter.newValue["sPronunciationIcon"]
                );
                setDisplayTPronunciationIcon(
                    changes.TranslateResultFilter.newValue["tPronunciationIcon"]
                );
                setContentFilter(changes.TranslateResultFilter.newValue);
            }

            if (changes.LayoutSettings) {
                setTextDirection(changes.LayoutSettings.newValue.RTL ? "rtl" : "ltr");
                setFoldLongContent(changes.LayoutSettings.newValue.FoldLongContent);
            }
        });

        return () => {
            // remove all of event listeners before destroying the component
            cancelers.forEach((canceler) => canceler());
        };
    }, []);

    return (
        <Fragment>
            <ThemeProvider theme={(props) => ({ ...props, textDirection })}>
                {contentDisplayOrder
                    .filter((content) => contentFilter[content])
                    .map((content) => CONTENTS[content])}
            </ThemeProvider>
        </Fragment>
    );
}

/**
 * STYLE FOR THE COMPONENT START
 */

const BlockPadding = "10px";
const BlockMargin = "8px";
const LightPrimary = "rgba(74, 140, 247, 0.7)";
const Gray = "#919191";
const BlockContentDrawerHeight = 150; // drawer height for blocks
const TextContentDrawerHeight = 50; // drawer height for texts

/**
 * basic style for a block used to display content
 */
export const Block = styled.div`
    width: calc(100% - 2 * ${BlockMargin});
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: ${BlockPadding};
    margin: ${BlockMargin};
    margin-top: 0;
    background-color: rgb(250, 250, 250);
    border-radius: 10px;
    /* box-shadow: 0px 3px 6px rgba(127, 127, 127, 0.25); */
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
    flex-direction: ${(props) => (props.theme.textDirection === "ltr" ? "row" : "row-reverse")};
    justify-content: space-between;
    align-items: center;
`;

const StyledEditIcon = styled(EditIcon)`
    width: 18px;
    height: 18px;
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
    transition: fill 0.2s linear;
    &:hover {
        fill: dimgray;
    }
`;

const StyledEditDoneIcon = styled(EditDoneIcon)`
    width: 18px;
    height: 18px;
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
    transition: fill 0.2s linear;
    &:hover {
        fill: dimgray;
    }
`;

const PronounceLine = styled.div`
    width: 100%;
    margin: 5px 0;
    display: flex;
    flex-direction: ${(props) => (props.theme.textDirection === "ltr" ? "row" : "row-reverse")};
    justify-content: flex-start;
    align-items: center;
`;

const PronounceText = styled(DrawerBlock)`
    color: ${Gray};
`;

const StyledCopyIcon = styled(CopyIcon)`
    width: 20px;
    height: 20px;
    fill: ${Gray};
    flex-shrink: 0;
    margin-left: 2px;
    transition: fill 0.2s linear;
    &:hover {
        fill: dimgray;
    }
`;

const StyledPronounceIcon = styled(PronounceIcon)`
    width: 20px;
    height: 20px;
    padding: 2px;
    margin-right: 10px;
    fill: ${LightPrimary};
    flex-shrink: 0;
    transition: fill 0.2s linear;
    ${(props) =>
        props.theme.textDirection === "ltr"
            ? `
                margin-right: 10px;
            `
            : `
                margin-left: 10px;
                transform: rotate(180deg);
            `}

    &:hover {
        fill: orange !important;
    }
`;

const StyledPronounceLoadingIcon = styled(PronounceLoadingIcon)`
    width: 24px;
    height: 24px;
    margin-right: 10px;
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
    flex-direction: ${(props) => (props.theme.textDirection === "ltr" ? "row" : "row-reverse")};
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
`;

const BlockHeadTitle = styled.span`
    font-size: small;
    ${(props) =>
        `${props.theme.textDirection === "ltr" ? "margin-left" : "margin-right"}:${BlockPadding}`}
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

const BlockContent = styled(DrawerBlock)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${(props) => (props.theme.textDirection === "ltr" ? "flex-start" : "flex-end")};
    flex-shrink: 0;
`;

const DetailHeadSpot = styled(BlockHeadSpot)`
    background-color: #00bfa5;
`;

const Position = styled.div`
    color: ${Gray};
    font-size: smaller;
`;

const DetailMeaning = styled.div`
    padding: 5px 0;
    ${(props) => (props.theme.textDirection === "ltr" ? "margin-left" : "margin-right")}: 10px;
`;

const SynonymTitle = styled.div`
    color: ${Gray};
    font-size: small;
    ${(props) => (props.theme.textDirection === "ltr" ? "margin-left" : "margin-right")}: 10px;
`;

const SynonymLine = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    ${(props) =>
        props.theme.textDirection === "ltr"
            ? `
                margin-left: 10px;
                flex-direction: row;
            `
            : `
                margin-right: 10px;       
                flex-direction: row-reverse;
            `};
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
    ${(props) => (props.theme.textDirection === "ltr" ? "padding-left" : "padding-right")}: 1.5rem;
    margin: 0;
`;

const ExampleItem = styled.li`
    padding: 5px 0;
    font-size: small;
`;

const ExampleSource = styled.div`
    font-size: medium;
`;

const ExampleTarget = styled.div`
    padding-top: 5px;
    font-size: medium;
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

    /**
     * Make the editable element automatically focus.
     * Use setTimeout because of https://stackoverflow.com/a/37162116.
     */
    setTimeout(() => originalTextEle.focus());
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
 * @param {{edit: boolean; element: HTMLElement;}} state new state information
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

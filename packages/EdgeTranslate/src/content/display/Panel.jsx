/** @jsx h */
import { h, Fragment } from "preact";
import { useEffect, useState, useRef, useCallback } from "preact/hooks";
import { useLatest, useEvent, useClickAway } from "react-use";
import styled, { createGlobalStyle } from "styled-components";
import root from "react-shadow/styled-components";
import SimpleBar from "simplebar-react";
import SimpleBarStyle from "simplebar-react/dist/simplebar.min.css";
import Channel from "common/scripts/channel.js";
import Moveable from "./library/moveable/moveable.js";
import { delayPromise } from "common/scripts/promise.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";
import { isChromePDFViewer } from "../common.js";
import Result from "./Result.jsx"; // display translate result
import Loading from "./Loading.jsx"; // display loading animation
import Error from "./Error.jsx"; // display error messages
import Dropdown from "./Dropdown.jsx";
import SettingIcon from "./icons/setting.svg";
import PinIcon from "./icons/pin.svg";
import CloseIcon from "./icons/close.svg";

// Communication channel.
const channel = new Channel();
// Store the translation result and attach it to window.
window.translateResult = {};
// Flag of showing result.
window.isDisplayingResult = false;
// Store the width of scroll bar.
const scrollbarWidth = getScrollbarWidth();
// Store original css text on document.body.
let documentBodyCSS = "";
// The duration time of result panel's transition. unit: ms.
const transitionDuration = 500;

export default function ResultPanel() {
    // Whether the result is open.
    const [open, setOpen] = useState(false);
    // Whether the panel is fixed(the panel won't be close when users click outside of the it).
    const [panelFix, setPanelFix] = useState();
    // "LOADING" | "RESULT" | "ERROR"
    const [contentType, setContentType] = useState("LOADING");
    const contentTypeRef = useLatest(contentType);
    // translate results or error messages
    const [content, setContent] = useState({});
    // refer to the latest content equivalent to useRef()
    const contentRef = useLatest(content);
    // available translators for current language setting
    const [availableTranslators, setAvailableTranslators] = useState();
    // selected translator
    const [currentTranslator, setCurrentTranslator] = useState();
    // Control the behavior of highlight part(a placeholder to preview the "fixed" style panel).
    const [highlight, setHighlight] = useState({
        show: false, // whether to show the highlight part
        position: "right", // the position of the highlight part. value: "left"|"right"
    });
    // state of display type("floating" | "fixed")
    const [displayType, setDisplayType] = useState("floating");
    /**
     * Wether we use a mask layer in chrome native pdf viewer.
     * In the chrome native pdf viewer, mouse events can't be detected. In order to make the panel resizable, we build a mask layer that fills the whole page to detect mouse events.
     */
    const [usePDFMaskLayer, setUsePDFMaskLayer] = useState(false);

    const containerElRef = useRef(), // the container of translation panel.
        panelElRef = useRef(), // panel element
        headElRef = useRef(), // panel head element
        bodyElRef = useRef(); // panel body element

    // Indicate whether the movable panel is ready or not.
    const [moveableReady, setMoveableReady] = useState(false);
    // store the moveable object returned by moveable.js
    const moveablePanelRef = useRef(null);
    const simplebarRef = useRef();
    // store the display type("floating"|"fixed")
    const displaySettingRef = useRef({
        type: "fixed",
        fixedData: {
            width: 0.2,
            position: "right",
        },
        floatingData: {
            width: 0.15,
            height: 0.6,
        },
    });
    // flag whether the user set to resize document body when panel is resized in fixed display mode
    const resizePageFlag = useRef(false);

    /**
     * Update the bounds value for draggable area.
     */
    const updateBounds = useCallback(async () => {
        // If the panel is open
        if (containerElRef.current) {
            await getDisplaySetting();
            let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            moveablePanelRef.current?.setBounds({
                left: scrollLeft,
                top: scrollTop,
                right: scrollLeft + window.innerWidth - (hasScrollbar() ? scrollbarWidth : 0),
                bottom:
                    scrollTop +
                    (1 + displaySettingRef.current.floatingData.height) * window.innerHeight -
                    64,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * The handler for window resize event.
     * Update drag bounds and the size or position of the result panel.
     */
    const windowResizeHandler = useCallback(() => {
        updateBounds();
        // If result panel is open.
        if (panelElRef.current) {
            if (displaySettingRef.current.type === "fixed") showFixedPanel();
            else showFloatingPanel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Do some initialization stuff */
    useEffect(() => {
        getDisplaySetting();

        getOrSetDefaultSettings(["languageSetting", "DefaultTranslator"], DEFAULT_SETTINGS).then(
            async (result) => {
                let languageSetting = result.languageSetting;
                let availableTranslators = await channel.request("get_available_translators", {
                    from: languageSetting.sl,
                    to: languageSetting.tl,
                });
                setAvailableTranslators(availableTranslators);
                setCurrentTranslator(result.DefaultTranslator);
            }
        );

        getOrSetDefaultSettings("fixSetting", DEFAULT_SETTINGS).then((result) => {
            setPanelFix(result.fixSetting);
        });

        /*
         * COMMUNICATE WITH BACKGROUND MODULE
         */
        // The translator send this request to make sure current tab can display result panel.
        channel.provide("check_availability", () => Promise.resolve());

        channel.on("start_translating", (detail) => {
            if (checkTimestamp(detail.timestamp)) {
                // cache translation text.
                window.translateResult.originalText = detail.text;
                setOpen(true);
                setContentType("LOADING");
                setContent(detail);
            }
        });

        channel.on("translating_finished", (detail) => {
            if (checkTimestamp(detail.timestamp)) {
                window.translateResult = detail;
                setOpen(true);
                setContentType("RESULT");
                setContent(detail);
            }
        });

        channel.on("translating_error", (detail) => {
            if (checkTimestamp(detail.timestamp)) {
                setContentType("ERROR");
                setContent(detail);
            }
        });

        channel.on("update_translator_options", (detail) => {
            setAvailableTranslators(detail.availableTranslators);
            setCurrentTranslator(detail.selectedTranslator);
        });

        channel.on("command", (detail) => {
            switch (detail.command) {
                case "fix_result_frame":
                    getOrSetDefaultSettings("fixSetting", DEFAULT_SETTINGS).then((result) => {
                        setPanelFix(!result.fixSetting);
                        chrome.storage.sync.set({
                            fixSetting: !result.fixSetting,
                        });
                    });
                    break;
                case "close_result_frame":
                    setOpen(false);
                    break;
                default:
                    break;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * When status of result panel is changed(open or close), this function will be triggered.
     */
    const onDisplayStatusChange = useCallback((panelEl) => {
        panelElRef.current = panelEl;

        /* If panel is closed */
        if (!panelEl) {
            // Clear the outdated moveable object.
            moveablePanelRef.current = null;
            setMoveableReady(false);

            // Tell select.js that the result panel has been removed.
            window.isDisplayingResult = false;

            removeFixedPanel();

            // Handle the click event exception when using chrome's original pdf viewer
            if (isChromePDFViewer()) {
                document.body.children[0].focus();
            }

            // Tell background module that the result panel has been closed
            channel.emit("frame_closed");
            return;
        }

        /* else if panel is open */
        // Tell select.js that we are displaying results.
        window.isDisplayingResult = true;

        /* Make the resultPanel resizable and draggable */
        moveablePanelRef.current = new Moveable(panelEl, {
            draggable: true,
            resizable: true,
            /* Set threshold value to increase the resize area */
            // threshold: { s: 5, se: 5, e: 5, ne: 5, n: 5, nw: 5, w: 5, sw: 5 },
            // threshold: { edge:5, corner:5 },
            threshold: 5,
            /**
             * Set thresholdPosition to decide where the resizable area is
             * "in": the activated resizable area is within the target element
             * "center": the activated resizable area is half within the target element and half out of the it
             * "out": the activated resizable area is out of the target element
             * a number(0~1): a ratio which determines the how much the the activated resizable area beyond the element
             */
            // thresholdPosition: "in",
            // thresholdPosition: "center",
            // thresholdPosition: "out",
            thresholdPosition: 0.7,
            minWidth: 180,
            minHeight: 150,
        });

        let startTranslate = [0, 0];
        // To flag whether the floating panel should be changed to fixed panel.
        let floatingToFixed = false;
        // Store the fixed direction on bound event.
        let fixedDirection = "";
        /* draggable events*/
        moveablePanelRef.current
            .on("dragStart", ({ set, stop, inputEvent }) => {
                if (inputEvent) {
                    const path =
                        inputEvent.path || (inputEvent.composedPath && inputEvent.composedPath());
                    // If drag element isn't the head element, stop the drag event.
                    if (!path || !headElRef.current?.isSameNode(path[0])) {
                        stop();
                        return;
                    }
                }
                set(startTranslate);
                // Open the pdf mask layer.
                if (isChromePDFViewer()) setUsePDFMaskLayer(true);
            })
            .on("drag", ({ target, translate }) => {
                startTranslate = translate;
                target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
            })
            .on("dragEnd", ({ translate, inputEvent }) => {
                startTranslate = translate;

                /* Change the display type of result panel */
                if (inputEvent && displaySettingRef.current.type === "floating") {
                    if (floatingToFixed) {
                        displaySettingRef.current.fixedData.position = fixedDirection;
                        displaySettingRef.current.type = "fixed";
                        // remove the highlight part
                        setHighlight({
                            show: false,
                            position: "right",
                        });
                        showFixedPanel();
                        updateDisplaySetting();
                    }
                }
                // Close the pdf mask layer.
                setUsePDFMaskLayer(false);
            })
            // // The result panel start to drag out of the drag area
            // .on("boundStart", ({ direction }) => {
            //     console.log(direction);
            // })
            // The result panel drag out of the drag area
            .on("bound", ({ direction, distance }) => {
                /* Whether to show hight part on the one side of the page*/
                if (displaySettingRef.current.type === "floating") {
                    let threshold = 10;
                    if (distance > threshold) {
                        if (direction === "left" || direction === "right") {
                            fixedDirection = direction;
                            floatingToFixed = true;
                            // show highlight part
                            setHighlight({
                                show: true,
                                position: direction,
                            });
                        }
                    }
                }
            })
            // The result panel drag into drag area first time
            .on("boundEnd", () => {
                if (floatingToFixed)
                    // remove the highlight part
                    setHighlight({
                        show: false,
                        position: "right",
                    });
                floatingToFixed = false;
                // Change the display type from fixed to floating
                if (displaySettingRef.current.type === "fixed") {
                    displaySettingRef.current.type = "floating";
                    removeFixedPanel();
                    showFloatingPanel();
                    updateDisplaySetting();
                    // The height of content in fixed panel may be different from the height in floating panel so we need to update the height of floating panel after a little delay.
                    setTimeout(showFloatingPanel, 50);
                }
            });
        /* Listen to resizable  events */
        moveablePanelRef.current
            .on("resizeStart", ({ set }) => {
                set(startTranslate);
                // Open the pdf mask layer.
                if (isChromePDFViewer()) setUsePDFMaskLayer(true);
            })
            .on("resize", ({ target, width, height, translate, inputEvent }) => {
                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
                if (inputEvent) {
                    if (displaySettingRef.current.type === "fixed" && resizePageFlag.current) {
                        document.body.style.width = `${(1 - width / window.innerWidth) * 100}%`;
                    }
                }
            })
            .on("resizeEnd", ({ translate, width, height, inputEvent, target }) => {
                startTranslate = translate;
                target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;

                // Update new size of the result panel
                if (inputEvent) {
                    if (displaySettingRef.current.type === "floating") {
                        displaySettingRef.current.floatingData.width = width / window.innerWidth;
                        displaySettingRef.current.floatingData.height = height / window.innerHeight;
                    } else {
                        displaySettingRef.current.fixedData.width = width / window.innerWidth;
                    }
                    updateDisplaySetting();
                }
                // Close the pdf mask layer.
                setUsePDFMaskLayer(false);
            });
        showPanel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Fit the floating panel to the content size after the content is updated. */
    useEffect(() => {
        if (displaySettingRef.current.type === "floating")
            // The panel doesn't have to fit the loading animation so the delay won't be necessary.
            setTimeout(showFloatingPanel, contentType === "LOADING" ? 0 : 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentType]);

    // Update drag bounds when users scroll the page
    useEvent("scroll", updateBounds, window);

    // Update the drag bounds and size when the size of window has changed
    useEvent("resize", windowResizeHandler, window);

    useClickAway(containerElRef, () => {
        // The panel will be closed if users click outside of the it with the panelFix option closed.
        if (!panelFix) {
            setOpen(false);
        }
    });

    /**
     * Display the panel.
     */
    async function showPanel() {
        await getDisplaySetting();
        updateBounds();
        if (displaySettingRef.current.type === "floating") {
            /* show floating panel */
            let position;
            let width = displaySettingRef.current.floatingData.width * window.innerWidth;
            let height = displaySettingRef.current.floatingData.height * window.innerHeight;
            if (contentRef.current.position) {
                /* Adjust the position of result panel. Avoid to beyond the range of page */
                const XBias = 20,
                    YBias = 20,
                    threshold = height / 4;
                position = [contentRef.current.position[0], contentRef.current.position[1]];
                // The result panel would exceeds the right boundary of the page.
                if (position[0] + width > window.innerWidth) {
                    position[0] = position[0] - width - XBias;
                }
                // The result panel would exceeds the bottom boundary of the page.
                if (position[1] + height > window.innerHeight + threshold) {
                    // Make true the panel wouldn't exceed the top boundary.
                    let newPosition1 = position[1] - height - YBias + threshold;
                    position[1] = newPosition1 < 0 ? 0 : newPosition1;
                }
                position = [position[0] + XBias, position[1] + YBias];
            } else
                position = [
                    (1 - displaySettingRef.current.floatingData.width) * window.innerWidth -
                        (hasScrollbar() ? scrollbarWidth : 0),
                    0,
                ];
            showFloatingPanel();
            moveablePanelRef.current.request("draggable", { x: position[0], y: position[1] });
        } else {
            showFixedPanel();
        }
        // Indicate that the movable panel is ready to show.
        setMoveableReady(true);
    }

    /**
     * Show the result panel in the floating type.
     */
    function showFloatingPanel() {
        if (!moveablePanelRef.current) return;
        setDisplayType("floating");
        let panelHeight = displaySettingRef.current.floatingData.height * window.innerHeight;
        /* Fit the panel to the content size */
        if (contentTypeRef.current === "RESULT" || contentTypeRef.current === "ERROR") {
            const actualHeight =
                headElRef.current.clientHeight +
                (simplebarRef.current?.getContentElement().clientHeight || 0);
            // If the height of simplebar content element isn't 0.
            if (actualHeight !== headElRef.current.clientHeight && panelHeight > actualHeight)
                panelHeight = actualHeight;
        }
        moveablePanelRef.current.request("resizable", {
            width: displaySettingRef.current.floatingData.width * window.innerWidth,
            height: panelHeight,
        });
    }

    /**
     * Show the result panel in the fixed type.
     */
    function showFixedPanel() {
        setDisplayType("fixed");
        let width = displaySettingRef.current.fixedData.width * window.innerWidth;
        // the offset left value for fixed result panel
        let offsetLeft = 0;
        if (displaySettingRef.current.fixedData.position === "right")
            offsetLeft = window.innerWidth - width - (hasScrollbar() ? scrollbarWidth : 0);
        getOrSetDefaultSettings("LayoutSettings", DEFAULT_SETTINGS).then(async (result) => {
            resizePageFlag.current = result.LayoutSettings.Resize;
            // user set to resize the document body
            if (resizePageFlag.current) {
                // If `documentBodyCSS` is empty, this means the panel is created for the first time. Ths creation animation is only needed when the panel is firstly created.
                if (documentBodyCSS === "") {
                    // store the original css text. when fixed panel is removed, restore the style of document.body
                    documentBodyCSS = document.body.style.cssText;

                    document.body.style.position = "absolute";
                    document.body.style.transition = `width ${transitionDuration}ms`;
                    panelElRef.current.style.transition = `width ${transitionDuration}ms`;
                    /* set the start width to make the transition effect work */
                    document.body.style.width = "100%";
                    move(0, window.innerHeight, offsetLeft, 0);
                    // wait some time to make the setting of width applied
                    await delayPromise(50);
                }
                // the fixed panel in on the left side
                if (displaySettingRef.current.fixedData.position === "left") {
                    document.body.style.right = "0";
                    document.body.style.left = "";
                }
                // the fixed panel in on the right side
                else {
                    document.body.style.margin = "0";
                    document.body.style.right = "";
                    document.body.style.left = "0";
                }
                // set the target width for document body
                document.body.style.width = `${
                    (1 - displaySettingRef.current.fixedData.width) * 100
                }%`;
                // set the target width for the result panel
                move(width, window.innerHeight, offsetLeft, 0);
                /* cancel the transition effect after the panel showed */
                await delayPromise(transitionDuration);
                panelElRef.current.style.transition = "";
                document.body.style.transition = "";
            } else move(width, window.innerHeight, offsetLeft, 0);
        });
    }

    /**
     * If user choose to resize the document body, make the page return to normal size.
     */
    async function removeFixedPanel() {
        if (resizePageFlag.current) {
            document.body.style.transition = `width ${transitionDuration}ms`;
            await delayPromise(50);
            document.body.style.width = "100%";
            await delayPromise(transitionDuration);
            document.body.style.cssText = documentBodyCSS;
            documentBodyCSS = "";
        }
    }

    /**
     * Drag the target element to a specified position and resize it to a specific size.
     * @param {number} width width
     * @param {number} height height value
     * @param {number} left x-axis coordinate of the target position
     * @param {number} top y-axis coordinate of the target position
     */
    function move(width, height, left, top) {
        moveablePanelRef.current.request("draggable", {
            x: left,
            y: top,
        });
        moveablePanelRef.current.request("resizable", {
            width,
            height,
        });
    }

    /**
     * Get the display setting in chrome.storage api.
     * @returns {Promise{undefined}} null promise
     */
    function getDisplaySetting() {
        return new Promise((resolve) => {
            getOrSetDefaultSettings("DisplaySetting", DEFAULT_SETTINGS).then((result) => {
                if (result.DisplaySetting) {
                    displaySettingRef.current = result.DisplaySetting;
                } else {
                    updateDisplaySetting();
                }
                resolve();
            });
        });
    }

    /**
     * Update the display setting in chrome.storage.
     */
    function updateDisplaySetting() {
        chrome.storage.sync.set({ DisplaySetting: displaySettingRef.current });
    }

    return (
        open && (
            <root.div
                ref={containerElRef}
                style={
                    usePDFMaskLayer
                        ? // Make the container element be the mask layer in chrome native pdf viewer.
                          {
                              // client width of the pdf embed element
                              width: document.body.children[0].clientWidth,
                              height: document.body.children[0].clientHeight,
                              position: "fixed",
                              zIndex: MaxZIndex,
                          }
                        : {}
                }
            >
                <GlobalStyle />
                <Panel ref={onDisplayStatusChange} displayType={displayType} data-testid="Panel">
                    {
                        // Only show the panel's content when the panel is movable.
                        moveableReady && (
                            <Fragment>
                                <Head ref={headElRef} data-testid="Head">
                                    <SourceOption
                                        role="button"
                                        title={chrome.i18n.getMessage(`${currentTranslator}Short`)}
                                        activeKey={currentTranslator}
                                        onSelect={(eventKey) => {
                                            setCurrentTranslator(eventKey);
                                            channel
                                                .request("update_default_translator", {
                                                    translator: eventKey,
                                                })
                                                .then(() => {
                                                    if (window.translateResult.originalText)
                                                        channel.request("translate", {
                                                            text: window.translateResult
                                                                .originalText,
                                                        });
                                                });
                                        }}
                                        data-testid="SourceOption"
                                    >
                                        {availableTranslators?.map((translator) => (
                                            <Dropdown.Item
                                                role="button"
                                                key={translator}
                                                eventKey={translator}
                                            >
                                                {chrome.i18n.getMessage(translator)}
                                            </Dropdown.Item>
                                        ))}
                                    </SourceOption>
                                    <HeadIcons>
                                        <HeadIcon
                                            role="button"
                                            title={chrome.i18n.getMessage("Settings")}
                                            onClick={() => channel.emit("open_options_page")}
                                            data-testid="SettingIcon"
                                        >
                                            <SettingIcon />
                                        </HeadIcon>
                                        <HeadIcon
                                            role="button"
                                            title={chrome.i18n.getMessage(
                                                panelFix ? "UnfixResultFrame" : "FixResultFrame"
                                            )}
                                            onClick={() => {
                                                setPanelFix(!panelFix);
                                                chrome.storage.sync.set({
                                                    fixSetting: !panelFix,
                                                });
                                            }}
                                            data-testid="PinIcon"
                                        >
                                            <StyledPinIcon fix={panelFix} />
                                        </HeadIcon>
                                        <HeadIcon
                                            role="button"
                                            title={chrome.i18n.getMessage("CloseResultFrame")}
                                            onClick={() => setOpen(false)}
                                            data-testid="CloseIcon"
                                        >
                                            <CloseIcon />
                                        </HeadIcon>
                                    </HeadIcons>
                                </Head>
                                <Body ref={bodyElRef}>
                                    <SimpleBar ref={simplebarRef}>
                                        {contentType === "LOADING" && <Loading />}
                                        {contentType === "RESULT" && <Result {...content} />}
                                        {contentType === "ERROR" && <Error {...content} />}
                                    </SimpleBar>
                                </Body>
                            </Fragment>
                        )
                    }
                </Panel>
                {highlight.show && (
                    <Highlight
                        style={{
                            width: displaySettingRef.current.fixedData.width * window.innerWidth,
                            [highlight.position]: 0,
                        }}
                    />
                )}
            </root.div>
        )
    );
}

/**
 * STYLE FOR THE COMPONENT START
 */

export const MaxZIndex = 2147483647;
const ColorPrimary = "#4a8cf7";
const PanelBorderRadius = "8px";
export const ContentWrapperCenterClassName = "simplebar-content-wrapper-center";

const GlobalStyle = createGlobalStyle`
    ${SimpleBarStyle}

    /* Fix content disappearing problem. */
    [data-simplebar] {
        width: 100%;
        height: 100%;
        max-height: 100%;
    }

    /* Fix content horizontally overflowing problem. */
    .simplebar-offset {
        width: 100%;
    }

    /* Adjust width of the vertical scrollbar. */
    .simplebar-track.simplebar-vertical {
        width: 8px;
    }

    /* Adjust height of the horizontal scrollbar. */
    .simplebar-track.simplebar-horizontal {
        height: 8px;
    }

    /* Adjust position, shape and color of the scrollbar thumb. */
    .simplebar-scrollbar:before {
        left: 1px;
        right: 1px;
        border-radius: 8px;
        background-color: rgba(150, 150, 150, 0.8);
    }

    /* Apply to the content wrapper, which is the parent element of simplebar-content, to align content in the vertical center. */
    .${ContentWrapperCenterClassName} {
        display: flex;
        flex-direction: column;

        // "justify-content: center;" may cause part of content hidden when overflowing, so we use pseudo elements to simulate its effect.
        &::before,
        &::after {
            content: "";
            flex: 1;
        }
    }

    /* Adjust the content container, which is the parent element of Panel Body. */
    .simplebar-content{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;

/**
 * @param {{
 *   displayType: "floating" | "fixed";
 * }} props
 */
const Panel = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${MaxZIndex};
    border-radius: ${(props) => (props.displayType === "floating" ? PanelBorderRadius : 0)};
    overflow: visible;
    box-shadow: 0px 8px 12px 5px rgba(0, 0, 0, 0.25);
    background: rgba(235, 235, 235, 1);

    /* Normalize the style of panel */
    padding: 0;
    margin: 0;
    border: none;
    font-size: 16px;
    font-weight: normal;
    color: black;
    line-height: 1;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: system-ui, -apple-system,
        /* Firefox supports this but not yet 'system-ui' */ "Segoe UI", Roboto, Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji";

    &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        z-index: -1;
        display: block;
        /* backdrop-filter: blur(6px); */
        height: 100%;
        border-radius: ${(props) => (props.displayType === "floating" ? PanelBorderRadius : 0)};
    }
`;

const Head = styled.div`
    padding: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
    overflow: visible;
    cursor: grab;
`;

const HeadIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const HeadIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
    font-size: 18px;
    width: 24px;
    height: 24px;
    margin: 2px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;

    svg {
        fill: #8e8e93;
        width: 16px;
        height: 16px;
        display: block;
        transition: fill 0.2s linear;
    }

    &:hover svg {
        fill: dimgray;
    }
`;

const StyledPinIcon = styled(PinIcon)`
    transition: transform 0.4s, fill 0.2s linear !important;
    ${(props) => (props.fix ? "" : "transform: rotate(45deg)")}
`;

const Body = styled.div`
    width: 100%;
    box-sizing: border-box;
    font-weight: normal;
    font-size: medium;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: overlay;
    overscroll-behavior: contain;
    flex-grow: 1;
    flex-shrink: 1;
    word-break: break-word;
`;

const SourceOption = styled(Dropdown)`
    max-width: 45%;
    font-weight: normal;
    font-size: small;
    cursor: pointer;
    // To center the text in select box
    text-align-last: center;
    background-color: transparent;
    border-color: transparent;
    outline: none;
`;

const Highlight = styled.div`
    height: 100%;
    background: ${ColorPrimary};
    opacity: 0.3;
    position: fixed;
    top: 0;
    z-index: ${MaxZIndex};
`;

/**
 * STYLE FOR THE COMPONENT END
 */

/**
 * Check whether the translation result is the latest.
 * @param {number} timestamp the timestamp of the new translation result
 * @returns true if the result is the latest
 */
export function checkTimestamp(timestamp) {
    /**
     * Check message timestamp.
     *
     * translateResult keeps the latest(biggest) timestamp ever received.
     */
    if (window.translateResult.timestamp) {
        /**
         * When a new message with timestamp arrived, we check if the timestamp stored in translateResult
         * is bigger than the timestamp of the arriving message.
         */
        if (window.translateResult.timestamp > timestamp) {
            /**
             * If it does, which means the corresponding translating request is out of date, we drop the
             * message.
             */
            return false;
        }
        /**
         * If it doesn't, which means the corresponding translating request is up to date, we update
         * the timestamp stored in translateResult and accept the message.
         */
        window.translateResult.timestamp = timestamp;
    }
    return true;
}

/**
 * Calculate the width of scroll bar.
 * method: create a div element with a scroll bar and calculate the difference between offsetWidth and clientWidth
 * @returns {number} the width of scroll bar
 */
function getScrollbarWidth() {
    let scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
        "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
    document.documentElement.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.documentElement.removeChild(scrollDiv);
    return scrollbarWidth;
}

/**
 * Judge whether the current page has a scroll bar.
 */
function hasScrollbar() {
    return (
        document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    );
}

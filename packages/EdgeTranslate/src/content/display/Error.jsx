/** @jsx h */
import { h } from "preact";
import styled from "styled-components";
import { useEffect, useRef } from "preact/hooks";
import { ContentWrapperCenterClassName } from "./Panel.jsx";
import ErrorIcon from "./icons/error.svg";

/**
 * @param {{
 *   error: {
 *     errorType: "API_ERR" | "NET_ERR",
 *     errorCode: Number,
 *     errorMsg: string,
 *     errorAct: Object?,
 *   }
 * }} props error info
 *
 * @returns {h.JSX.Element} element
 */
export default function Error(props) {
    const errorElRef = useRef();
    /**
     * To align the error content align in the vertical center.
     */
    useEffect(() => {
        const wrapperElement = errorElRef.current.parentElement.parentElement;
        wrapperElement.classList.add(ContentWrapperCenterClassName);
        return () => {
            wrapperElement.classList.remove(ContentWrapperCenterClassName);
        };
    }, []);
    return (
        <ErrorContainer ref={errorElRef}>
            <ErrorInfo>
                <StyledErrorIcon />
                <ErrorType>
                    {props.error.errorType === "API_ERR"
                        ? chrome.i18n.getMessage("APIERR")
                        : chrome.i18n.getMessage("NETERR")}
                </ErrorType>
                <ErrorMessage>
                    {`${chrome.i18n.getMessage("ERR_CODE")}: ${JSON.stringify(
                        props.error.errorCode
                    )}`}
                </ErrorMessage>
                <ErrorMessage>
                    {`${chrome.i18n.getMessage("ERR_MSG")}: ${JSON.stringify(
                        props.error.errorMsg
                    )}`}
                </ErrorMessage>
                {props.error.errorAct && (
                    <ErrorMessage>
                        {`${chrome.i18n.getMessage("ERR_ACT")}: ${JSON.stringify(
                            props.error.errorAct
                        )}`}
                    </ErrorMessage>
                )}
            </ErrorInfo>
        </ErrorContainer>
    );
}

const ErrorContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    // "justify-content: center;" may cause part of content hidden when overflowing, so we use pseudo elements to simulate its effect.
    &::before,
    &::after {
        content: "";
        flex: 1;
    }
`;

const ErrorInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10% 5%;
`;

const StyledErrorIcon = styled(ErrorIcon)`
    width: 150px;
    height: 150px;
    display: block;
    align-self: center;
    fill: #dd5145;

    :hover {
        fill: #dd5145;
    }
`;

const ErrorType = styled.p`
    font-weight: bold;
    font-size: large;
`;

const ErrorMessage = styled.p``;

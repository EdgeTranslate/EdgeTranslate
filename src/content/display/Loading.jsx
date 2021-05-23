/** @jsx h */
import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import styled from "styled-components";
import { ContentWrapperCenterClassName } from "./Panel.jsx";

export default function Loading() {
    const loadingElRef = useRef();
    /**
     * To align the loading animation align in the vertical center.
     */
    useEffect(() => {
        const wrapperElement = loadingElRef.current.parentElement.parentElement;
        wrapperElement.classList.add(ContentWrapperCenterClassName);
        return () => {
            wrapperElement.classList.remove(ContentWrapperCenterClassName);
        };
    }, []);
    return (
        <LoadingEffect ref={loadingElRef}>
            <div class="lds-ellipsis">
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
        </LoadingEffect>
    );
}

const LoadingEffect = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;

    @keyframes lds-ellipsis3 {
        0%,
        25% {
            left: 32px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        50% {
            left: 32px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        75% {
            left: 100px;
        }

        100% {
            left: 168px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes lds-ellipsis3 {
        0%,
        25% {
            left: 32px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        50% {
            left: 32px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        75% {
            left: 100px;
        }

        100% {
            left: 168px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes lds-ellipsis2 {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        25%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }

    @keyframes lds-ellipsis2 {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        25%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }

    @keyframes lds-ellipsis {
        0% {
            left: 32px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        25% {
            left: 32px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        50% {
            left: 100px;
        }

        75% {
            left: 168px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        100% {
            left: 168px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }

    @keyframes lds-ellipsis {
        0% {
            left: 32px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }

        25% {
            left: 32px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        50% {
            left: 100px;
        }

        75% {
            left: 168px;
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        100% {
            left: 168px;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
    }

    .lds-ellipsis {
        height: 50%;
        position: relative;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .lds-ellipsis > div {
        position: absolute;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
    }

    .lds-ellipsis div > div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f00;
        position: absolute;
        top: 100px;
        left: 32px;
        -webkit-animation: lds-ellipsis 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
        animation: lds-ellipsis 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    }

    .lds-ellipsis div:nth-child(1) div {
        -webkit-animation: lds-ellipsis2 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
        animation: lds-ellipsis2 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
        background: rgba(100%, 80.39215686274507%, 25.882352941176467%, 0.9);
    }

    .lds-ellipsis div:nth-child(2) div {
        -webkit-animation-delay: -0.85s;
        animation-delay: -0.85s;
        background: rgba(86.66666666666667%, 31.764705882352956%, 27.058823529411757%, 0.9);
    }

    .lds-ellipsis div:nth-child(3) div {
        -webkit-animation-delay: -0.425s;
        animation-delay: -0.425s;
        background: rgba(9.80392156862745%, 63.13725490196078%, 37.25490196078431%, 0.9);
    }

    .lds-ellipsis div:nth-child(4) div {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        background: rgba(29.411764705882348%, 54.509803921568704%, 95.68627450980392%, 0.9);
    }

    .lds-ellipsis div:nth-child(5) div {
        -webkit-animation: lds-ellipsis3 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
        animation: lds-ellipsis3 1.7s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
        background: rgba(100%, 80.39215686274507%, 25.882352941176467%, 0.9);
    }

    .lds-ellipsis {
        width: 200px !important;
        height: 200px !important;
        -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
    }
`;

/** @jsx h */
import { h } from "preact";
import root from "react-shadow/styled-components";
import styled from "styled-components";
import SettingIcon from "./icons/setting.svg";
import PinIcon from "./icons/pin.svg";
import UnpinIcon from "./icons/unpin.svg";
import CloseIcon from "./icons/close.svg";

const CommonPrefix = "edge-translate-";

export default function ResultPanel() {
    const gray = "#919191";
    const Panel = styled.div`
        position: fixed;
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
        width: 30px;
        height: 30px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 15px;

        svg {
            fill: ${gray};
            width: 18px;
            height: 18px;
            display: block;
        }
    `;

    return (
        <root.div id={`${CommonPrefix}container`}>
            <Panel id={`${CommonPrefix}panel`}>
                <header id={`${CommonPrefix}head`}>
                    <div id="heading-icon">
                        <HeadIcon>
                            <SettingIcon />
                        </HeadIcon>
                        <HeadIcon>
                            <PinIcon />
                        </HeadIcon>
                        <HeadIcon>
                            <UnpinIcon />
                        </HeadIcon>
                        <HeadIcon>
                            <CloseIcon />
                        </HeadIcon>
                    </div>
                </header>
            </Panel>
        </root.div>
    );
}

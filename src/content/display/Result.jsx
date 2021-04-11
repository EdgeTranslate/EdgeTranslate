/** @jsx h */
import { h, Fragment } from "preact";
import styled from "styled-components";
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
        <Fragment>
            <Source>
                <TextLine>
                    <div class={`${CommonPrefix}may-need-rtl`}>{props.originalText}</div>
                    <StyledEditIcon />
                    <StyledEditDoneIcon />
                </TextLine>
                <PronounceLine>
                    {props.sourcePronouncing ? (
                        <StyledPronounceLoadingIcon />
                    ) : (
                        <StyledPronounceIcon onClick={() => props.setSourcePronounce(true)} />
                    )}
                    <PronounceText class={`${CommonPrefix}may-need-rtl`}>
                        {props.sPronunciation}
                    </PronounceText>
                </PronounceLine>
            </Source>
            <Target>
                <TextLine>
                    <div class={`${CommonPrefix}may-need-rtl`}>{props.mainMeaning}</div>
                    <StyledCopyIcon />
                </TextLine>
                <PronounceLine>
                    {props.targetPronouncing ? (
                        <StyledPronounceLoadingIcon />
                    ) : (
                        <StyledPronounceIcon onClick={() => props.setTargetPronounce(true)} />
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

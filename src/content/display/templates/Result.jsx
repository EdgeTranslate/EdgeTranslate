/** @jsx h */
import { h } from "preact";
import { CommonPrefix } from "./Panel.jsx";
import EditIcon from "../icons/edit.svg";
import PronounceIcon from "../icons/pronounce.svg";
// import CopyIcon from "../icons/copy.svg";

export default function Result(props) {
    return (
        <div id={`${CommonPrefix}result`}>
            <div class="block" id={`${CommonPrefix}original-text`}>
                <div>
                    {props.result.originalText}
                    <EditIcon />
                </div>
                <div className="flex-start">
                    <div>
                        <PronounceIcon />
                    </div>
                    <div>{props.result.tPronunciation}</div>
                </div>
            </div>
        </div>
    );
    //  <OriginalText className="item">
    //     <div className="flex-between">
    //         <div>{props.Result?.originalText}</div>
    //         <div>
    //             <EditIcon />
    //         </div>
    //     </div>
    //     <div className="flex-start">
    //         <div>
    //             <PronounceIcon />
    //         </div>
    //         <div>{props.Result?.tPronunciation}</div>
    //     </div>
    // </OriginalText>
    // <TranslationText className="item">
    //     <div className="flex-between">
    //         <div>{props.Result?.mainMeaning}</div>
    //         <div>
    //             <CopyIcon />
    //         </div>
    //     </div>
    //     <div className="flex-start">
    //         <div>
    //             <PronounceIcon />
    //         </div>
    //         <div>{props.Result?.sPronunciation}</div>
    //     </div>
    // </TranslationText>
}

// const gray = "#919191";
// const PaddingHorizon = "3%";
// const MarginHorizon = "2%";
// const TranslateResult = styled.div`
//     width: 100%;
//     box-sizing: border-box;
//     font-weight: normal;
//     font-size: medium;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;

//     .item {
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         width: calc(100% - 2 * ${MarginHorizon});
//         padding: 0.5rem ${PaddingHorizon};
//         margin: 0.2rem ${MarginHorizon};
//         background-color: rgba(255, 255, 255, 0.9);
//         border-radius: 10px;
//         box-sizing: border-box;
//     }

//     .flex-between {
//         width: 100%;
//         padding: 0.5rem 0;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .flex-start {
//         width: 100%;
//         padding: 0.5rem 0;
//         display: flex;
//         flex-direction: row;
//         justify-content: flex-start;
//         align-items: center;
//     }
// `;

// const TranslationSource = styled.div``;

// const TranslationText = styled.div`
//     svg {
//         fill: ${gray};
//         width: 20px;
//         height: 20px;
//         display: block;
//     }
// `;

// const OriginalText = styled.div`
//     svg {
//         fill: ${gray};
//         width: 20px;
//         height: 20px;
//         display: block;
//     }
// `;

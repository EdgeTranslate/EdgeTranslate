/** @jsx h */
import { h } from "preact";

export default function Error(props) {
    return <div>{props.toString()}</div>;
}

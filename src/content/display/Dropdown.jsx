/** @jsx h */
import { h, cloneElement } from "preact";
import { useState, useRef, useCallback } from "preact/hooks";
import styled from "styled-components";
import ArrowDownIcon from "./icons/arrow-down.svg";

/**
 *
 * @param {{
 *   className?: string;
 *   ref?: Ref<Any>;
 *   title: string; // Menu defaults to display content.
 *   activeKey?: any; // Similar to the value property of select element.
 *   onSelect?: (eventKey: any, event: MouseEvent) => void; // Selected callback function.
 *   onOpen?: ()=>void; // Menu Pop-up callback function
 *   onClose?: ()=>void; // The callback function that the menu closes.
 *   children?: h.JSX.Element;
 * }} props
 * @returns {h.JSX.Element} element
 */
function Dropdown(props) {
    const [open, setOpen] = useState(false);
    const titleElRef = useRef();
    const clickAwayHandler = useCallback((event) => {
        if (!titleElRef.current.contains(event.path[0])) {
            setOpen(false);
            window.removeEventListener("click", clickAwayHandler);
        }
    }, []);
    const Items = props.children.map((child) => {
        return cloneElement(child, {
            active: child.props.eventKey === props.activeKey,
            onSelect: (eventKey, event) => {
                if (eventKey !== props.activeKey) props.onSelect && props.onSelect(eventKey, event);
            },
        });
    });

    return (
        <StyledSelect className={props.className} ref={props.ref}>
            <Title
                ref={titleElRef}
                onClick={() => {
                    if (!open) {
                        window.addEventListener("click", clickAwayHandler);
                        props.onOpen && props.onOpen();
                    } else props.onClose && props.onClose();
                    setOpen(!open);
                }}
            >
                {props.title}
                <ArrowDownIconWrapper>
                    <StyledArrowDownIcon />
                </ArrowDownIconWrapper>
            </Title>
            <Menu open={open}>{Items}</Menu>
        </StyledSelect>
    );
}

/**
 *
 * @param {{
 *   className?: string;
 *   eventKey: any; // The value of the current option.
 *   active: boolean; // Active the current option.
 *   onSelect: (eventKey: any, event: MouseEvent) => void; // Select the callback function for the current option.
 * }} props
 * @returns {h.JSX.Element} element
 */
Dropdown.Item = function DropdownItem(props) {
    return (
        <Item
            className={props.className}
            active={props.active}
            onClick={(event) => {
                props.onSelect && props.onSelect(props.eventKey, event);
            }}
        >
            {props.children}
        </Item>
    );
};
export default Dropdown;

const StyledSelect = styled.div`
    position: relative;
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
`;
const Menu = styled.ul`
    display: ${(props) => (props.open ? "block" : "none")};
    min-width: 120px;
    margin: 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border-radius: 6px;
    padding: 6px 0;
    position: absolute;
    left: 0;
    z-index: 6;
    float: left;
    box-shadow: 0 0 10px rgb(0 0 0 / 6%), 0 4px 4px rgb(0 0 0 / 12%);
`;
const Title = styled.a`
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    outline: 0 !important;
    white-space: nowrap;
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 6px;
    transition: color 0.2s linear, background-color 0.3s linear;
    color: #8e8e93;
    background-color: transparent;
    overflow: hidden;
    &:hover {
        color: #575757;
        background: #e4e4e4;
    }
    &:hover svg {
        fill: #575757;
    }
`;
const ArrowDownIconWrapper = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
`;
const StyledArrowDownIcon = styled(ArrowDownIcon)`
    fill: #8e8e93;
`;
const Item = styled.li`
    display: block;
    padding: 8px 12px;
    clear: both;
    font-weight: 400;
    line-height: 1.4;
    color: ${(props) => (props.isActive ? "#1675e0" : "#575757")};
    white-space: nowrap;
    cursor: pointer;
    -webkit-transition: color 0.3s linear, background-color 0.3s linear;
    transition: color 0.3s linear, background-color 0.3s linear;
    transition: color 0.3s linear, background-color 0.3s linear;
    transition-property: color, background-color;
    transition-duration: 0.3s, 0.3s;
    transition-timing-function: linear, linear;
    transition-delay: 0s, 0s;
    ${(props) =>
        props.active
            ? `
                color: #1675e0;
                font-weight: 700;
                background-color: rgba(242,250,255,.5);
                &:hover {
                    color: #1675e0;
                    background-color: rgba(242,250,255,.5);
                }
            `
            : `
                color: #575757;
                &:hover {
                    color: #575757;
                    background-color: #f2faff;
                }
            `}
`;

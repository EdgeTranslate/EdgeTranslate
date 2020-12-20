/**
 * story book for result panel
 */

/** @jsx h */
import { h } from "preact";
import Panel from "./ResultPanel.jsx";
export default {
    title: "EdgeTranslate/ResultPanel",
    component: Panel,
    argTypes: {
        backgroundColor: { control: "color" },
        onClick: { action: "onClick" },
    },
};

const Template = (args) => <Panel {...args} />;

export const Normal = Template.bind({});

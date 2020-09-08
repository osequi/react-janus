import React from "react";
import Demo from "./Demo";
import ApiDoc from "./Demo.md";

export default {
  component: Demo,
  title: "Demo",
  parameters: { notes: ApiDoc },
};

const Template = (args) => <Demo {...args} />;

export const Default = Template.bind({});

export const CustomSize = Template.bind({});
CustomSize.args = {
  width: "50vw",
  height: "30vh",
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  width: "50vw",
  height: "30vh",
  content1: "This is the underlying layer",
  content2: "This is the top layer",
};

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

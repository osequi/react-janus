import React from "react";
import Demo from "./Demo";
import ApiDoc from "./Demo.md";

export default {
  component: Demo,
  title: "Demo",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Demo />;

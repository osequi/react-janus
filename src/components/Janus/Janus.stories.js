import React from "react";
import Janus from "./Janus";
import ApiDoc from "./Janus.md";

export default {
  component: Janus,
  title: "Janus",
  parameters: { notes: ApiDoc },
};

const Template = (args) => <Janus {...args} />;

export const Default = Template.bind({});

export const CustomSize = Template.bind({});
CustomSize.args = {
  width: "50vw",
  height: "30vh",
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  content1: "This is the underlying layer",
  content2: "This is the top layer",
};

export const CustomCursor = Template.bind({});
CustomCursor.args = {
  cursor: "pointer",
};

export const DisableClick = Template.bind({});
DisableClick.args = {
  content1: (
    <>
      <p>
        The click event starting/stopping the mouse drag effect is now disabled.
      </p>
      <p>You can click anywhere and the mouse drag effect won't be disabled.</p>
    </>
  ),
  content2: (
    <>
      <p>
        The click event starting/stopping the mouse drag effect is now disabled.
      </p>
      <p>You can click anywhere and the mouse drag effect won't be disabled.</p>
    </>
  ),
  disableEffectOnClick: false,
};

export const CustomClickableContent = Template.bind({});
CustomClickableContent.args = {
  content1: (
    <>
      <p>Content</p>
      <p>Contains clickable elements</p>
      <p>
        Click anywhere on a blank spot to stop the mouse drag effect then click
        one of these elements
      </p>
      <p>
        <button id="#button">button</button>
      </p>
      <p>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Inline link
        </a>
      </p>
    </>
  ),
  content2: (
    <>
      <p>Content</p>
      <p>Contains clickable elements</p>
      <p>
        Click anywhere on a blank spot to stop the mouse drag effect then click
        one of these elements
      </p>
      <p>
        <button id="#button">button</button>
      </p>
      <p>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          Inline link
        </a>
      </p>
    </>
  ),
};

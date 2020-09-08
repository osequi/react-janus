import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * The width of the component
   * @type {string}
   */
  width: PropTypes.string,
  /**
   * The height of the component
   * @type {string}
   */
  height: PropTypes.string,
  /**
   * The content of the underlying layer
   * @type {any}
   */
  content1: PropTypes.any,
  /**
   * The content of the top layer
   * @type {any}
   */
  content2: PropTypes.any,
  /**
   * The class name of the underlying layer
   * @type {string}
   */
  content1Classname: PropTypes.string,
  /**
   * The class name of the top layer
   * @type {string}
   */
  content2Classname: PropTypes.string,
  /**
   * The shape of the cursor
   * @type {any}
   */
  cursor: PropTypes.any,
  /**
   * On click the effect can be disabled / enabled.
   * This comes handy when the user wants to interact with another element.
   * @type {boolean}
   */
  disableEffectOnClick: PropTypes.bool,
};

/**
 * Defines the default props
 */
const defaultProps = {
  width: "100vw",
  height: "100vh",
  content1:
    "Content1. Click anywhere to stop the mouse drag effect. Then click again to re-enable the effect.",
  content2:
    "Content2. Click anywhere to stop the mouse drag effect. Then click again to re-enable the effect.",
  content1Classname: "Content1",
  content2Classname: "Content2",
  cursor: "col-resize",
  disableEffectOnClick: true,
};

/**
 * Defines the styles
 */
const GlobalStyle = createGlobalStyle`
   body {
     margin: 0
   }
 `;

const Container = styled("section")((props) => ({
  width: `${props.width}`,
  height: `${props.height}`,
  position: "relative",
  overflowX: "hidden",
  cursor: props.enabled ? `${props.cursor}` : "auto",
}));

const Content1 = styled("article")((props) => ({
  width: `${props.width}`,
  height: `${props.height}`,
  position: "absolute",
  top: 0,
  left: 0,
}));

/**
 * Optimized version
 * - suggested by the console
 */
const Content2 = styled.article.attrs((props) => ({
  style: {
    left: `${props.mouseX}px`,
    width: `${props.width}`,
    height: `${props.height}`,
  },
}))`
  position: absolute;
  top: 0;
  color: white;
  background: black;
`;

/**
 * Displays the component
 */
const Demo = (props) => {
  const {
    content1,
    content2,
    content1Classname,
    content2Classname,
    disableEffectOnClick,
    ...rest
  } = props;

  /**
   * Manages the state of the effect
   * @type {boolean}
   */
  const [enabled, setEnabled] = useState(true);

  /**
   * Handles the click event
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleOnClick = (event) => {
    /**
     * The click can be enabled / disabled by props
     */
    if (!disableEffectOnClick) return;

    const { target } = event;
    const { classList } = target;
    const { value } = classList;

    /**
     * The click is handled only when it happens on a blank space.
     * When the user clicks on a button, link etc the click is not handled.
     */
    const clickMustBeHandled =
      (value && value.includes(content1Classname)) ||
      value.includes(content2Classname);

    if (!clickMustBeHandled) return;

    setEnabled(!enabled);
  };

  /**
   * Manages the horizontal position of the cursor
   * @type {integer}
   */
  const [mouseX, setMouseX] = useState(0);

  /**
   * Handles the cursor move
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleMouseMove = (event) => {
    /**
     * The effect works only when it's enabled
     */
    if (!enabled) return;

    const { clientX } = event;
    setMouseX(clientX);
  };

  return (
    <>
      <GlobalStyle />
      <Container
        className="Demo"
        onMouseMove={handleMouseMove}
        onClick={handleOnClick}
        enabled={enabled}
        {...rest}
      >
        <Content1 className="Content1" mouseX={mouseX} {...rest}>
          {content1}
        </Content1>
        <Content2 className="Content2" mouseX={mouseX} {...rest}>
          {content2}
        </Content2>
      </Container>
    </>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

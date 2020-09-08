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
};

/**
 * Defines the default props
 */
const defaultProps = {
  width: "100vw",
  height: "100vh",
  content1: "Content1",
  content2: "Content2",
  content1Classname: "Content1",
  content2Classname: "Content2",
  cursor: "col-resize",
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
    ...rest
  } = props;

  /**
   * Switches on/off the mouse event
   * @type {boolean}
   */
  const [enabled, setEnabled] = useState(true);

  /**
   * Handles the click event
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleOnClick = (event) => {
    const { target } = event;
    const { classList } = target;
    const { value } = classList;
    console.log("target:", value);

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

  const handleMouseMove = (event) => {
    if (!enabled) return;

    const { clientX } = event;
    setMouseX(clientX);
  };

  const contentWithClickableElement = (
    <>
      <p>Content</p>
      <p>
        <button>button</button>
      </p>
      <p>
        <a href="#">Inline link</a>
      </p>
    </>
  );

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
          {contentWithClickableElement}
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

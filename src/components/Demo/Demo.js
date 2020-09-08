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
  cursor: `${props.cursor}`,
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
  const { content1, content2, ...rest } = props;

  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (event) => {
    const { clientX } = event;
    setMouseX(clientX);
  };

  return (
    <>
      <GlobalStyle />
      <Container className="Demo" onMouseMove={handleMouseMove} {...rest}>
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

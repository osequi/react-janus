import React from "react";
import PropTypes from "prop-types";
import styled, { css, createGlobalStyle } from "styled-components";

/**
 * Imports other components and hooks
 */
import Janus, { JanusPropTypes, JanusDefaultProps } from "../Janus";

/**
 * Defines the prop types
 */
const propTypes = {
  janus: PropTypes.shape(JanusPropTypes),
};

/**
 * Defines the default props
 */
const defaultProps = {
  janus: JanusDefaultProps,
};

/**
 * Defines the styles
 */
const GlobalStyle = createGlobalStyle`
   body {
     margin: 0
   }
 `;

/**
 * Defines the content1 styles
 */
const Content1 = css((props) => ({
  width: "100vw",
  height: "100vh",
  padding: "1em",
  fontFamily: "monospace",
  fontSize: "150%",
}));

/**
 * Defines the content2 styles
 */
const Content2 = css((props) => ({
  width: "100vw",
  height: "100vh",
  padding: "1em",
  fontFamily: "monospace",
  fontSize: "150%",
  background: "black",
  color: "white",
}));

/**
 * Displays the component
 */
const Demo = (props) => {
  const { janus } = props;

  return (
    <>
      <GlobalStyle />
      <Janus {...janus} content1Style={Content1} content2Style={Content2} />
    </>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

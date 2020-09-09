import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";

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
const Content1 = styled("article")((props) => ({
  width: "100vw",
  height: "100vh",
  padding: "1em",
  fontFamily: "monospace",
  fontSize: "150%",
}));

/**
 * Defines the content2 styles
 */
const Content2 = styled("article")((props) => ({
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
  const { content1, content2 } = janus;

  const content1Styled = <Content1>{content1}</Content1>;
  const content2Styled = <Content2>{content2}</Content2>;

  return (
    <>
      <GlobalStyle />
      <Janus {...janus} content1={content1Styled} content2={content2Styled} />
    </>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

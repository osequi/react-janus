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
 * Defines the content styles
 */
const ContentStyle = styled("div")((props) => ({
  padding: "1em",
  fontFamily: "monospace",
  fontSize: "150%",
}));

/**
 * Displays the component
 */
const Demo = (props) => {
  const { janus } = props;
  const { content1, content2 } = janus;

  const Content1 = <ContentStyle>{content1}</ContentStyle>;
  const Content2 = <ContentStyle>{content2}</ContentStyle>;

  return (
    <>
      <GlobalStyle />
      <Janus {...janus} content1={Content1} content2={Content2} />
    </>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

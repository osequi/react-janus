import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

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
 * Displays the component
 */
const Demo = (props) => {
  const { janus } = props;

  return (
    <>
      <GlobalStyle />
      <Janus {...janus} />
    </>
  );
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

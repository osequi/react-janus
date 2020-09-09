import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
   * On double click the effect can be disabled / enabled.
   * This comes handy when the user wants to interact with another element.
   * @type {boolean}
   */
  disableEffectOnDoubleClick: PropTypes.bool,
};

/**
 * Defines the default props
 */
const defaultProps = {
  width: "100vw",
  height: "100vh",
  content1:
    "Content1. Double click anywhere to stop the mouse drag effect. Then double click again to re-enable the effect.",
  content2:
    "Content2. Double click anywhere to stop the mouse drag effect. Then double click again to re-enable the effect.",
  content1Classname: "Content1",
  content2Classname: "Content2",
  cursor: "col-resize",
  disableEffectOnDoubleClick: true,
};

const Container = styled("section")((props) => ({
  width: `${props.width}`,
  height: `${props.height}`,
  position: "relative",
  overflowX: "hidden",
  cursor: props.enabled ? `${props.cursor}` : "auto",
}));

const Content1 = styled("section")((props) => ({
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
const Content2 = styled.section.attrs((props) => ({
  style: {
    left: `${props.mouseX}px`,
    width: `${props.width}`,
    height: `${props.height}`,
  },
}))`
  position: absolute;
  top: 0;
`;

/**
 * Displays the component
 */
const Janus = (props) => {
  const {
    content1,
    content2,
    content1Classname,
    content2Classname,
    disableEffectOnDoubleClick,
    ...rest
  } = props;

  /**
   * Manages the state of the effect
   * @type {boolean}
   */
  const [enabled, setEnabled] = useState(true);

  /**
   * Handles the souble click event
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleOnDoubleClick = (event) => {
    /**
     * The double click can be enabled / disabled by props
     */
    if (!disableEffectOnDoubleClick) return;

    const { target } = event;
    const { classList } = target;
    const { value } = classList;

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

  console.log("enabled:", enabled);

  return (
    <Container
      className="Janus"
      onMouseMove={handleMouseMove}
      onDoubleClick={handleOnDoubleClick}
      enabled={enabled}
      {...rest}
    >
      <Content1 className={content1Classname} mouseX={mouseX} {...rest}>
        {content1}
      </Content1>
      <Content2 className={content2Classname} mouseX={mouseX} {...rest}>
        {content2}
      </Content2>
    </Container>
  );
};

Janus.propTypes = propTypes;
Janus.defaultProps = defaultProps;

export default Janus;
export { propTypes as JanusPropTypes, defaultProps as JanusDefaultProps };

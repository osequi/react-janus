import React, { useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

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
   * The style of the underlying layer
   * @type {any}
   */
  content1Style: PropTypes.any,
  /**
   * The style of the top layer
   * @type {any}
   */
  content2Style: PropTypes.any,
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
  content1Style: css({
    background: "red",
    color: "white",
    padding: "1em",
    fontFamily: "monospace",
    fontSize: "150%",
  }),
  content2Style: css({
    background: "black",
    color: "white",
    padding: "1em",
    fontFamily: "monospace",
    fontSize: "150%",
  }),
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

/**
 * // NOTE: Can't add `content1Style` with object notation
 */
const Content1 = styled("section")`
  ${(props) => props.content1Style};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: 0;
  left: 0;
`;

/**
 * Optimized version
 * - suggested by the console
 */
const Content2 = styled.section.attrs((props) => ({
  style: {
    left: `${props.mouseX}px`,
  },
}))`
  ${(props) => props.content2Style};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: absolute;
  top: 0;
`;

/**
 * Displays the component
 */
const Janus = (props) => {
  const {
    width,
    height,
    content1,
    content2,
    content1Style,
    content2Style,
    cursor,
    disableEffectOnDoubleClick,
  } = props;

  /**
   * Manages the state of the effect
   * @type {boolean}
   */
  const [enabled, setEnabled] = useState(true);

  /**
   * Handles the double click event
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleOnDoubleClick = () => {
    /**
     * The double click can be enabled / disabled by props
     */
    if (!disableEffectOnDoubleClick) return;

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

  /**
   * Handles the touch move
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleTouchMove = (event) => {
    /**
     * The effect works only when it's enabled
     */
    if (!enabled) return;

    const { touches } = event;
    const { clientX } = touches[0];
    setMouseX(clientX);
  };

  return (
    <Container
      className="Janus"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onDoubleClick={handleOnDoubleClick}
      width={width}
      height={height}
      cursor={cursor}
      enabled={enabled}
    >
      <Content1
        className="JanusContent1"
        content1Style={content1Style}
        width={width}
        height={height}
      >
        {content1}
      </Content1>
      <Content2
        className="JanusContent2"
        content2Style={content2Style}
        width={width}
        height={height}
        mouseX={mouseX}
      >
        {content2}
      </Content2>
    </Container>
  );
};

Janus.propTypes = propTypes;
Janus.defaultProps = defaultProps;

export default Janus;
export { propTypes as JanusPropTypes, defaultProps as JanusDefaultProps };

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { useSpring, animated } from "react-spring";

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
  /**
   * A short usage message can be displayed after the page load
   * @type {boolean}
   */
  displayUsageOnStart: PropTypes.bool,
  /**
   * The usage message displayed after page load
   * @type {any}
   */
  usageMessage: PropTypes.any,
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
  displayUsageOnStart: true,
  usageMessage: "Double click to disable / enable drag",
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

const Usage = styled("section")((props) => ({
  width: "100%",
  position: "absolute",
  zIndex: 100,
  bottom: "1em",
  display: props.usageDisplayed ? "flex" : "none",
  justifyContent: "center",
}));

const Message = styled("div")((props) => ({
  background: "white",
  padding: "1em",
}));

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
    displayUsageOnStart,
    usageMessage,
  } = props;

  /**
   * Manages the state of the effect
   * @type {boolean}
   */
  const [enabled, setEnabled] = useState(true);

  /**
   * Manages the state of the usage message
   * @type {boolean}
   */
  const [usageDisplayed, setUsageDisplayed] = useState(displayUsageOnStart);

  /**
   * Handles the double click event
   * @param  {SyntheticEvent} event The event
   * @return null
   */
  const handleOnDoubleClick = () => {
    /**
     * On the first double click the usage message goes hidden
     */
    setUsageDisplayed(false);

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

  /**
   * Displays the usage message on load
   */
  useEffect(() => {
    if (!displayUsageOnStart) return;

    const timer = setTimeout(() => {
      setUsageDisplayed(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const a = useSpring({ opacity: 0, from: { opacity: 1 } });

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
      <Usage className="Usage" usageDisplayed={usageDisplayed}>
        <Message>
          <animated.div style={a}>{usageMessage}</animated.div>
        </Message>
      </Usage>
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

import React from "react";
import PropTypes from "prop-types";
import styled, {createGlobalStyle} from 'styled-components'

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Defines the styles
 */

 const GlobalStyle = createGlobalStyle`
   body {
     margin: 0
   }
 `

const Container = styled('section')((props) => ({
	width: '100vw',
	height: '100vh',
	position: 'relative'
}));

const Content1 = styled('article')((props) => ({
	width: '100vw',
	height: '100vh',
	position: 'absolute',
	top: 0,
	left: 0
}));

const Content2 = styled('article')((props) => ({
	width: '100vw',
	height: '100vh',
	position: 'absolute',
	top: 0,
	left: 0,
	color: 'white',
	background: 'black'
}));


/**
 * Displays the component
 */
const Demo = props => {
  return <Container className="Demo"><GlobalStyle/><Content1>Content1</Content1><Content2>Content2</Content2></Container>;
};

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default Demo;
export { propTypes as DemoPropTypes, defaultProps as DemoDefaultProps };

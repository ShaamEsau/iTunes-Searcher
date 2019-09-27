import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import {shallow, mount} from "enzyme";
import App from './App';
import Search from "./Components/search.js"

/* Initializes a test using the code incased in it  */
it('SnapShot', () => {
	/* Sets a variable of a rendered component */
	const component = renderer.create(<Search/>);
	/* Converts information to JSON */
	let tree = component.toJSON();
	/* Checks is the rendered component matches the snapshot */
	expect(tree).toMatchSnapshot();
});
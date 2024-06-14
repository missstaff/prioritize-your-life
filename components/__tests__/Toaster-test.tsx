import * as React from "react";
import renderer from "react-test-renderer";
import Toaster from "../Toaster";

it(`renders correctly`, () => {
    const tree = renderer.create(<Toaster type="success" text1="Hello" text2="World" title="Click me" />).toJSON();

    expect(tree).toMatchSnapshot();
});
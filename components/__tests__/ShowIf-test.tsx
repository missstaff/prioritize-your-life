import * as React from "react";
import renderer from "react-test-renderer"
import ShowIf from "../ShowIf"

it(`renders correctly`, () => {
    const tree = renderer.create(<ShowIf condition={true} render={<div>Rendered</div>} renderElse={null} />).toJSON();

    expect(tree).toMatchSnapshot();
});
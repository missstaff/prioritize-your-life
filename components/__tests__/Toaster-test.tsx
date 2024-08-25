import renderer from "react-test-renderer";
import Toaster from "../Toaster";

it("displays error toaster", () => {
  const tree = renderer
    .create(
      <Toaster type="error" text1="Hello" text2="World" title="Click me" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("displays info toaster", () => {
  const tree = renderer
    .create(
      <Toaster type="info" text1="Hello" text2="World" title="Click me" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("displays warning toaster", () => {
  const tree = renderer
    .create(
      <Toaster type="warning" text1="Hello" text2="World" title="Click me" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("displays success toaster without text2", () => {
  const tree = renderer
    .create(<Toaster type="success" text1="Hello" title="Click me" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("displays toaster without text2", () => {
  const tree = renderer
    .create(<Toaster type="success" text1="Hello" title="Click me" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

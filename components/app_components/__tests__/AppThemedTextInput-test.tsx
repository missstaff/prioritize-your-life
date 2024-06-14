import * as React from 'react';
import renderer from 'react-test-renderer';
import {AppThemedTextInput} from '../AppThemedTextInput';

it(`renders correctly`, () => {
  const tree = renderer.create(
    <AppThemedTextInput
      placeholder="Snapshot test!"
      secureEntry={false}
      value=""
      checkValue={() => {}}
      setValue={() => {}}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
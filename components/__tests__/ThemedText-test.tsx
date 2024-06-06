import * as React from 'react';
import renderer from 'react-test-renderer';

import { AppThemedText } from '../app_components/AppThemedText';

it(`renders correctly`, () => {
  const tree = renderer.create(<AppThemedText>Snapshot test!</AppThemedText>).toJSON();

  expect(tree).toMatchSnapshot();
});

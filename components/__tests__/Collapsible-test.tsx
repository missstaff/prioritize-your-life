import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { Collapsible } from '../Collapsible';

describe('Collapsible', () => {
  it('renders correctly (snapshot test)', () => {
    const tree = renderer.create(<Collapsible title="title">Content</Collapsible>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('toggles open and close when header is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <Collapsible title="title">Content</Collapsible>
    );

    // Initially content should not be visible
    expect(queryByTestId('collapsible-content')).toBeNull();

    // Simulate pressing the header
    fireEvent.press(getByTestId('collapsible-header'));

    // Content should be visible
    expect(queryByTestId('collapsible-content')).not.toBeNull();

    // Simulate pressing the header again
    fireEvent.press(getByTestId('collapsible-header'));

    // Content should be hidden again
    expect(queryByTestId('collapsible-content')).toBeNull();
  });
});

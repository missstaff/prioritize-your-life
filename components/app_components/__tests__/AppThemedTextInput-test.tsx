import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { AppThemedTextInput } from '../AppThemedTextInput'; 
import { useThemeColor } from '@/hooks/useThemeColor';
import { AppIcon } from '../AppIcon';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));
jest.mock('../AppIcon', () => ({
  AppIcon: jest.fn(() => null),
}));

describe('AppThemedTextInput', () => {
  const mockTextColor = '#000';
  const mockBackgroundColor = '#fff';
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  beforeEach(() => {
    (useThemeColor as jest.Mock).mockImplementation((colors, key) => {
      return key === 'text' ? mockTextColor : mockBackgroundColor;
    });
  });

  it('renders correctly and matches snapshot', () => {
    const { toJSON } = render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the placeholder text', () => {
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('handles text input changes', () => {
    const mockSetValue = jest.fn();
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={mockSetValue}
        checkValue={() => {}}
      />
    );
    fireEvent.changeText(screen.getByPlaceholderText('Enter text'), 'New text');
    expect(mockSetValue).toHaveBeenCalledWith('New text');
  });

  it('calls checkValue on blur if value is not empty', () => {
    const mockCheckValue = jest.fn();
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value="Some value"
        setValue={() => {}}
        checkValue={mockCheckValue}
      />
    );
    fireEvent(screen.getByPlaceholderText('Enter text'), 'blur');
    expect(mockCheckValue).toHaveBeenCalledWith('Some value');
  });

  it('toggles password visibility when eye icon is pressed', () => {
    const { getByTestId } = render(
      <AppThemedTextInput
        placeholder="Password"
        secureEntry={true}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    // Initially, the icon should be "eye-off"
    expect(getByTestId('passwordVisibilityToggle')).toBeTruthy();
    fireEvent.press(getByTestId('passwordVisibilityToggle'));
    // After pressing, the icon should toggle to "eye"
    expect(AppIcon).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'eye' }),
      expect.anything()
    );
  });

  it('renders an icon if iconName prop is provided', () => {
    render(
      <AppThemedTextInput
        iconName="search"
        placeholder="Search"
        secureEntry={false}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    expect(AppIcon).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'search' }),
      expect.anything()
    );
  });
});

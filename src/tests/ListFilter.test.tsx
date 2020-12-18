import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListFilter from '../components/ListFilter';

test('renders checkboxes and checks disabling in  case of unactive api endpoints', () => {
  const props =
  {
    types: [ 'sports', 'fashion'],
    active: ['sports', 'fashion'],
    selected: ['sports', 'fashion'],
    select: () => {}
  }

  let { rerender } = render(<ListFilter {...props} />);
  disabledTest(false);
  props.active = [];
  rerender(<ListFilter {...props} />);
  disabledTest(true);
  
  function disabledTest(expectedValue: boolean) {
    const checkboxes = screen.queryAllByRole('checkbox') as Array<HTMLInputElement>;
    expect(checkboxes.length).toEqual(props.types.length);
    checkboxes.forEach(element => {
      expect(element.disabled).toEqual(expectedValue);
    });
  }
});

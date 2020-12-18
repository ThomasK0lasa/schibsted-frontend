import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListSort from '../components/ListSort';
import sortDownSVG from '../assets/gfx/sort_down.svg';

test('checking img changing in button after click', () => {
  render(<ListSort sort={() => {}}/>);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const img = screen.getByRole('img') as HTMLImageElement;
  const array = img.src.split('/');
  const imgFile = array[array.length -1];
  expect(imgFile).toEqual(sortDownSVG);
});

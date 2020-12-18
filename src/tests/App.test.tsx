import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders main', () => {
  render(<App />);
  const linkElement = screen.getByText(/News Previews/i);
  expect(linkElement).toBeInTheDocument();
});

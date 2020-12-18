import { render, screen } from '@testing-library/react';
import List from '../components/List';

test('renders main', () => {
  render(<List />);
  const linkElement = screen.getByRole('main');
  expect(linkElement).toBeInTheDocument();
});

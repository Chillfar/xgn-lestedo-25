import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameDashboard from './App';

test('renders learn react link', () => {
  render(<GameDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeDefined();
});

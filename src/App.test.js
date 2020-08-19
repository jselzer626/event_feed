import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const trendingHeader = getByText(/Trending/i);
  expect(trendingHeader).toBeInTheDocument();
});

test('renders a top news category header', () => {
  const { getByText } = render(<App />);
  const trendingHeader = getByText(/Top News/i);
  expect(trendingHeader).toBeInTheDocument();
});

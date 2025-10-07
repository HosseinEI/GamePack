import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/Home';
import axiosClient from '../src/api/axiosClient';

// Mock the axios client
jest.mock('../src/api/axiosClient');
const mockedAxios = axiosClient as jest.Mocked<typeof axiosClient>;

const mockArticles = {
  results: [{ slug: 'article-1', title: 'First Article' }],
};
const mockReviews = {
  results: [{ id: 1, game_title: 'Cool Game Review', reviewer: { username: 'rev' } }],
};
const mockAds = [{ id: 1, title: 'Ad 1' }];

test('Home page fetches and displays data correctly', async () => {
  mockedAxios.get.mockImplementation((url) => {
    if (url.includes('/articles')) return Promise.resolve({ data: mockArticles });
    if (url.includes('/reviews')) return Promise.resolve({ data: mockReviews });
    if (url.includes('/ads')) return Promise.resolve({ data: mockAds });
    return Promise.reject(new Error('not found'));
  });
  
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // Wait for the data to be loaded and displayed
  await waitFor(() => {
    expect(screen.getByText('First Article')).toBeInTheDocument();
    expect(screen.getByText('Cool Game Review')).toBeInTheDocument();
    // Check for a heading related to ads/sponsored content
    expect(screen.getByText('Sponsored')).toBeInTheDocument();
  });
});
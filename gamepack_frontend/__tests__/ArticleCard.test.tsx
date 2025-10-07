import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from '../src/components/ArticleCard';
import { Article } from '../src/types';

const mockArticle: Partial<Article> = {
  slug: 'test-article',
  title: 'Epic New Game Released',
  image: 'test.jpg',
  category: { id: 1, name: 'News', slug: 'news' },
  author: { id: 1, username: 'tester', email: '', role: 'READER' },
  published_at: '2025-10-21T10:00:00Z',
};

test('renders ArticleCard with correct data', () => {
  render(
    <BrowserRouter>
      <ArticleCard article={mockArticle} />
    </BrowserRouter>
  );

  // Check if title, author, and category are rendered
  expect(screen.getByText('Epic New Game Released')).toBeInTheDocument();
  expect(screen.getByText(/By tester/i)).toBeInTheDocument();
  expect(screen.getByText('News')).toBeInTheDocument();
});
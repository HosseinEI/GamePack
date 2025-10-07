import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosClient.get('/articles/');
        setArticles(response.data.results);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">All News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {/* TODO: Add Pagination Controls */}
    </div>
  );
};

export default Articles;
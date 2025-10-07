import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Article } from '../types';
import Loader from '../components/Loader';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosClient.get(`/articles/${slug}/`);
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <Loader />;
  if (!article) return <p className="text-center text-accent">Article not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center space-x-4 text-text-muted mb-4">
        <span>By {article.author.username}</span>
        <span>&bull;</span>
        <span>{new Date(article.published_at).toLocaleDateString()}</span>
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">{article.category.name}</span>
      </div>
      <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-8" />
      <div className="prose prose-invert max-w-none prose-lg" dangerouslySetInnerHTML={{ __html: article.content }} />

      {/* Comments Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Comments ({article.comments.length})</h2>
        {/* TODO: Add comment form for authenticated users */}
        <div className="space-y-6">
          {article.comments.map(comment => (
            <div key={comment.id} className="bg-light-gray p-4 rounded-lg">
              <p className="font-semibold text-white">{comment.user.username}</p>
              <p className="text-text-main">{comment.content}</p>
              <p className="text-xs text-text-muted mt-2">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
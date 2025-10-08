import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Article, Comment } from '../types';
import Loader from '../components/Loader';
import { useAuthStore } from '../store/authStore';



const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError('');
    setCommentSubmitting(true);

    if (!newCommentContent.trim() || !article) {
      setCommentError('Comment cannot be empty.');
      setCommentSubmitting(false);
      return;
    }

    try {
      const response = await axiosClient.post(`/articles/${article.slug}/comments/`, {
        content: newCommentContent,
      });

      const submittedComment: Comment = response.data;

      setArticle(prevArticle => {
            if (!prevArticle) return null;
            return {
                ...prevArticle,
                // Add the new comment to the list
                comments: [submittedComment, ...prevArticle.comments] 
            };
      });

      setNewCommentContent(''); // Clear the input field
    } catch (error: any) {
      // Display a more specific error if available
      const errorMsg = error.response?.data?.detail || 'Failed to post comment. Are you logged in?';
      setCommentError(errorMsg);
      console.error("Comment submission failed:", error);
    } finally {
      setCommentSubmitting(false);
    }
  };

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
        {/* The Comment Submission Form (NEW CODE) */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-dark rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Post a Comment</h3>
            {commentError && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4">{commentError}</p>}
            <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full bg-dark p-3 rounded border border-gray-600 focus:outline-none focus:border-primary min-h-[100px]"
              placeholder="Write your comment here..."
              disabled={commentSubmitting}
            />
            <button
              type="submit"
              className="mt-3 bg-primary text-white py-2 px-6 rounded font-bold hover:bg-purple-700 transition-colors disabled:bg-primary/50"
              disabled={commentSubmitting || !newCommentContent.trim()}
            >
              {commentSubmitting ? 'Posting...' : 'Submit Comment'}
            </button>
          </form>
        ) : (
          <p className="text-center text-text-muted mb-8 p-4 bg-dark rounded-lg">
            Please <a href="/login" className="text-primary hover:underline">log in</a> to post a comment.
          </p>
        )}

        {/* Display Existing Comments */}
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
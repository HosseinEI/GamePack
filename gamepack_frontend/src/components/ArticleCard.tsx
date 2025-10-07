import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Partial<Article>; // Use partial for list view
}

const ArticleCard = ({ article }: ArticleCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-light-gray rounded-lg overflow-hidden shadow-lg"
  >
    <Link to={`/articles/${article.slug}`}>
      <img
        src={article.image || 'https://via.placeholder.com/400x225'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-semibold text-primary uppercase">
          {article.category?.name || 'News'}
        </span>
        <h3 className="text-lg font-bold mt-1 text-white">{article.title}</h3>
        <p className="text-text-muted text-sm mt-2">
          By {article.author?.username || 'Admin'} on {new Date(article.published_at!).toLocaleDateString()}
        </p>
      </div>
    </Link>
  </motion.div>
);

export default ArticleCard;
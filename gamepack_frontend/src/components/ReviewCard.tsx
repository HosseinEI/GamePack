import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-light-gray rounded-lg overflow-hidden shadow-lg relative"
  >
    <div className="absolute top-2 right-2 bg-accent/90 text-white font-bold text-lg px-3 py-1 rounded-full flex items-center gap-1">
      {review.rating} <Star size={16} />
    </div>
    <Link to={`/reviews/${review.id}`}>
      <img
        src={review.image || 'https://via.placeholder.com/400x225'}
        alt={review.game_title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{review.game_title}</h3>
        <p className="text-text-muted text-sm mt-2">
          Reviewed by {review.reviewer.username}
        </p>
      </div>
    </Link>
  </motion.div>
);

export default ReviewCard;
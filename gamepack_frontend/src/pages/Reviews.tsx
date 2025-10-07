// src/pages/Reviews.tsx
// ... (similar to Articles.tsx but fetches /reviews/ and uses ReviewCard)
import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Review } from '../types';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/reviews/')
      .then(res => setReviews(res.data.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Game Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
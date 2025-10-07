import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Article, Review, Ad } from '../types';
import ArticleCard from '../components/ArticleCard';
import ReviewCard from '../components/ReviewCard';
import AdBanner from '../components/AdBanner';
import Loader from '../components/Loader';
import HeroImage from '../assets/images/hero.jpg';

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, reviewsRes, adsRes] = await Promise.all([
          axiosClient.get('/articles/?limit=6'),
          axiosClient.get('/reviews/?limit=4'),
          axiosClient.get('/ads/'),
        ]);
        setArticles(articlesRes.data.results);
        setReviews(reviewsRes.data.results);
        setAds(adsRes.data);
      } catch (error) {
        console.error("Failed to fetch home page data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <img src={HeroImage} alt="Featured Game" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">The Pulse of Gaming</h1>
          <p className="text-xl text-text-main">Your ultimate source for news, reviews, and insights.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Articles */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-4 border-b-4 border-primary pb-2">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <h2 className="text-3xl font-bold mb-4 border-b-4 border-secondary pb-2">Top Reviews</h2>
          <div className="space-y-4">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Sponsored</h3>
            {ads.map(ad => (
              <AdBanner key={ad.id} ad={ad} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
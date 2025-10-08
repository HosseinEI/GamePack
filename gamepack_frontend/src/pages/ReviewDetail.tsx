import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Review, Comment } from '../types';
import Loader from '../components/Loader';
import { useAuthStore } from '../store/authStore';

const BASE_URL = "http://localhost:8000";

const StarRating = ({ score }: { score: number }) => {
    // Round score to nearest 0.5 for visual representation
    const roundedScore = Math.round(score * 2) / 2;
    const fullStars = Math.floor(roundedScore);
    const hasHalfStar = roundedScore % 1 !== 0;
    const emptyStars = 10 - Math.ceil(roundedScore);

    const activeStarColor = "text-white"; 
    const emptyStarColor = "text-gray-600";

    return (
        <div className="flex items-center space-x-0.5 text-2xl">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className={activeStarColor}>★</span> // Full star
            ))}
            {/* 2. Half Star (The Fix) */}
            {hasHalfStar && (
                <span className="relative">
                    {/* Background Empty Star (Right Half) */}
                    <span className={emptyStarColor}>★</span> 
                    
                    {/* Foreground Half-Star (Left Half) - Uses white color with a clip-path */}
                    <span 
                        className={`absolute top-0 left-0 overflow-hidden ${activeStarColor}`} 
                        style={{ clipPath: 'inset(0 50% 0 0)' }} // Clips to the left 50%
                    >
                        ★
                    </span>
                </span>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className={emptyStarColor}>★</span> // Empty star
            ))}
        </div>
    );
};


const ReviewDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);

    const [newCommentContent, setNewCommentContent] = useState('');
    const [commentError, setCommentError] = useState('');
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);
        axiosClient.get(`/reviews/${id}/`)
            .then(response => {
                setReview(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch review detail:", error);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCommentError('');
        setCommentSubmitting(true);

        if (!newCommentContent.trim() || !review) {
            setCommentError('Comment cannot be empty.');
            setCommentSubmitting(false);
            return;
        }

        try {
            const response = await axiosClient.post<Comment>(`/reviews/${review.id}/comments/`, {
                content: newCommentContent,
            });

            const submittedComment: Comment = response.data;

            setReview(prevReview => {
                if (!prevReview) return null;
                const currentComments = prevReview.comments || []; 
            
            return {
                ...prevReview,
                comments: [submittedComment, ...currentComments] 
            };
            });

            setNewCommentContent(''); 
        } catch (error: any) {
            const errorMsg = error.response?.data?.detail || 'Failed to post comment. Are you logged in?';
            setCommentError(errorMsg);
            console.error("Comment submission failed:", error);
        } finally {
            setCommentSubmitting(false);
        }
    };

    if (loading) return <Loader />;

    if (!review) return (
        <div className="container mx-auto py-12 text-center">
            <h1 className="text-4xl text-text-main font-bold">Review Not Found</h1>
            <p className="text-gray-500 mt-2">The requested review could not be loaded.</p>
        </div>
    );

    const score = parseFloat(review.rating as unknown as string);
    const displayScore = isNaN(score) ? 0 : score;

    const imageUrl = review.image ?
        (review.image.startsWith('http') ? review.image : `${BASE_URL}${review.image}`) :
        'https://placehold.co/1200x500/1F2937/FFFFFF?text=No+Cover+Image';

    return (
        <div className="container mx-auto py-8">
            {/* Header Area */}
            <div className="mb-8">
                {/* 🎯 Distinction: Prominent Review Score Section */}
                <div className="flex justify-between items-start mb-4 border-b pb-4 border-gray-700">
                    <div>
                        <h1 className="text-5xl font-extrabold text-text-main leading-tight">{review.game_title}</h1>
                        <p className="text-lg text-gray-400 mt-2">
                            A deep dive analysis by <span className="text-secondary-light font-semibold">{review.reviewer.username}</span>
                        </p>
                    </div>

                    {/* Score Bubble */}
                    <div className="text-center p-5 rounded-full bg-secondary-dark border-4 border-secondary-light shadow-xl min-w-[150px]">
                        <p className="text-sm font-semibold text-secondary-light">SCORE</p>
                        <p className="text-5xl font-black text-white">{displayScore.toFixed(1)}</p>
                        <StarRating score={displayScore} />
                    </div>
                </div>

                <p className="text-sm text-gray-500">
                    Published on: {new Date(review.published_at).toLocaleDateString()}
                </p>
            </div>

            {/* Featured Image */}
            <div className="w-full mb-8 rounded-xl overflow-hidden shadow-2xl">
                <img
                    src={imageUrl}
                    alt={review.game_title}
                    className="w-full h-auto max-h-[500px] object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://placehold.co/1200x500/1F2937/FFFFFF?text=Image+Load+Failed";
                    }}
                />
            </div>

            {/* Content Area - Distinction: Uses a darker background for the main content block */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-primary border-b border-primary pb-2">Verdict & Analysis</h2>

                {review.summary && (
                    <div className="mt-4 mb-8 p-4 border-l-4 border-secondary bg-gray-700/50 rounded-lg shadow-inner">
                        <h3 className="text-xl font-bold text-secondary-light mb-2">Summary Verdict</h3>
                        <p className="italic text-lg text-text-main">{review.summary}</p>
                    </div>
                )}
                {/* End Summary Section */}
                {/* Dangerously set HTML for rendering Django content */}
                <div
                    className="text-text-main leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                />

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Comments ({review.comments ? review.comments.length : 0})</h2>

                    {/* Comment Submission Form */}
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
                        {review.comments && review.comments.map((comment: Comment) => (
                            <div key={comment.id} className="bg-light-gray p-4 rounded-lg">
                                <p className="font-semibold text-white">{comment.user.username}</p>
                                <p className="text-text-main">{comment.content}</p>
                                <p className="text-xs text-text-muted mt-2">{new Date(comment.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail;

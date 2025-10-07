import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ReviewDetail from './pages/ReviewDetail';
import { useAuthStore } from './store/authStore';

// Simple component for protected routes (can be expanded)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Login />; // Redirect to login page
  return children;
};

const App = () => {
  const loadUser = useAuthStore((state) => state.loadUserFromToken);

  useEffect(() => {
    // Attempt to load user profile on initial app load if tokens exist
    loadUser();
  }, [loadUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<ArticleDetail />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/:id" element={<ReviewDetail />} /> 
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Fallback for 404 */}
      <Route path="*" element={<h1 className="text-center text-3xl mt-20">404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
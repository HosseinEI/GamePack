// src/pages/About.tsx
// ... (fetches /settings/ and displays static info)
import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Loader from '../components/Loader';

interface SiteSettings {
  site_name: string;
  logo: string;
  contact_email: string;
  social_links: Record<string, string>;
}

const About = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/settings/')
      .then(res => setSettings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4">{settings?.site_name || 'GamePack'}</h1>
      <p className="text-xl text-text-muted mb-8">
        Welcome to GamePack, your number one source for all things gaming. We're dedicated to giving you the very best of news, reviews, and content, with a focus on honesty, depth, and community.
      </p>
      <p className="text-lg">Contact us at: <a href={`mailto:${settings?.contact_email}`} className="text-primary hover:underline">{settings?.contact_email}</a></p>
    </div>
  );
};

export default About;
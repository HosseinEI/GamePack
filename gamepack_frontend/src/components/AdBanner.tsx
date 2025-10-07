// src/components/AdBanner.tsx
import { Ad } from '../types';

interface AdBannerProps {
  ad: Ad;
}

const AdBanner = ({ ad }: AdBannerProps) => (
  <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block my-4">
    <img src={ad.image} alt={ad.title} className="w-full rounded-lg" />
  </a>
);

export default AdBanner;
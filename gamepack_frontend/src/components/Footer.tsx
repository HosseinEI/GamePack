// src/components/Footer.tsx
import { Twitter, Twitch, Youtube } from 'lucide-react';

const Footer = () => (
  <footer className="bg-light-gray border-t border-gray-800">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <p className="text-text-muted">&copy; {new Date().getFullYear()} GamePack. All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="#" className="text-text-muted hover:text-white"><Twitter /></a>
        <a href="#" className="text-text-muted hover:text-white"><Twitch /></a>
        <a href="#" className="text-text-muted hover:text-white"><Youtube /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
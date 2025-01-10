'use client'

import React from 'react';
import { Music, Instagram, Globe, Mail } from 'lucide-react';
import Image from 'next/image';

const MusicianLandingPage = () => {
  const links = [
    {
      title: 'Spotify',
      url: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Apple Music',
      url: 'https://music.apple.com/au/artist/key-grip/1670242625',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-rose-500'
    },
    {
      title: 'DistroKid',
      url: 'https://keygripmusic.bandcamp.com/',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/keygripmusic/',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'TikTok',
      url: 'https://www.tiktok.com/@keygripmusicvstheworld',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Website',
      url: 'https://your-website.com',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-gray-500'
    },
    {
      title: 'Contact',
      url: 'mailto:your-email@example.com',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-indigo-500'
    }
  ];

  const handleClick = (url, e) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: "url('/photos/big_ceiling.jpg')"  // Put your background image in public folder
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/photos/Keygrip_webpage_image.jpg"
                alt="Artist Profile"
                fill
                className="rounded-full border-4 border-white object-cover"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Key Grip</h1>
            <p className="text-gray-200">Hi!!!! Please listen to our music!!!!!</p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            {links.map((link) => (
              <button
                key={link.title}
                onClick={(e) => handleClick(link.url, e)}
                className={`w-full flex items-center p-4 rounded-lg ${link.color} backdrop-blur-sm hover:opacity-90 transition-opacity cursor-pointer`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {link.icon}
                    <span className="ml-4 font-medium">{link.title}</span>
                  </div>
                  <span className="text-lg">→</span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-300">
            <p>© 2025 Key Grip. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MusicianLandingPage;
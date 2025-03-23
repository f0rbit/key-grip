'use client'

import React from 'react';
import Image from 'next/image';
import { Instagram } from "lucide-react";
import { EPLink } from '@/components/burger-bar';

export const Bandcamplogo = ({ className }: { className: string }) => (
  <img
    src="photos/Bandcamp_white2.png"
    alt="Music"
    className={"object-contain " + className}
  />
)

export const TikTok = () => (
  <img
    src="photos/tiktokWhite.png"
    alt="Music"
    className="w-12 h-12 object-contain"
  />
)

function Spotify() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px" fill="currentColor"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z" /></svg>;
}

function AppleMusic() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px" fill="currentColor"><path d="M 6 3 C 4.3519316 3 3 4.3519316 3 6 L 3 18 C 3 19.648068 4.3519316 21 6 21 L 18 21 C 19.648068 21 21 19.648068 21 18 L 21 6 C 21 4.3519316 19.648068 3 18 3 L 6 3 z" /></svg>;
}

const MusicianLandingPage = () => {
  const links = [
    { title: 'Spotify', url: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320', icon: <Spotify />, color: 'bg-green-500' },
    { title: 'Apple Music', url: 'https://music.apple.com/au/artist/key-grip/1670242625', icon: <AppleMusic />, color: 'bg-rose-500' },
    { title: 'Bandcamp', url: 'https://keygripmusic.bandcamp.com/', icon: <Bandcamplogo className='w-12 h-12' />, color: 'bg-blue-500' },
    { title: 'Instagram', url: 'https://www.instagram.com/keygripmusic/', icon: <Instagram />, color: 'bg-purple-500' },
    { title: 'TikTok', url: 'https://www.tiktok.com/@keygripmusicvstheworld', icon: <TikTok />, color: 'bg-slate-950' },
  ];

  const handleClick = (url: string, e: any) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('/photos/KG_Banner.png')" }}>
      <nav className="fixed top-4 px-10 text-neutral-50 text-2xl z-[500] h-10 drop-shadow-md">
        <EPLink label="Home" href="/" image={null} />
      </nav>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image src="/photos/KG_profile.jpg" alt="Artist Profile" fill className="rounded-full border-4 border-white object-cover" priority />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Key Grip</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {links.map((link) => (
              <button
                key={link.title}
                onClick={(e) => handleClick(link.url, e)}
                className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg ${link.color} text-white backdrop-blur-sm hover:opacity-90 transition-opacity cursor-pointer`}
              >
                {link.icon}
                <span className="mt-2 font-medium text-center">{link.title}</span>
              </button>
            ))}
          </div>

          <footer className="mt-12 text-center text-gray-300">
            <p>© 2025 Key Grip. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MusicianLandingPage;

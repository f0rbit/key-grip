'use client'

import React from 'react';
import Image from 'next/image';
import { Instagram } from "lucide-react";
import { EPLink } from '@/components/burger-bar';
import { AppleMusic, Spotify } from '@/components/socials';

export const Bandcamplogo = ({ className }: { className: string }) => (
  <img
    src="photos/Bandcamp_white2.png"
    alt="Music"
    className={"object-contain " + className}
  />
)

const MusicianLandingPage = () => {
  const links = [
    { title: 'Spotify', url: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320', icon: <Spotify />, color: 'bg-[#2D4D31]' },
    { title: 'Apple Music', url: 'https://music.apple.com/au/artist/key-grip/1670242625', icon: <AppleMusic />, color: 'bg-[#AB0F27]' },
    { title: 'Bandcamp', url: 'https://keygripmusic.bandcamp.com/', icon: <Bandcamplogo className='w-8 h-8' />, color: 'bg-[#277DA2]' },
    { title: 'Instagram', url: 'https://www.instagram.com/keygripmusic/', icon: <Instagram />, color: 'bg-[#872B84]' },
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

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-[7vw] sm:text-base">
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

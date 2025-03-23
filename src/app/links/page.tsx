'use client'

import React from 'react';
import Image from 'next/image';
import { Instagram } from "lucide-react";
import { EPLink } from '@/components/burger-bar';
import { AppleMusic, Spotify } from '@/components/socials';
import { PlayLink, PlaySection } from '@/components/audio-player';


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

const links: PlayLink[] = [
	{ text: 'Spotify', href: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320', icon: <Spotify />},
    { text: 'Apple Music', href: 'https://music.apple.com/au/artist/key-grip/1670242625', icon: <AppleMusic />, },
    { text: 'Bandcamp', href: 'https://keygripmusic.bandcamp.com/', icon: <Bandcamplogo className='w-8 h-8' />, },
    { text: 'Instagram', href: 'https://www.instagram.com/keygripmusic/', icon: <Instagram /> },
    { text: 'TikTok', href: 'https://www.tiktok.com/@keygripmusicvstheworld', icon: <TikTok />  },
]


const links: PlayLink[] = [
	{ text: 'Spotify', href: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320', icon: <Spotify />},
    { text: 'Apple Music', href: 'https://music.apple.com/au/artist/key-grip/1670242625', icon: <AppleMusic />, },
    { text: 'Bandcamp', href: 'https://keygripmusic.bandcamp.com/', icon: <Bandcamplogo className='w-8 h-8' />, },
    { text: 'Instagram', href: 'https://www.instagram.com/keygripmusic/', icon: <Instagram /> },
    { text: 'TikTok', href: 'https://www.tiktok.com/@keygripmusicvstheworld', icon: <TikTok />  },
]


const MusicianLandingPage = () => {
  const links = [
    { title: 'Spotify', url: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320', icon: <Spotify />, color: 'bg-green-500' },
    { title: 'Apple Music', url: 'https://music.apple.com/au/artist/key-grip/1670242625', icon: <AppleMusic />, color: 'bg-rose-500' },
    { title: 'Bandcamp', url: 'https://keygripmusic.bandcamp.com/', icon: <Bandcamplogo className='w-8 h-8' />, color: 'bg-blue-500' },
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
			<PlaySection links={links} />

          <footer className="mt-12 text-center text-gray-300">
            <p>© 2025 Key Grip. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MusicianLandingPage;

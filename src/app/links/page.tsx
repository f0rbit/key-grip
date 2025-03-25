'use client'

import React from 'react';
import Image from 'next/image';
import { Instagram } from "lucide-react";
import { EPLink } from '@/components/burger-bar';
import { AppleMusic, Spotify } from '@/components/socials';
import { PlayLink } from '@/components/audio-player';

// ✅ IconWrapper for consistent layout
const IconWrapper = ({
  children,
  size = 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12',
}: {
  children: React.ReactNode;
  size?: string;
}) => (
  <div className={`${size} flex items-center justify-center`}>
    {children}
  </div>
);

// ✅ Capsule-style full-width button with icon and label
const LinkButton = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-start gap-4 w-full max-w-md mx-auto px-6 py-3 rounded-xl border border-white bg-white/10 hover:bg-white/20 transition text-white"
  >
    {icon}
    <span className="text-base sm:text-lg font-medium">{title}</span>
  </a>
);

// ✅ Bandcamp icon (image-based)
export const Bandcamplogo = ({ className }: { className: string }) => (
  <img
    src="photos/Bandcamp_white2.png"
    alt="Bandcamp"
    className={`object-contain block ${className}`}
  />
);

// ✅ TikTok icon (image-based)
export const TikTok = () => (
  <img
    src="photos/tiktokWhite.png"
    alt="TikTok"
    className="w-full h-full object-contain block"
  />
);

export const YouTube = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    fill="currentColor"
    className="w-full h-full object-contain block"
  >
    <path d="M549.7 124.1c-6.3-24-25-42.7-48.9-48.9C456.1 64 288 64 288 64S119.9 64 75.2 75.2c-24 6.3-42.7 25-48.9 48.9C16 168.8 16 256 16 256s0 87.2 10.3 131.9c6.3 24 25 42.7 48.9 48.9 44.7 11.2 212.8 11.2 212.8 11.2s168.1 0 212.8-11.2c24-6.3 42.7-25 48.9-48.9C560 343.2 560 256 560 256s0-87.2-10.3-131.9zM232 336V176l142.7 80L232 336z" />
  </svg>
);

// ✅ Links array with scaled Bandcamp & Instagram icons
const links: PlayLink[] = [
  {
    text: 'Spotify',
    href: 'https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl?nd=1&dlsi=a260cb6fa4bd4320',
    icon: (
      <IconWrapper>
        <Spotify />
      </IconWrapper>
    ),
  },
  {
    text: 'Apple Music',
    href: 'https://music.apple.com/au/artist/key-grip/1670242625',
    icon: (
      <IconWrapper>
        <AppleMusic />
      </IconWrapper>
    ),
  },
  {
    text: 'Bandcamp',
    href: 'https://keygripmusic.bandcamp.com/',
    icon: (
      <IconWrapper>
        <Bandcamplogo className="scale-90" />
      </IconWrapper>
    ),
  },
  {
    text: 'Instagram',
    href: 'https://www.instagram.com/keygripmusic/',
    icon: (
      <IconWrapper>
        <Instagram className="w-full h-full object-contain block scale-90" />
      </IconWrapper>
    ),
  },
  {
    text: 'TikTok',
    href: 'https://www.tiktok.com/@keygripmusicvstheworld',
    icon: (
      <IconWrapper>
        <TikTok />
      </IconWrapper>
    ),
  },
  {
    text: 'YouTube',
    href: 'https://www.youtube.com/@keygripmusic',
    icon: (
      <IconWrapper>
        <YouTube />
      </IconWrapper>
    ),
  },
];


// ✅ Page component
const MusicianLandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/photos/KG_Banner.png')" }}
    >
      {/* Navigation */}
      <nav className="fixed top-4 px-10 text-neutral-50 text-2xl z-[500] h-10 drop-shadow-md">
        <EPLink label="Home" href="/" image={null} />
      </nav>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Profile */}
          <div className="text-center mb-12">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/photos/betterprofilepic2.png"
                alt="Artist Profile"
                fill
                className="rounded-full border-4 border-white object-cover"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Key Grip</h1>
          </div>

          {/* Icon Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            {links.map((link) => (
              <LinkButton key={link.text} href={link.href} title={link.text} icon={link.icon} />
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

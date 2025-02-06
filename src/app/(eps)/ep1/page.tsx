'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep1CoverArt from "~/public/ep1-cover.jpg";
import Image from "next/image";
import { AppleMusicLogo, Bandcamplogo, SpotifyLogo } from '@/app/links/page';
import Lizard from '~/public/lizard.webp';
import "../../../components/audio-player.css";
import PS2CloudBackground from '@/components/ps2WaterShader';
import { Download, ExternalLink, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from '@/lib/fonts';
import { PlaySection } from '@/components/audio-player';

// Types
interface Track {
  id: number;
  title: string;
  src: string;
}

interface PlayLink {
  href: string;
  icon: React.ReactNode;
  text: string;
}

// Constants
const TRACKS: Track[] = [
  { id: 1, title: "Kalybaba", src: "/music/Kalybaba.wav" },
  { id: 2, title: "Orbit", src: "/music/Orbit.wav" },
  { id: 3, title: "Razed Edge", src: "/music/Razed_Edge.wav" },
  { id: 4, title: "Beginning To Forget", src: "/music/beginning_to_forget.wav" },
  { id: 5, title: "Acoustiic", src: "/music/Acoustiic.wav" },
  { id: 6, title: "No Build", src: "/music/No_Build.wav" }
];

const PLAY_LINKS: PlayLink[] = [
  { href: "https://open.spotify.com/album/7iYB5p6mfH4fp6VBNc7cNH", icon: <SpotifyLogo />, text: "Spotify" },
  { href: "https://music.apple.com/au/album/key-grip-ep/1791267851", icon: <AppleMusicLogo />, text: "Apple Music" },
  { href: "https://keygripmusic.bandcamp.com/album/key-grip", icon: <Bandcamplogo />, text: "Bandcamp" }
];

const FONTS = [
  adramalech.className,
  albemarle.className,
  celticsea.className,
  durendal.className,
  fuse.className,
  minima.className,
  norumbega.className,
  scurlock.className,
];

// Utility functions
const formatTime = (time: number): string => {
  if (isNaN(time)) return '--:--';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Components
const RandomFontTitle: React.FC<{ title: string }> = ({ title }) => {
  const [charStyles, setCharStyles] = useState<string[]>([]);
  const [chars] = useState(() => title.split(""));

  const getRandomFontClass = () => 
    FONTS[Math.floor(Math.random() * FONTS.length)] + 
    ` text-[${Math.random() * 100 + 110}rem]`; // Dynamic font sizes between 3-6rem

  useEffect(() => {
    setCharStyles(chars.map(getRandomFontClass));
    const interval = setInterval(() => {
      setCharStyles(prev => prev.map((_, i) => 
        Math.random() < 0.1 ? getRandomFontClass() : prev[i]
      ));
    }, 300); // Reduced frequency for better performance

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-white text-left leading-[0.8] my-4">
      {chars.map((char, i) => (
        <span key={i} className={`inline-block ${charStyles[i]}`} aria-hidden="true">
          {char}
        </span>
      ))}
      <span className="sr-only">{title}</span>
    </h1>
  );
};

const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('audioMuted') === 'true';
    }
    return false;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = currentTrackIndex !== null ? TRACKS[currentTrackIndex] : null;

  useEffect(() => {
    const handlePlay = async () => {
      if (!audioRef.current) return;
      try {
        setIsLoading(true);
        await audioRef.current.play();
      } catch (error) {
        console.error("Playback failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    isPlaying ? handlePlay() : audioRef.current?.pause();
  }, [isPlaying, currentTrackIndex]);

  const handleDownload = async (trackSrc: string, trackTitle: string) => {
    try {
      const link = document.createElement('a');
      link.href = trackSrc;
      link.download = `${trackTitle}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const controls = {
    togglePlay: (index: number | null) => {
      if (index === null) return;
      setCurrentTrackIndex(prev => prev === index ? null : index);
      setIsPlaying(prev => prev && currentTrackIndex === index ? false : true);
    },
    toggleMute: () => {
      if (!audioRef.current) return;
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      localStorage.setItem('audioMuted', String(newMuted));
    },
    handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!audioRef.current) return;
      const time = Number(e.target.value);
      audioRef.current.currentTime = time;
    }
  };

  return (
    <div className="audio-player" role="region" aria-label="Audio player">
      <div className="song-list-container">
        {TRACKS.map((track, index) => (
          <div key={track.id} className="song-item">
            <span className="song-title">{track.title}</span>
            <div className="song-controls">
              <button
                onClick={() => controls.togglePlay(index)}
                className="control-button"
                disabled={isLoading}
                aria-live="polite"
              >
                {isLoading && currentTrackIndex === index ? (
                  <span className="loading-dots" aria-label="Loading" />
                ) : isPlaying && currentTrackIndex === index ? (
                  <Pause size={20} aria-hidden />
                ) : (
                  <Play size={20} aria-hidden />
                )}
              </button>
              <button
                onClick={() => handleDownload(track.src, track.title)}
                className="control-button"
              >
                <Download size={20} aria-hidden />
                <span className="sr-only">Download {track.title}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div className="bottom-player">
          <div className="player-container">
            <div className="player-header">
              <span className="current-track-title">{currentTrack.title}</span>
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <input
              type="range"
              value={currentTime}
              max={duration || 0}
              onChange={controls.handleSeek}
              aria-label="Track progress"
              className="seek-slider"
            />

            <div className="player-controls">
              <button 
                onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
                className="player-control-button"
              >
                <SkipBack size={20} aria-hidden />
                <span className="sr-only">Rewind 10 seconds</span>
              </button>
              <button 
                onClick={() => controls.togglePlay(currentTrackIndex)}
                className="play-pause-button"
              >
                {isPlaying ? (
                  <Pause size={24} aria-hidden />
                ) : (
                  <Play size={24} aria-hidden />
                )}
                <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button 
                onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
                className="player-control-button"
              >
                <SkipForward size={20} aria-hidden />
                <span className="sr-only">Fast forward 10 seconds</span>
              </button>
              <button 
                onClick={controls.toggleMute} 
                className="player-control-button"
              >
                {isMuted ? (
                  <VolumeX size={20} aria-hidden />
                ) : (
                  <Volume2 size={20} aria-hidden />
                )}
                <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.src}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setIsLoading(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

// ... Rest of the components remain similar with enhanced accessibility attributes ...

const EpPage: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-neutral-900">
      <PS2CloudBackground />
      <div className="relative z-10">
        <BurgerBar fixed={false} />
        <section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-12 grid gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image 
                src={Ep1CoverArt} 
                alt="Key Grip EP album cover artwork"
                fill
                className="rounded-md object-cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-4">
              <RandomFontTitle title="Key Grip...?" />
              <time className="text-neutral-400 text-base" dateTime="2023-02-10">
                February 10, 2023
              </time>
              <PlaySection links={[]} />
            </div>
          </div>
          
          <AudioPlayer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Content sections with improved semantics */}
            <figure className="relative aspect-square">
              <Image 
                src={Lizard} 
                alt="Decorative abstract lizard illustration"
                fill
                className="object-contain"
              />
            </figure>
            <p className="md:col-span-2 text-neutral-300">
              Experimental electronic compositions blending glitch textures with melodic elements. 
              Created using modular synthesis and digital signal processing techniques.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EpPage;
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const audioRef = useRef(null);
  const LOADING_PLACEHOLDER = '/photos/Ep1_coverArt.png';

  const tracks = [
    { 
      id: 1, 
      title: "Kalybaba", 
      src: "/music/Kalybaba.wav", 
      backgroundImage: "/photos/big_ceiling.jpg"
    },
    { 
      id: 2, 
      title: "Orbit", 
      src: "/music/Orbit.wav", 
      backgroundImage: "/photos/KG_Background.png"
    },
    { 
      id: 3, 
      title: "Razed Edge", 
      src: "/music/Razed_Edge.wav", 
      backgroundImage: "/photos/big_ceiling.jpg"
    },
    { 
      id: 4, 
      title: "Beginning To Forget", 
      src: "/music/beginning_to_forget.wav", 
      backgroundImage: "/photos/KG_Background.png"
    },
    { 
      id: 5, 
      title: "Acoustiic", 
      src: "/music/Acoustiic.wav", 
      backgroundImage: "/photos/big_ceiling.jpg"
    },
    { 
      id: 6, 
      title: "No Build", 
      src: "/music/No_Build.wav", 
      backgroundImage: "/photos/KG_Background.png"
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Preload function for a single image
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve();
      };
      img.onerror = reject;
    });
  };

  // Initial preload of images
  useEffect(() => {
    const preloadInitialImages = async () => {
      try {
        // Preload placeholder
        await preloadImage(LOADING_PLACEHOLDER);
        
        // Preload current and next image
        await preloadImage(tracks[currentTrackIndex].backgroundImage);
        if (currentTrackIndex < tracks.length - 1) {
          await preloadImage(tracks[currentTrackIndex + 1].backgroundImage);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadInitialImages();
  }, []);

  // Preload next image when track changes
  useEffect(() => {
    const preloadNextImage = async () => {
      setIsImageLoading(true);
      try {
        await preloadImage(currentTrack.backgroundImage);
        // Preload next track's image
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        preloadImage(tracks[nextIndex].backgroundImage).catch(console.error);
      } catch (error) {
        console.error('Error preloading next image:', error);
      }
      setIsImageLoading(false);
    };

    preloadNextImage();
  }, [currentTrackIndex]);

  // Auto-play handling
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.log("Playback failed:", error));
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds) => {
    audioRef.current.currentTime += seconds;
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
  };

  const getBackgroundStyles = () => {
    const currentImage = loadedImages.has(currentTrack.backgroundImage) 
      ? currentTrack.backgroundImage 
      : LOADING_PLACEHOLDER;

    return {
      backgroundImage: `url(${currentImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: isImageLoading ? '0.8' : '1',
      transition: 'opacity 0.3s ease-in-out, background-image 0.3s ease-in-out'
    };
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center gap-8 transition-all duration-1000"
      style={getBackgroundStyles()}
    >
      <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg mb-8">
        <h3 className="text-2xl font-medium text-center mb-6 text-white">{currentTrack.title}</h3>
        
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="hidden"
        />
        
        <div className="space-y-4">
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-sm text-white">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => skip(-10)} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-4 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            
            <button 
              onClick={() => skip(10)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              <SkipForward size={20} />
            </button>
            
            <button 
              onClick={toggleMute}
              className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`w-full p-4 text-left hover:bg-white/20 transition-colors ${
              currentTrackIndex === index 
                ? 'bg-white/30 font-medium' 
                : 'text-white/80'
            }`}
          >
            <span className="text-white">{track.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
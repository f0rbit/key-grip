'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bgColor, setBgColor] = useState('#1a1a1a');
  const [prevBgColor, setPrevBgColor] = useState('#1a1a1a');
  const audioRef = useRef(null);

  const tracks = [
    { id: 1, title: "Kalybaba", src: "/music/Kalybaba.wav", color: "#2C3E50" },
    { id: 2, title: "Orbit", src: "/music/Orbit.wav", color: "#8E44AD" },
    { id: 3, title: "Razed Edge", src: "/music/Razed_Edge.wav", color: "#E74C3C" },
    { id: 4, title: "Beginning To Forget", src: "/music/beginning_to_forget.wav", color: "#2980B9" },
    { id: 5, title: "Acoustiic", src: "/music/Acoustiic.wav", color: "#27AE60" },
    { id: 6, title: "No Build", src: "/music/No_Build.wav", color: "#F39C12" }
  ];

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    setPrevBgColor(bgColor);
    setBgColor(tracks[currentTrackIndex].color);
  }, [currentTrackIndex]);

  // New effect to handle auto-play when track changes
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

  return (
	<div 
	className="min-h-screen flex flex-col items-center justify-center gap-8 transition-colors duration-1000"
	style={{ backgroundColor: bgColor }}
    >
      {/* Player Card */}
      <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg mb-4">
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

      {/* Track List */}
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
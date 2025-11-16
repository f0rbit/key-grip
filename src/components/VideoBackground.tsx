'use client';
import { getVideoURL } from '@/lib/storage';
import React, { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoPath?: string;
  posterPath?: string;
  startTime?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoPath = getVideoURL("walking_forest"),
  posterPath,
  startTime = 0
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (startTime > 0) {
        video.currentTime = startTime;
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      console.log('Video loaded successfully');
    };

    // Check if video is already loaded (happens on refresh with cache)
    if (video.readyState >= 3) {
      // Video is already loaded
      if (startTime > 0) {
        video.currentTime = startTime;
      }
      setIsLoaded(true);
      console.log('Video was already loaded (cached)');
    }
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [startTime]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterPath}
        onError={(e) => {
          console.error('Video error:', e.currentTarget.error);
        }}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={videoPath}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  ); 
};

export default VideoBackground;
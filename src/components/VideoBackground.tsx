'use client';
import { getVideoURL } from '@/lib/storage';
import React, { useEffect } from 'react';

interface VideoBackgroundProps {
  videoPath?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoPath = getVideoURL("walking_forest") // default video
}) => {
  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 2;
      
      // Add error handling
      video.onerror = (e) => {
        console.error('Video error:', video.error);
      };

      // Log when video loads successfully
      video.onloadeddata = () => {
        console.log('Video loaded successfully');
      };
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src={videoPath}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  ); 
};

export default VideoBackground;
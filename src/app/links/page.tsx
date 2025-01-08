import React from 'react';
import { Music, Instagram, Twitter, Globe, Mail } from 'lucide-react';

const MusicianLandingPage = () => {
  const links = [
    {
      title: 'Spotify',
      url: '#',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Apple Music',
      url: '#',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-rose-500'
    },
    {
      title: 'DistroKid',
      url: '#',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Instagram',
      url: '#',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Twitter',
      url: '#',
      icon: <Twitter className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Website',
      url: '#',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-gray-500'
    },
    {
      title: 'Contact',
      url: '#',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-12">
          <img
            src="/api/placeholder/150/150"
            alt="Artist Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
          />
          <h1 className="text-3xl font-bold mb-2">Artist Name</h1>
          <p className="text-gray-300">Musician • Producer • Artist</p>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              className={`flex items-center p-4 rounded-lg ${link.color} hover:opacity-90 transition-opacity`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {link.icon}
                  <span className="ml-4 font-medium">{link.title}</span>
                </div>
                <span className="text-lg">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400">
          <p>© 2025 Artist Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MusicianLandingPage;
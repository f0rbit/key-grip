import clsx from "clsx";
import { Instagram, Youtube } from "lucide-react"; 
import Image from "next/image";

const WhiteBandcamplogo = () => (
	<img
	  src="/photos/white_bandcamp_icon.png"
	  alt="Music"
	  className="w-9 h-9"
	/>
  )

const LINKS = [
  { label: "Bandcamp", icon: <WhiteBandcamplogo />, href: "https://keygripmusic.bandcamp.com/" },
  { label: "Instagram", icon: <Instagram size={20} />, href: "https://instagram.com/yourhandle" },
  { label: "Spotify", icon: <Spotify />, href: "https://open.spotify.com/artist/2op9lkkbIEdHT0ugHKPQDl" },
  { label: "Apple Music", icon: <AppleMusic />, href: "https://music.apple.com/artist/key-grip/1670242625" },
  { label: "YouTube", icon: <Youtube size={20} />, href: "https://www.youtube.com/@keygripmusic" },
];


export function SocialIcons({ direction }: { direction: "row" | "col" }) {
  return (
    <div className={clsx("flex items-center justify-center", direction === "col" ? "flex-col" : "flex-row", "social-links")}>
      {LINKS.map(({ label, icon, href }) => (
        <a aria-roledescription="button" title={label} key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2 hover:scale-110 duration-300 text-neutral-200 hover:text-neutral-50">
          {icon}
        </a>
      ))}
    </div>
  );
}


function Spotify() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 10.689453 8 C 9.1494531 8 7.696125 8.171625 6.328125 8.515625 C 5.986125 8.600625 5.7285156 8.8561406 5.7285156 9.3691406 C 5.7285156 9.8821406 6.0709844 10.310609 6.5839844 10.224609 C 6.8399844 10.224609 6.9266562 10.138672 7.0976562 10.138672 C 8.2096562 9.8816719 9.4924531 9.7109375 10.689453 9.7109375 C 13.084453 9.7109375 15.564391 10.309 17.275391 11.25 C 17.531391 11.335 17.616109 11.421875 17.787109 11.421875 C 18.301109 11.421875 18.643516 11.079406 18.728516 10.566406 C 18.728516 10.139406 18.473797 9.8819375 18.216797 9.7109375 C 16.078797 8.5989375 13.340453 8 10.689453 8 z M 10.519531 10.994141 C 9.0655312 10.994141 8.0396719 11.250813 7.0136719 11.507812 C 6.5856719 11.678813 6.4140625 11.849344 6.4140625 12.277344 C 6.4140625 12.619344 6.6696563 12.960938 7.0976562 12.960938 C 7.2686562 12.960937 7.3543906 12.961 7.5253906 12.875 C 8.2953906 12.704 9.3215937 12.533203 10.433594 12.533203 C 12.656594 12.533203 14.710062 13.045328 16.164062 13.986328 C 16.335063 14.071328 16.506734 14.158203 16.677734 14.158203 C 17.104734 14.158203 17.360266 13.815672 17.447266 13.388672 C 17.447266 13.132672 17.276531 12.876078 17.019531 12.705078 C 15.137531 11.593078 12.914531 10.994141 10.519531 10.994141 z M 10.775391 14.007812 C 9.5783906 14.007812 8.4655156 14.178547 7.3535156 14.435547 C 7.0115156 14.435547 6.8417969 14.691203 6.8417969 15.033203 C 6.8417969 15.375203 7.0974531 15.632812 7.4394531 15.632812 C 7.5254531 15.632812 7.6961875 15.546875 7.8671875 15.546875 C 8.7221875 15.375875 9.7484531 15.205078 10.689453 15.205078 C 12.399453 15.205078 14.025594 15.632344 15.308594 16.402344 C 15.479594 16.487344 15.565328 16.572266 15.736328 16.572266 C 15.992328 16.572266 16.248922 16.402609 16.419922 15.974609 C 16.419922 15.632609 16.249125 15.546 16.078125 15.375 C 14.538125 14.52 12.742391 14.007812 10.775391 14.007812 z" /></svg>
}

function AppleMusic() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M 6 3 C 4.3519316 3 3 4.3519316 3 6 L 3 18 C 3 19.648068 4.3519316 21 6 21 L 18 21 C 19.648068 21 21 19.648068 21 18 L 21 6 C 21 4.3519316 19.648068 3 18 3 L 6 3 z M 6 4.5 L 18 4.5 C 18.837932 4.5 19.5 5.1620684 19.5 6 L 19.5 18 C 19.5 18.837932 18.837932 19.5 18 19.5 L 6 19.5 C 5.1620684 19.5 4.5 18.837932 4.5 18 L 4.5 6 C 4.5 5.1620684 5.1620684 4.5 6 4.5 z M 15.072266 6.6816406 L 10.035156 7.6816406 C 9.6601562 7.7566406 9.3877188 8.0887031 9.3867188 8.4707031 C 9.3867188 8.4707031 9.3652344 13.347938 9.3652344 13.710938 C 9.3652344 14.078938 9.0195 14.132812 8.8125 14.132812 C 7.7955 14.132812 6.8691406 14.926828 6.8691406 15.798828 C 6.8691406 16.746828 7.4827344 17.291016 8.5527344 17.291016 C 9.9787344 17.291016 10.496094 16.157484 10.496094 15.396484 L 10.496094 10.740234 C 10.496094 10.709234 10.518828 10.681781 10.548828 10.675781 L 14.779297 9.8046875 C 14.789297 10.643688 14.814453 12.229094 14.814453 12.496094 C 14.814453 12.874094 14.709344 13.078125 14.152344 13.078125 C 12.990344 13.078125 12.296875 13.955688 12.296875 14.804688 C 12.296875 15.741687 13.320531 16.210938 13.894531 16.210938 C 15.550531 16.210938 15.988281 14.833469 15.988281 14.105469 L 15.988281 7.4316406 C 15.987281 7.2016406 15.885031 6.9858437 15.707031 6.8398438 C 15.528031 6.6938438 15.297266 6.6346406 15.072266 6.6816406 z" /></svg>
}

export const SpotifyLogo = () => {
	return <img
	  src="photos/Spotify_Primary_Logo_RGB_White.png"
	  alt="Music"
	  className="w-6 h-6"
	/>
  }
  
export const AppleMusicLogo = () => (
	<img
	  src="photos/Apple_Music_icon.png"
	  alt="Music"
	  className="w-6 h-6"
	/>
  )
  
export const BandcampLogo = () => (
	<img
	  src="photos/bandcamp-icon.png"
	  alt="Music"
	  className="w-6 h-6"
	/>
  )
  
export const InstagramLogo = () => (
	<img
	  src='photos/Instagram_icon.png'
	  alt="Instagram"
	  className='w-6 h-6'
	/>
  )
  
export const TikTokLogo = () => (
	<img
	  src='photos/tiktok_logo.webp'
	  alt="Instagram"
	  className='w-6 h-6'
	/>
  )
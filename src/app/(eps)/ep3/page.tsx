'use client';

import React from 'react';
import { BurgerBar } from '@/components/burger-bar';
import Ep3CoverArt from "~/public/photos/KGPresentsCover.png";
import Image from "next/image";
import "../../../components/audio-player.css";
import VideoBackground from '@/components/VideoBackground';
import { PlaySection } from '@/components/audio-player';
import AudioPlayer from '@/components/AudioPlayer';
import type { Track } from '@/components/AudioPlayer';
import { RandomFontTitle } from '@/components/font-switcher';
import { AppleMusicLogo, BandcampLogo, SpotifyLogo } from '@/components/socials';
import { getSongURL, getVideoURL } from '@/lib/storage';

// Constants
const TRACKS: Track[] = [// TODO: add new songs
	{ id: 1, title: "Arrival", src: getSongURL("ep3", "arrival")  },
	{ id: 2, title: "Pruned Fruit", src: getSongURL("ep3", "pruned_fruit")  },
	{ id: 3, title: "Hi Basil", src: getSongURL("ep3", "hi_basil") },
	{ id: 4, title: "The Dog And The Martyr", src: getSongURL("ep3", "tdatm") },
	{ id: 5, title: "They Sleep Tonight", src: getSongURL("ep3", "they_sleep_tonight") },
	{ id: 6, title: "Her House", src: getSongURL("ep3", "her_house") }
];

interface PlayLink {
	href: string;
	icon: React.ReactNode;
	text: string;
}

const PLAY_LINKS: PlayLink[] = [
	{ href: "https://open.spotify.com/album/723SLWIQo27r48H1b6nfcG?si=YZAQzwLJTZaaX6G56CKFxQ", icon: <SpotifyLogo />, text: "Spotify" },
	{ href: "https://music.apple.com/au/album/key-grip-presents-ep/1798653758", icon: <AppleMusicLogo />, text: "Apple Music" },
	{ href: "https://keygripmusic.bandcamp.com/album/key-grip-presents", icon: <BandcampLogo />, text: "Bandcamp" }
];

// Main EpPage Component
const EpPage: React.FC = () => {

	return (
		<main className="relative w-full min-h-screen overflow-x-hidden pb-24">
			<VideoBackground videoPath={getVideoURL("walking_in_circles")} />
			<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1] top-0 left-0" />

			{/* Main Content */}
			<div className="relative z-10 pt-20">
				<BurgerBar fixed={false} />

				<section className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 pt-12 grid gap-5">
					{/* Album Header Section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
						{/* Album Cover */}
						<div className="relative w-full max-w-[400px] aspect-square">
							<Image
								src={Ep3CoverArt}
								alt="Key Grip EP 3 album cover artwork"
								width={400}
								height={400}
								className="rounded-md object-cover"
								priority
							/>
						</div>

						{/* Album Info */}
						<div className="flex flex-col gap-4 w-full h-full">
							<RandomFontTitle title="Key Grip Presents..." />
							<time
								className="text-neutral-400 text-base"
								dateTime="2025-02-10"
							>
								February 10, 2025
							</time>
							<PlaySection links={PLAY_LINKS} />
						</div>
					</div>

					{/* Audio Player Section */}
					<AudioPlayer tracks={TRACKS} />

					{/* Description Section */}
					<div className="grid grid-cols-1 max-w-4xl mx-auto gap-6 my-8">
						<div className="space-y-6">
							<blockquote className="text-neutral-300 space-y-4">
								<p>
									The being arrived in silence. It had no name, no past—only a question: What does it mean to be human? For a time, it watched. It saw joy and sorrow, cruelty and kindness. But no answer revealed itself, only contradiction. Every choice a person made was shadowed by the path they had not taken. And so, to understand fully, the being split itself in two. Neither of them knew they were part of something greater. To those who met them, they seemed just like anyone else—yet something about them lingered in the mind, a shimmer at the edges of perception. One walked through the world with the weight of all its sin, the other with the fullness of love. The Truth moved through life as if wading through tar. He saw the world for what it was—cold, indifferent, filled with people who bent others to their will, who lied with smiles and took without remorse. He learned quickly that goodness was fragile, that hope was a fool’s game. So he stopped resisting. He made the wrong choices, over and over, because what did it matter? He drank from every poisoned cup, walked every road leading to ruin. He let the darkness in, let it settle in his bones, because at least it was real. And yet, something gnawed at him. A whisper of something he could not name. The Lover lay on his back, staring up at the sky. His breath came slow, steady. He was dying. But that was alright. He thought of the people he had met, the moments of laughter, the warmth of hands held in the dark. He had lived with love—given it, received it. Wasn’t that enough? He smiled, knowing that no matter how small his life might seem in the grand scope of things, it had been his. And it had been good. Somewhere in the back of his mind, he wondered if he had ever been human at all. Perhaps he had been something else, something lighter than flesh. But it didn’t matter. He had loved, and he had been loved. That was all that mattered. The crowd gathered in the square, pressing close like wolves waiting for the kill. The Truth and The Lover stood before the stakes, bound and motionless. The firewood beneath them crackled, eager to devour. And then—The Truth looked at him. He had never seen this man before. And yet, something about him was… different. The Truth saw no fear in his face, no regret. Only peace. A quiet kind of joy, as if death was nothing more than a passing wind. For the first time in his life, The Truth questioned himself. Had he been wrong? Had he been blind all along? He had spent his life drowning in darkness, convinced it was all that existed—but here, standing beside him, was proof of something else. The flames surged. Smoke filled the sky. As their bodies turned to ash, something strange happened. Their souls drifted free, weightless, rising into the air. And as they floated, they moved toward each other. The Truth was no longer a man, only thought. He saw his life stretched before him like a great, tangled thread. He traced every mistake, every wound, every moment of cruelty and despair. He turned them over in his mind, again and again, until the answer revealed itself. He understood. It had never been about right or wrong choices, about light or dark. It had been about the experience itself. The feeling of choosing, the weight of living. The contrast between suffering and love, each defining the other. And with that understanding, he let go. His soul merged with The Lover’s. They became whole. The being that had once been two was one again. The Traveller had returned. The embers of the fire drifted through the night like petals, glowing softly as they faded into the wind. The Traveller stood at the edge of the world, watching, feeling. It had seen what it needed to see, felt what it needed to feel. It understood now. And yet, life continued. People lived, loved, hurt, hoped. The world spun on, unchanged and ever-changing. With a quiet sigh, The Traveller turned toward the sky. There was more to see, more to learn. It left. The world breathed. And then— Stillness.
								</p>
							</blockquote>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default EpPage;

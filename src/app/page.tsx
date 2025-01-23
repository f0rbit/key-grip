import { BurgerBar } from "@/components/burger-bar";
import WindChimes from "@/components/chimes";
import FontSwitcher from "@/components/font-switcher";
import { SocialIcons } from "@/components/socials";
import VideoBackground from '@/components/VideoBackground';
import { adramalech, albemarle, celticsea, durendal, fuse, minima, norumbega, scurlock } from "@/lib/fonts";
import Link from "next/link";

export default function Home() {
  const fonts = [
    adramalech.className + " text-[4rem]",
    albemarle.className + " text-[4.6rem]",
    celticsea.className + " text-[5.4rem]",
    durendal.className + " text-[3.4rem]",
    fuse.className + " text-[4.8rem]",
    minima.className + " text-[6.2rem]",
    norumbega.className + " text-[4rem]",
    scurlock.className + " text-[4.6rem]",
  ];
  const text = "Key Grip";
  const interval = 150;

  return (
    <div className="flex w-screen h-screen justify-center items-center relative text-neutral-50">
      <BurgerBar />
      <VideoBackground videoPath="/videos/walkingVid.mp4" />

      <div className="absolute inset-0 bg-black/10 -z-10"></div>
      <FontSwitcher text={text} fonts={fonts} interval={interval} />

      <section className="absolute bottom-6 right-0 grid gap-2 w-screen drop-shadow-md">
        <SocialIcons direction="row" />
      </section>
    </div>
  );
}


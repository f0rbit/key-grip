import WindChimes from "@/components/chimes";
import FontSwitcher from "@/components/font-switcher";
import { SocialIcons } from "@/components/socials";
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
  const interval = 150; // Change font every 1 second


  return (
    <div className="flex w-screen h-screen justify-center items-center relative text-neutral-900">
      {/* <h1>Key Grip</h1> */}
      <FontSwitcher text={text} fonts={fonts} interval={interval} />

      <section className="absolute bottom-6 right-6 grid gap-2">
        <SocialIcons direction="row" />
      </section>
    </div>
  );
}


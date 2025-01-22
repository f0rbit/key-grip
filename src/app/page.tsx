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


      <section className="absolute bottom-6 left-6 grid gap-2">
        <EPLink label="NEW EP" href="/ep2" year="2024" />
        <EPLink label="Key Grip...?" href="/ep1" year="2023" />
        <br />

      </section>

      <section className="absolute bottom-6 right-6 grid gap-2">
        <SocialIcons direction="row" />
      </section>
    </div>
  );
}

function EPLink({ label, href, year }: Readonly<{ label: string; href: string; year: string }>) {

  return (
    <Link href={href} className="flex flex-row items-center gap-2 hover:scale-110 transition-all duration-300 origin-left group">
      <h3 className="transition-all duration-300 text-2xl font-bold text-neutral-800 dark:text-neutral-200 dark:group-hover:text-neutral-50">
        {label}
      </h3>
      <p className="transition-all duration-300 text-neutral-500 dark:text-neutral-400 dark:group-hover:text-neutral-300">{year}</p>
    </Link>
  );
}

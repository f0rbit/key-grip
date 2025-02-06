"use client";
import clsx from "clsx";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

// create open/close context for burger bar
export const BurgerContext = createContext({
  open: false,
  toggle: () => { },
  setOpen: (open: boolean) => { },
});

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Links", href: "/links" },
];

const EP_LINKS = [
  { label: "Key Grip..!", href: "/ep2", year: "2025" },
  { label: "Key Grip...?", href: "/ep1", year: "2023" },
];

export function BurgerProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return <BurgerContext.Provider value={{ open, toggle, setOpen }}>{children}</BurgerContext.Provider>;
}

export function BurgerBar({ fixed = false }: { fixed?: boolean }) {
  const { open, toggle } = useContext(BurgerContext);


  return (
    <div className="absolute top-0 left-0">
      <div className="hidden md:flex">
        <nav
          className={clsx("flex flex-row gap-2 top-4 h-10 w-screen text-neutral-50 z-[500] justify-between px-10 text-2xl drop-shadow-md", fixed ? "fixed" : "relative" )}
        >
          <section id="links" className={clsx("flex flex-row gap-5")}>
            {MENU_LINKS.map(({ label, href }) => (
              <EPLink key={href} label={label} href={href} />
            ))}
          </section>
          <section id="links" className={clsx("flex flex-row gap-5")}>

            {EP_LINKS.map(({ label, href, year }) => (
              <EPLink key={href} label={label} href={href}  year={year}/>
            ))}
          </section>
        </nav>
      </div>

      <div className="visible md:invisible">
        <button className={clsx("fixed top-6 left-6 cursor-pointer flex flex-row gap-1 z-[501] text-neutral-50")} onClick={toggle}>
          <div className="w-12 h-12 flex flex-col justify-between items-center">
            <Hamburger open={open} />
          </div>
        </button>
        <nav
          style={{ transition: open ? `opacity 250ms ease, left 0ms 0ms ease` : `opacity 250ms ease, left 0ms 250ms ease` }}
          className={clsx("flex flex-col gap-2 fixed top-0 h-screen w-screen bg-neutral-900 text-neutral-50 z-[500] text-3xl", open ? "left-0 opacity-1" : "-left-[100vw] lg:-left-[20vw] opacity-0")}
        >
          <div className="h-24"></div>
          <div className="grid gap-2 px-8 justify-center">
            <section id="links" className={clsx("grid gap-2 px-8")}>
              {MENU_LINKS.map(({ label, href }) => (
                <EPLink key={href} label={label} href={href} />
              ))}
            </section>
            <hr className="border-neutral-500 dark:border-neutral-400 rounded-md mx-5 my-5" />
            <section id="ep-links" className={clsx("grid gap-2 px-8")}>
              {EP_LINKS.map(({ label, href, year }) => (
                <EPLink key={href} label={label} href={href} year={year} />
              ))}
            </section>
          </div>
        </nav>
      </div>
    </div>
  );
}

function Hamburger({ open }: Readonly<{ open: boolean }>) {
  // want to be hamburger when closed, X when open with the 'Menu' / 'Close'
  // have transition effect between states where the icon stays in the same plays
  // but the lines animate into an x

  return (
    <div className="w-6 h-5 flex flex-col justify-between items-center">
      <div className={clsx("w-full h-1 bg-current transition-transform duration-300", { "transform rotate-45 translate-y-2": open })}></div>
      <div className={clsx("w-full h-1 bg-current transition-opacity duration-300", { "opacity-0": open })}></div>
      <div className={clsx("w-full h-1 bg-current transition-transform duration-300", { "transform -rotate-45 -translate-y-2": open })}></div>
    </div>
  );
}

export function EPLink({ label, href, year }: Readonly<{ label: string; href: string; year?: string }>) {
  const { setOpen } = useContext(BurgerContext);

  return (
    <Link href={href} className="flex flex-row items-center gap-2 hover:scale-110 transition-transform duration-300 origin-center group" onClick={() => setOpen(false)}>
      <h3 className="font-bold">
        {label}
      </h3>
      {year && <p className="scale-[0.6] opacity-75 origin-left">{year}</p>}
    </Link>
  );
}

"use client";
import clsx from "clsx";
import { createContext, useContext, useState } from "react";
import { SocialIcons } from "./socials";

// create open/close context for burger bar
export const BurgerContext = createContext({
	open: false,
	toggle: () => {},
});

const MENU_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
	{ label: "Links", href: "/links"},
];

export function BurgerProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen((prev) => !prev);
	};

	return <BurgerContext.Provider value={{ open, toggle }}>{children}</BurgerContext.Provider>;
}

export function BurgerBar() {
	const { open, toggle } = useContext(BurgerContext);

	return (
		<>
			<button className={clsx("fixed top-6 left-6 cursor-pointer flex flex-row gap-1 z-20", open ? `text-neutral-200 dark:text-neutral-900` : `text-neutral-900 dark:text-neutral-200`)}>
				<div onClick={toggle} className="w-12 h-12 flex flex-col justify-between items-center">
					<Hamburger open={open} />
				</div>
				<p>{open ? "Close" : "Menu"}</p>
			</button>
			<nav
				style={{ transition: open ? `opacity 250ms ease, left 0ms 0ms ease` : `opacity 250ms ease, left 0ms 250ms ease` }}
				className={clsx("fixed top-0 h-screen w-screen lg:w-[20vw] bg-neutral-900 dark:bg-neutral-100 z-10", open ? "left-0 opacity-1" : "-left-[100vw] lg:-left-[20vw] opacity-0")}
			>
				<div className="h-24"></div>
				<section id="links" className={clsx("grid gap-2 px-8")}>
					{MENU_LINKS.map(({ label, href }) => (
						<a key={href} href={href} className="text-2xl font-bold text-neutral-200 dark:text-neutral-800">
							{label}
						</a>
					))}
				</section>
			</nav>
		</>
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

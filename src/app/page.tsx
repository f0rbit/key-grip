import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center relative text-neutral-900">
		<h1>Key Grip</h1>

		<section className="absolute bottom-6 left-6 grid gap-2">
			<EPLink label="NEW EP" href="/ep2" year="2024" />
			<EPLink label="Key Grip...?" href="/ep1" year="2023" />
		</section>
    </div>
  );
}

function EPLink({ label, href, year }: Readonly<{ label: string; href: string; year: string }>) { 

	return (
		<Link href={href} className="flex flex-row items-center gap-2 hover:scale-110 transition-all duration-300 origin-left">
			<h3 className="text-2xl font-bold text-gray-800">
				{label}
			</h3>
			<p className="text-gray-500">{year}</p>
		</Link>
	);
}
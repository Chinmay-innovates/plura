import Image from "next/image";
import Link from "next/link";

interface AgencySidebarProps {
	href: string;
	src: string;
	name: string;
	address: string;
}

const AgencySidebar = ({ href, src, address, name }: AgencySidebarProps) => {
	return (
		<Link href={href} className="flex gap-4 size-full">
			<div className="relative w-16">
				<Image
					src={src}
					alt="Logo"
					fill
					className="rounded-md object-contain"
				/>
			</div>
			<div className="flex flex-col flex-1">
				{name}
				<span className="text-muted-foreground">{address}</span>
			</div>
		</Link>
	);
};

export default AgencySidebar;

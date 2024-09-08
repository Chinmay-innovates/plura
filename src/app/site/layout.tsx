import Navigation from "@/components/site/navigation";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const SiteLayout = ({ children }: LayoutProps) => {
	return (
		<div className="h-full">
			<Navigation />
			{children}
		</div>
	);
};

export default SiteLayout;

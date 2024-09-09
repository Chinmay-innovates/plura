import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

const SiteLayout = ({ children }: LayoutProps) => {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<div className="h-full">
				<Navigation />
				{children}
			</div>
		</ClerkProvider>
	);
};

export default SiteLayout;

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			{children}
		</ClerkProvider>
	);
};

export default Layout;

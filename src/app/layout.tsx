import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

import { DM_Sans } from "next/font/google";
import ModalProvider from "@/providers/modal-provider";
import { Toast } from "@/components/ui/toast";
const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Plura",
	description: "All in one Agency Solution",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ModalProvider>
						{children}
						<Toast />
					</ModalProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Montor Assignment",
	description: "Montor Assignment - Frontend",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

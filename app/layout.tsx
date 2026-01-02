import "./globals.css"

export const metadata = {
	title: "E-Ticaret",
	description: "Modern e-ticaret projesi",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="tr">
			<body>{children}</body>
		</html>
	)
}

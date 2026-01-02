import SiteHeader from "./_components/site-header"
import SiteFooter from "./_components/site-footer"

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-zinc-50 text-zinc-900">
			<SiteHeader />
			<main className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">{children}</main>
			<SiteFooter />
		</div>
	)
}

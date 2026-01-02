import AdminSidebar from "./_components/admin-sidebar"
import AdminTopbar from "./_components/admin-topbar"

export const metadata = {
	title: "Admin Panel",
	description: "Velzon tarzı Admin Dashboard",
}

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-50">
			<div className="flex">
				{/* Desktop Sidebar */}
				<aside className="hidden lg:block w-70 h-screen sticky top-0">
					<AdminSidebar variant="desktop" />
				</aside>

				{/* Main */}
				<div className="flex-1 min-w-0">
					<AdminTopbar />
					<div className="px-4 md:px-6 py-6">{children}</div>
				</div>
			</div>
		</div>
	)
}

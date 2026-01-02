"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3 } from "lucide-react"

function cn(...classes: (string | false | undefined | null)[]) {
	return classes.filter(Boolean).join(" ")
}

const NAV = [
	{
		title: "MAIN",
		items: [
			{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
			{ label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
		],
	},
	{
		title: "ECOMMERCE",
		items: [
			{ label: "Products", href: "/admin/products", icon: Package },
			{ label: "Orders", href: "/admin/orders", icon: ShoppingCart },
			{ label: "Customers", href: "/admin/customers", icon: Users },
		],
	},
	{
		title: "SETTINGS",
		items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
	},
]

export default function AdminSidebar({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
	const pathname = usePathname()

	return (
		<div
			className={cn(
				"h-full w-full bg-slate-900 text-slate-200 border-r border-white/10",
				variant === "mobile" && "border-r-0",
			)}
		>
			{/* Brand */}
			<div className="h-16 px-5 flex items-center gap-3 border-b border-white/10">
				<div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-600" />
				<div className="leading-tight">
					<div className="font-extrabold text-white">TeknoStore</div>
					<div className="text-[11px] text-slate-400 -mt-0.5">Admin Panel</div>
				</div>
			</div>

			{/* Menu */}
			<div className="px-3 py-4 space-y-5">
				{NAV.map((group) => (
					<div key={group.title}>
						<div className="px-3 text-[11px] tracking-wider text-slate-400 font-semibold">
							{group.title}
						</div>

						<div className="mt-2 space-y-1">
							{group.items.map((item) => {
								const Icon = item.icon
								const active =
									pathname === item.href ||
									(item.href !== "/admin" && pathname.startsWith(item.href))

								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
											active
												? "bg-white/10 text-white"
												: "text-slate-200 hover:bg-white/5 hover:text-white",
										)}
									>
										<Icon className={cn("h-4 w-4", active && "text-indigo-300")} />
										<span className="font-medium">{item.label}</span>
									</Link>
								)
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

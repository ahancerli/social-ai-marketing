import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminPageHeader from "./_components/admin-page-header"
import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react"

export const metadata = {
	title: "Admin | Dashboard",
	description: "Admin dashboard",
}

export default function AdminDashboardPage() {
	return (
		<div className="space-y-6">
			<AdminPageHeader title="Dashboard" subtitle="Velzon tarzı admin panel başlangıç ekranı" />

			{/* Welcome / Banner */}
			<div className="rounded-2xl border border-slate-200 bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white p-6">
				<div className="text-sm text-white/80">Welcome back 👋</div>
				<div className="text-2xl md:text-3xl font-extrabold mt-1">Admin Dashboard</div>
				<p className="mt-2 text-white/85 max-w-2xl">
					Sipariş, ürün ve kullanıcı yönetimini buradan yapacağız. Bir sonraki adımda kartlardaki
					sayıları MSSQL’den çekeceğiz.
				</p>
			</div>

			{/* Stats */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card className="rounded-2xl">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-semibold text-slate-600">Revenue</CardTitle>
						<TrendingUp className="h-4 w-4 text-indigo-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-extrabold">—</div>
						<div className="text-xs text-slate-500 mt-1">This month</div>
					</CardContent>
				</Card>

				<Card className="rounded-2xl">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-semibold text-slate-600">Orders</CardTitle>
						<ShoppingCart className="h-4 w-4 text-indigo-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-extrabold">—</div>
						<div className="text-xs text-slate-500 mt-1">Today</div>
					</CardContent>
				</Card>

				<Card className="rounded-2xl">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-semibold text-slate-600">Customers</CardTitle>
						<Users className="h-4 w-4 text-indigo-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-extrabold">—</div>
						<div className="text-xs text-slate-500 mt-1">Total</div>
					</CardContent>
				</Card>

				<Card className="rounded-2xl">
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-sm font-semibold text-slate-600">Products</CardTitle>
						<Package className="h-4 w-4 text-indigo-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-extrabold">—</div>
						<div className="text-xs text-slate-500 mt-1">Active</div>
					</CardContent>
				</Card>
			</div>

			{/* Placeholder sections like Velzon */}
			<div className="grid gap-4 lg:grid-cols-12">
				<Card className="rounded-2xl lg:col-span-8">
					<CardHeader>
						<CardTitle>Sales Analytics</CardTitle>
					</CardHeader>
					<CardContent className="h-70 flex items-center justify-center text-slate-500 text-sm">
						Chart alanı (sonraki adımda ekleriz)
					</CardContent>
				</Card>

				<Card className="rounded-2xl lg:col-span-4">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent className="h-70 flex items-center justify-center text-slate-500 text-sm">
						Activity alanı (sonraki adımda)
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

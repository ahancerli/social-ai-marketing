"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingCart, User, Heart, Grid2X2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const CATEGORIES = [
	{ title: "Bilgisayar", href: "/kategori/bilgisayar" },
	{ title: "Telefon", href: "/kategori/telefon" },
	{ title: "Kulaklık", href: "/kategori/kulaklik" },
	{ title: "TV & Görüntü", href: "/kategori/tv" },
	{ title: "Gaming", href: "/kategori/gaming" },
	{ title: "Aksesuar", href: "/kategori/aksesuar" },
]

export default function SiteHeader() {
	const [q, setQ] = useState("")

	return (
		<header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-zinc-200">
			{/* Top Bar */}
			<div className="hidden md:block bg-zinc-900 text-white">
				<div className="mx-auto max-w-7xl px-6 py-2 text-sm flex items-center justify-between">
					<div className="flex items-center gap-4">
						<span>🚚 750₺ üzeri ücretsiz kargo</span>
						<span className="opacity-80">|</span>
						<span>⚡ Günün fırsatlarını kaçırma</span>
					</div>
					<div className="flex items-center gap-4 opacity-90">
						<Link className="hover:underline" href="/yardim">
							Yardım
						</Link>
						<Link className="hover:underline" href="/iletisim">
							İletişim
						</Link>
					</div>
				</div>
			</div>

			{/* Main Header */}
			<div className="mx-auto max-w-7xl px-4 md:px-6 py-4">
				<div className="flex items-center gap-3">
					{/* Mobile menu */}
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon" aria-label="Menü">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[320px]">
								<div className="space-y-4">
									<div className="font-bold text-lg">Menü</div>
									<Separator />
									<div className="space-y-2">
										{CATEGORIES.map((c) => (
											<Link
												key={c.href}
												href={c.href}
												className="block rounded-md px-3 py-2 hover:bg-zinc-100"
											>
												{c.title}
											</Link>
										))}
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 shrink-0">
						<div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-600 to-fuchsia-600" />
						<div className="leading-tight">
							<div className="font-extrabold text-lg">Tekno</div>
							<div className="text-[11px] text-zinc-500 -mt-1">Store</div>
						</div>
					</Link>

					{/* Search */}
					<form
						className="flex-1 hidden md:flex items-center gap-2"
						onSubmit={(e) => {
							e.preventDefault()
							// ileride: router.push(`/search?q=${encodeURIComponent(q)}`)
							console.log("search:", q)
						}}
					>
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
							<Input
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder="Ürün, marka veya kategori ara..."
								className="pl-9 h-11"
							/>
						</div>
						<Button className="h-11">Ara</Button>
					</form>

					{/* Actions */}
					<div className="ml-auto flex items-center gap-2">
						<Button variant="outline" size="icon" aria-label="Favoriler">
							<Heart className="h-5 w-5" />
						</Button>
						<Button variant="outline" size="icon" aria-label="Hesabım">
							<User className="h-5 w-5" />
						</Button>
						<Button variant="default" className="gap-2" aria-label="Sepet">
							<ShoppingCart className="h-5 w-5" />
							<span className="hidden sm:inline">Sepet</span>
							<span className="ml-1 rounded-md bg-white/15 px-2 py-0.5 text-xs">0</span>
						</Button>
					</div>
				</div>

				{/* Category nav (desktop) */}
				<div className="hidden md:flex items-center gap-2 pt-4">
					<Button variant="outline" className="gap-2">
						<Grid2X2 className="h-4 w-4" />
						Tüm Kategoriler
					</Button>

					<div className="flex items-center gap-2 overflow-x-auto">
						{CATEGORIES.map((c) => (
							<Link
								key={c.href}
								href={c.href}
								className="text-sm rounded-full border border-zinc-200 bg-white px-4 py-2 hover:bg-zinc-50"
							>
								{c.title}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile search */}
			<div className="md:hidden px-4 pb-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
					<Input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Ara..."
						className="pl-9 h-11"
					/>
				</div>
			</div>
		</header>
	)
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, Menu, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import AdminSidebar from "./admin-sidebar"

export default function AdminTopbar() {
	const [q, setQ] = useState("")

	return (
		<div className="sticky top-0 z-30 bg-white border-b border-slate-200">
			<div className="h-16 px-4 md:px-6 flex items-center gap-3">
				<div className="lg:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" aria-label="Open menu">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="p-0 w-72.5">
							<AdminSidebar variant="mobile" />
						</SheetContent>
					</Sheet>
				</div>

				<form
					className="hidden md:block flex-1 max-w-xl"
					onSubmit={(e) => {
						e.preventDefault()
						console.log("admin search:", q)
					}}
				>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
						<Input
							value={q}
							onChange={(e) => setQ(e.target.value)}
							placeholder="Search..."
							className="pl-9 h-11 bg-slate-50"
						/>
					</div>
				</form>

				<div className="ml-auto flex items-center gap-2">
					<Button variant="outline" size="icon" aria-label="Notifications">
						<Bell className="h-5 w-5" />
					</Button>
					<Button variant="outline" size="icon" aria-label="Settings">
						<Settings className="h-5 w-5" />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-2 h-11">
								<Avatar className="h-7 w-7">
									<AvatarFallback>AD</AvatarFallback>
								</Avatar>
								<span className="hidden sm:inline text-sm font-medium">Admin</span>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/admin/settings">Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/">Go to Website</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link className="text-red-600" href="/admin/auth/logout">
									Logout
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="md:hidden px-4 pb-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
					<Input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Search..."
						className="pl-9 h-11 bg-slate-50"
					/>
				</div>
			</div>
		</div>
	)
}

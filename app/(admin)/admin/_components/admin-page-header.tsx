export default function AdminPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
	return (
		<div className="flex flex-col gap-1">
			<h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
			{subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
		</div>
	)
}

export default function SectionTitle({
	title,
	subtitle,
	right,
}: {
	title: string
	subtitle?: string
	right?: React.ReactNode
}) {
	return (
		<div className="flex items-end justify-between gap-4">
			<div>
				<h2 className="text-xl md:text-2xl font-bold">{title}</h2>
				{subtitle ? <p className="text-sm text-zinc-600 mt-1">{subtitle}</p> : null}
			</div>
			{right ? <div className="shrink-0">{right}</div> : null}
		</div>
	)
}

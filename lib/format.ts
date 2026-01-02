export function formatMoney(amount: number, currency: string) {
	try {
		return new Intl.NumberFormat("tr-TR", {
			style: "currency",
			currency: currency || "TRY",
			maximumFractionDigits: 2,
		}).format(amount)
	} catch {
		// currency patlarsa fallback
		return `${amount.toFixed(2)} ${currency || "TRY"}`
	}
}

import RegisterForm from "./_components/register-form"

export const metadata = {
	title: "Admin | Register",
}

type SP = { error?: string | string[]; code?: string | string[] }

function first(v: string | string[] | undefined) {
	return Array.isArray(v) ? v[0] : v
}

export default async function AdminRegisterPage({
	searchParams,
}: {
	// Next 15+ uyumlu: promise
	searchParams: Promise<SP>
}) {
	const sp = (await searchParams) ?? {}
	const error = first(sp.error) === "1"
	const code = first(sp.code)

	return <RegisterForm error={error} code={code} />
}

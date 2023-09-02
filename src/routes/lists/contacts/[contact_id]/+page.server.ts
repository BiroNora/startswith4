import { error } from '@sveltejs/kit'
import { db } from '$lib/database'

export async function load({ params }) {
	const cont_id = Number(params.contact_id)

	const contact = await db.contact.findUnique({
		where: { contact_id: cont_id }
	})

	const sc_id = Number(contact?.school_id)

	const schools = await db.school.findMany({
		where: { school_id: sc_id },
		orderBy: { name: 'asc' }
	})

	if (!contact) {
		throw error(404, 'School not found')
	}

	return { contact, schools }
}

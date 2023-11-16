import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Action, Actions } from './$types'
import { my_id } from '../../../stores/dataStore'

let cont_id: number

export async function load({ params }) {
	cont_id = Number(params.contact_id)

	const contact = await db.contact.findUnique({
		where: { contact_id: cont_id }
	})

	const sc_id = Number(contact?.school_id)

	const schools = await db.school.findMany({
		where: { school_id: sc_id },
		orderBy: { school_name: 'asc' }
	})

	if (!contact) {
		throw error(404, 'School not found')
	}

	return { contact, schools }
}

const contact: Action = async ({ request }) => {
	const data = await request.formData()
	const contact_email = String(data.get('contactemail'))
	const contact_name = String(data.get('contactname'))
	const contact_phone = String(data.get('contactphone'))
	const contact_note = String(data.get('contactmessage'))
	const active = Boolean(data.get('active'))
	const active_by = my_id

	await db.contact.update({
		where: { contact_id: cont_id },
		data: {
			contact_email,
			contact_name,
			contact_phone,
			contact_note,
			active,
			active_by
		}
	})
	throw redirect(303, '../../lists/contacts')
}

export const actions: Actions = { contact }

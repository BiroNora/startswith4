import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }

	const my_id = locals.user.email

	const user = await db.user.findUnique({
		where: { user_email: my_id },
		include: { Contact: true }
	})
	const contacts = user?.Contact

	//event.setHeaders({
	//	'Cashe-Control': 'public, max-age=0, s-maxage=60'
	//})

	if (!contacts) {
		throw error(404, 'School not found')
	}

	return { contacts }
}

import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import { my_id } from '../../stores/dataStore'

export const load: PageServerLoad = async (event) => {
	const user = await db.user.findUnique({
		where: { user_id: my_id }, // Todo! user_id comes from cookies
		include: {
			School: {
				orderBy: {
					school_name: 'asc'
				}
			}
		}
	})
	const schools = user?.School

	event.setHeaders({
		'Cashe-Control': 'public, max-age=0, s-maxage=60'
	})

	const cities = await db.city.findMany({})

	if (!schools) {
		throw error(404, 'School not found')
	}

	return { schools, cities }
}

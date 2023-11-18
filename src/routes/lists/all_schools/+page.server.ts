import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }
	const schools = await db.school.findMany({
		include: { User: true },
		orderBy: { school_name: 'asc' }
	})

	//event.setHeaders({
	//	'Cashe-Control': 'public, max-age=0, s-maxage=60'
	//})

	const cities = await db.city.findMany({})

	const regions = await db.region.findMany({})

	const counties = await db.county.findMany({})

	if (!schools) {
		throw error(404, 'School not found')
	}

	return { schools, cities, regions, counties }
}

import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import { dutyMap } from '../../stores/dataStore'

let extrDuty = ''

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.active === false) {
		throw redirect(302, '/auth/login')
	}
	const events = await db.event.findMany({
		// Todo! user_id comes from cookies
		orderBy: { closing_date: 'desc' }
	})

	if (events) {
		for (const obj of events) {
			extrDuty = obj.on_duty
			const schools = await db.school.findUnique({
				where: {
					school_id: obj.school_id,
					active: true
				}
			})
			const school_name = String(schools?.school_name)
			obj.slug = school_name

			for (const dM of dutyMap) {
				if (extrDuty === dM.id) {
					extrDuty = dM.name
				}
			}
			obj.on_duty = extrDuty
		}
	}

	//event.setHeaders({
	//	'Cashe-Control': 'public, max-age=0, s-maxage=60'
	//})

	if (!events) {
		throw error(404, 'School not found')
	}

	return { events }
}

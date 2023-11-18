import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import { dutyMap3 } from '../../stores/dataStore'

let extrDuty = ''
let eventIdsInProgress: number[]

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }

	const my_id = locals.user.email

	const user = await db.user.findUnique({
		where: { user_email: my_id },
		include: {
			Event: {
				orderBy: {
					closing_date: 'desc'
				}
			}
		}
	})

	const events = user?.Event

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

			for (const dM of dutyMap3) {
				if (extrDuty == dM.id) {
					extrDuty = dM.name
				}
			}
			obj.on_duty = extrDuty
		}
	}

	const eventsInterStatInProgress = await db.user.findUnique({
		where: { user_email: my_id },
		include: {
			Event: {
				where: {
					InterestedStudents: {
						some: {
							status: '3'
						}
					}
				},
				orderBy: {
					closing_date: 'desc'
				}
			}
		}
	})

	const eventsInProgress = eventsInterStatInProgress?.Event

	if (eventsInProgress) {
		eventIdsInProgress = eventsInProgress.map((event) => event.event_id)
	}

	//event.setHeaders({
	//	'Cashe-Control': 'public, max-age=0, s-maxage=60'
	//})

	if (!events) {
		throw error(404, 'School not found')
	}

	return { events, eventIdsInProgress }
}

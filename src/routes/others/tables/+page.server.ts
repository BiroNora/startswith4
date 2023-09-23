import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const schools = await db.school.findMany({
		include: {
			User: {
				select: {
					name: true,
				},
			},
			Event: {
				include: {
					InterestedStudents:true
				}
			},
		},
    orderBy: { name: 'asc' },
  })

	const events = await db.event.findMany({
		include: {
			InterestedStudents: {
			}
		}
	})

	const countries = await db.country.findMany({})

	const regions = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})

	const istudents = await db.interestedStudents.findMany({})

	return { schools, countries, regions, istudents, events }
}

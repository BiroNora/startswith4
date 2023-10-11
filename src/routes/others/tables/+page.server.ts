import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const schools = await db.school.findMany({
		where: {
			coop: true,
			active: true,
			User: {
				some: {
					NOT: {
						user_id: undefined
					}
				}
			},
		},
		include: {
			User: {
				select: {
					user_name: true,
				},
			},
			Event: {
				include: {
					InterestedStudents:true
				}
			},
		},
    orderBy: { school_name: 'asc' },
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

	const counties = await db.county.findMany({})

	const cities = await db.city.findMany({})

	return { schools, countries, regions, counties, cities, events }
}

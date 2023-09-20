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
				select: {
					event_id: true,
					estimated_student: true,
				}
			}
		},
    orderBy: { name: 'asc' }
  })

	const regions = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})

	return { schools, regions }
}

import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const schools = await db.school.findMany({
    orderBy: { name: 'asc' }
  })
	const countries = await db.country.findMany({
		orderBy: { country_name: 'asc' }
	})
	const regions = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})
	const counties = await db.county.findMany({
		orderBy: { county_name: 'asc' }
	})
	const cities = await db.city.findMany({
		orderBy: { city_name: 'asc' }
	})

	return { schools, countries, regions, counties, cities }
}

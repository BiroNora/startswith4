import { fail } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
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

	return { countries, regions, counties, cities }
}

const school: Action = async ({ request }) => {
	const data = await request.formData()
	const country_id = Number(String(data.get('countr')))
	const region_id = Number(String(data.get('region')))
	const county_id = Number(String(data.get('county')))
	const city_id = Number(String(data.get('city')))

	const regioncountry = await db.region.findUnique({
		where: { region_id }
	})
	if (regioncountry?.country_id != country_id) {
		return fail(400, { local: true })
	}

	const countyregion = await db.county.findUnique({
		where: { county_id }
	})
	if (countyregion?.region_id != region_id) {
		return fail(400, { local: true })
	}

	const citycounty = await db.city.findUnique({
		where: { city_id }
	})
	if (citycounty?.county_id != county_id) {
		return fail(400, { local: true })
	}
}

export const actions: Actions = { school }

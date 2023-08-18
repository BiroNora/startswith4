import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { db } from '$lib/database'

const location: Action = async ({ request }) => {
	const data = await request.formData()
	let country = String(data.get('country'))
	let region = String(data.get('region'))
	let county = String(data.get('county'))
	let city = String(data.get('city'))
	let countryname = ''
	let country_name
	let regionname = ''
	let region_name
	let countyname = ''
	let county_name
	let cityname = ''
	let city_name

	if (country.endsWith('-')) {
		country = country.slice(0, -1)
	}

	const ctry = country.replace(/[!@#$%^&*~°?]/g, '').split('-')
	for (const val of ctry) {
		countryname += val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
		countryname += '-'
	}

	if (countryname.endsWith('-')) {
		country_name = countryname.slice(0, -1)
	} else {
		country_name = countryname
	}

	if (region.endsWith('-')) {
		region = region.slice(0, -1)
	}

	const reg = region.replace(/[!@#$%^&*~°?]/g, '').split('-')
	for (const val of reg) {
		regionname += val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
		regionname += '-'
	}

	if (regionname.endsWith('-')) {
		region_name = regionname.slice(0, -1)
	} else {
		region_name = regionname
	}

	if (county.endsWith('-')) {
		county = county.slice(0, -1)
	}

	const cnty = county.replace(/[!@#$%^&*~°?]/g, '').split('-')
	for (const val of cnty) {
		countyname += val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
		countyname += '-'
	}

	if (countyname.endsWith('-')) {
		county_name = countyname.slice(0, -1)
	} else {
		county_name = countyname
	}

	if (city.endsWith('-')) {
		city = city.slice(0, -1)
	}

	const c = city.replace(/[!@#$%^&*~°?]/g, '').split('-')
	for (const val of c) {
		cityname += val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
		cityname += '-'
	}

	if (cityname.endsWith('-')) {
		city_name = cityname.slice(0, -1)
	} else {
		city_name = cityname
	}

	const countryifexists = await db.country.findUnique({
		where: { country_name }
	})

	const regioncountry = await db.region.findUnique({
		where: { region_name }
	})

	const countyregion = await db.county.findUnique({
		where: { county_name }
	})

	const citycounty = await db.city.findUnique({
		where: { city_name }
	})

	if (
		countryifexists &&
		regioncountry?.country_id == countryifexists?.country_id &&
		countyregion?.region_id == regioncountry?.region_id &&
		citycounty?.county_id == countyregion?.county_id &&
		citycounty
	) {
		return fail(400, {
      error: true,
      message: 'Location already exists.'
    })
	}

	if (!countryifexists?.country_name) {
		await db.country.create({
			data: {
				country_name
			}
		})
	}

	const countryid = await db.country.findUnique({
		where: { country_name }
	})

	const country_id = countryid?.country_id

	if (!regioncountry?.region_name) {
		await db.region.create({
			data: {
				region_name,
				country_id
			}
		})
	}

	const regionid = await db.region.findUnique({
		where: { region_name }
	})

	const region_id = regionid?.region_id

	if (!countyregion?.county_name) {
		await db.county.create({
			data: {
				county_name,
				region_id
			}
		})
	}

	const countyid = await db.county.findUnique({
		where: { county_name }
	})

	const county_id = countyid?.county_id

	if (!citycounty?.city_name) {
		await db.city.create({
			data: {
				city_name,
				county_id
			}
		})
	}

	throw redirect(303, '/register/school')
}

export const actions: Actions = { location }

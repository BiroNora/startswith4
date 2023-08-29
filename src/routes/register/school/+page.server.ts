import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { db } from '$lib/database'
import { schoolType } from '../../stores/dataStore'

export const load: PageServerLoad = async () => {
	const country = await db.country.findMany({
		orderBy: { country_name: 'asc' }
	})
	const regio = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})
	const county = await db.county.findMany({
		orderBy: { county_name: 'asc' }
	})
	const city = await db.city.findMany({
		orderBy: { city_name: 'asc' }
	})

	return { country, regio, county, city }
}

const school: Action = async ({ request }) => {
	const data = await request.formData()
	const country_id = Number(String(data.get('countr')))
	const region_id = Number(String(data.get('region')))
	const county_id = Number(String(data.get('county')))
	const city_id = Number(String(data.get('city')))
	const om_id = String(data.get('om')) || null
	const name = String(data.get('name'))
	const zip_code = String(data.get('zip'))
	const address = String(data.get('address'))
	const dir_name = String(data.get('dirname'))
	const dir_phone = String(data.get('dirphone'))
	const school_email = String(data.get('email'))
	const website = String(data.get('website')) || null
	const altisk = Boolean(data.get('iskA'))
	const gimn = Boolean(data.get('iskB'))
	const szakgimn = Boolean(data.get('iskC'))
	const szakkoz = Boolean(data.get('iskD'))
	const szakisk = Boolean(data.get('iskE'))
	const techn = Boolean(data.get('iskF'))
	const szakkepz = Boolean(data.get('iskG'))
	const almuv = Boolean(data.get('iskH'))
	const muvokt = Boolean(data.get('iskI'))
	const keszseg = Boolean(data.get('iskJ'))
	const fejl = Boolean(data.get('iskK'))
	const kieg = Boolean(data.get('iskL'))
	const kolleg = Boolean(data.get('iskM'))
	const hidp = Boolean(data.get('iskN'))
	const nembes = Boolean(data.get('iskO'))
	const user_email = String(data.get('useremail'))
	const coop = Boolean(data.get('coop'))
	const note = String(data.get('note'))
	const active = true
	const school_type = []

	if (altisk) {
		school_type.push(schoolType[0][0]) // általános iskola
	}
	if (gimn) {
		school_type.push(schoolType[1][0]) // gimnázium
	}
	if (szakgimn) {
		school_type.push(schoolType[2][0]) // szakgimnázium
	}
	if (szakkoz) {
		school_type.push(schoolType[3][0]) // szakközépiskola
	}
	if (szakisk) {
		school_type.push(schoolType[4][0]) // szakiskola
	}
	if (techn) {
		school_type.push(schoolType[5][0]) // technikum
	}
	if (szakkepz) {
		school_type.push(schoolType[6][0]) // szakképző iskola
	}
	if (almuv) {
		school_type.push(schoolType[7][0]) // alapfokú művészetoktatás
	}
	if (muvokt) {
		school_type.push(schoolType[8][0]) // művészeti oktatás
	}
	if (keszseg) {
		school_type.push(schoolType[9][0]) // készségfejlesztés
	}
	if (fejl) {
		school_type.push(schoolType[10][0]) // fejlesztő nevelés-oktatás
	}
	if (kieg) {
		school_type.push(schoolType[11][0]) // kiegészítő nemzetiségi nyelvoktatás
	}
	if (kolleg) {
		school_type.push(schoolType[12][0]) // kollégium
	}
	if (hidp) {
		school_type.push(schoolType[13][0]) // hídprogramok
	}
	if (nembes) {
		school_type.push(schoolType[14][0]) // nem besorolt
	}

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

	if (country_id == 1 && om_id?.length != 6 && !nembes) {
		return fail(400, { omval: true })
	}

	const schoolid = await db.school.findUnique({
		where: { school_email }
	})

	const school_id = schoolid?.school_id

	if (school_id) {
		return fail(400, { sch: true })
	}

	const myuser = await db.user.findUnique({
		where: { user_email }
	})

	const user_id = myuser?.user_id
	const active_by = String(user_id)

	if (!myuser) {
		return fail(400, { user: true })
	}

	await db.school.create({
		data: {
			om_id,
			name,
			zip_code,
			address,
			dir_name,
			dir_phone,
			school_email,
			website,
			school_type,
			coop,
			note,
			city_id,
			country_id,
			county_id,
			region_id,
			user_id,
			active,
			active_by
		}
	})

	throw redirect(303, '/login')
}

export const actions: Actions = { school }

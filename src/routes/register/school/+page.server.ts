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
	const contact_name = String(data.get('contactname'))
	const contact_email = String(data.get('contactemail'))
	const contact_phone = String(data.get('contactphone'))
	const contact_note = String(data.get('contactnote'))
	const user_email = String(data.get('useremail'))
	const coop = Boolean(data.get('coop'))
	const note = String(data.get('note'))

	const school_type = []
	const common = []
	let hasContact = false
	let firstTime = true
	let scho_id

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

	if (
		contact_email.valueOf() !== 'null' &&
		contact_name.valueOf() !== 'null' &&
		contact_phone.valueOf() !== 'null' &&
		user_email.valueOf() !== 'null'
	) {
		hasContact = true
		console.log('van contact')
	}

	if (hasContact && firstTime) {
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

		const userid = await db.user.findUnique({
			where: { user_email }
		})

		const u_id = userid?.user_id
		if (!u_id) {
			return fail(400, { uid: true })
		}

		const contactid = await db.contact.findUnique({
			where: { contact_email }
		})

		const c_id = contactid?.contact_id
		if (c_id) {
			return fail(400, { cid: true })
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
				region_id
			}
		})

		const sch_id = await db.school.findUnique({
			where: { school_email }
		})

		scho_id = sch_id?.school_id

		firstTime = false
	}

	if (hasContact && !firstTime) {
		const userid = await db.user.findUnique({
			where: { user_email }
		})

		const u_id = userid?.user_id
		if (!u_id) {
			return fail(400, { uid: true })
		}

		const contactid = await db.contact.findUnique({
			where: { contact_email }
		})

		const conty = contactid?.contact_id
		if (conty) {
			return fail(400, { cid: true }) // contact already exists
		}

		if (!conty) {
			await db.contact.create({
				data: {
					contact_email,
					contact_name,
					contact_phone,
					contact_note
				}
			})
		}

		const contid = await db.contact.findUnique({
			where: { contact_email }
		})

		const c_id = contid?.contact_id

		if (c_id && scho_id && u_id) {
			common.push(String(c_id))
			common.push(String(scho_id))
			common.push(String(u_id))

			const commonunique = await db.contactOnUserOnSchool.findUnique({
				where: { common }
			})

			if (commonunique) {
				return fail(400, { real: true })
			}

			await db.contactOnUserOnSchool.create({
				data: {
					common
				}
			})
		}
	}

	if (!hasContact) {
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
		console.log('school_id' + school_id)

		if (school_id) {
			return fail(400, { sch: true })
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
				region_id
			}
		})

		const sch_id = await db.school.findUnique({
			where: { school_email }
		})

		scho_id = sch_id?.school_id

		firstTime = false
	}
	throw redirect(303, '/login')
}

export const actions: Actions = { school }

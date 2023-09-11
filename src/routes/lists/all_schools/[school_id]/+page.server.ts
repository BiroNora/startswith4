import { error } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventMap, dutyMap3, schType, duType } from '../../../stores/dataStore.js'

let extrType = ''
let extrDuty = ''
let sc_id: number

export async function load({ params }) {
	sc_id = Number(params.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id }
	})

	let extrSchoolType = ''
	let extrSchoolDuty = ''

	if (school) {
		schType.map((type, index) => {
			const ind = String(index + 1)
			school.school_type.forEach(function (item) {
				if (ind == item) {
					extrSchoolType += type
					extrSchoolType += ', '
				}
			})
		})
		duType.map((type, index) => {
			const ind = String(index + 1)
			school.duty.forEach(function (item) {
				if (ind == item) {
					extrSchoolDuty += type
					extrSchoolDuty += ', '
				}
			})
		})
	}

	const resS = extrSchoolType.slice(0, -2)
	const resD = extrSchoolDuty.slice(0, -2)

	const contact = await db.contact.findMany({
		where: { school_id: sc_id },
    orderBy: { contact_id: 'desc' }
	})

	const event = await db.event.findMany({
		where: { school_id: sc_id },
		orderBy: { closing_date: 'desc' }
	})

	if (event) {
		for (const obj of event) {
			extrDuty = obj.on_duty
			extrType = obj.event_type
			for (const dM of dutyMap3) {
				if (extrDuty == dM.id) {
					extrDuty = dM.name
				}
			}
			for (const eT of eventMap) {
				if (extrType == eT.id) {
					extrType = eT.name
				}
			}
			obj.on_duty = extrDuty
			obj.event_type = extrType
		}
	}

  const u_id = String(school?.user_id)

  const user = await db.user.findMany({
    where: { user_id: u_id}
  })

	const city = await db.city.findUnique({
		where: { city_id: school?.city_id }
	})

	const region = await db.region.findUnique({
		where: { region_id: school?.region_id }
	})

	const county = await db.county.findUnique({
		where: { county_id: school?.county_id }
	})

  const country = await db.country.findUnique({
		where: { country_id: school?.country_id }
	})

	if (!school) {
		throw error(404, 'School not found')
	}

	return { school, resS, resD, contact, event, city, region, county, country, user }
}

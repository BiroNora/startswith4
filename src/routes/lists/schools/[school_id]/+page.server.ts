import { error } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventMap, dutyMap3, schType } from '../../../stores/dataStore.js'

let extrType = ''
let extrDuty = ''

export async function load({ params }) {
	const sc_id = Number(params.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id }
	})

	let extrSchoolType = ''

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
	}

	const res = extrSchoolType.slice(0, -2)

	const contact = await db.contact.findMany({
		where: { school_id: sc_id }
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

	const city = await db.city.findUnique({
		where: { city_id: school?.city_id }
	})

	const region = await db.region.findUnique({
		where: { region_id: school?.region_id }
	})

	const county = await db.county.findUnique({
		where: { county_id: school?.county_id }
	})

	if (!school) {
		throw error(404, 'School not found')
	}

	return { school, res, contact, event, city, region, county }
}
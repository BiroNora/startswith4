import { error } from '@sveltejs/kit'
import { db } from '$lib/database'
import { dutyMap3, eventMap } from '../../../stores/dataStore'

let extrType = ''
let extrDuty = ''

export async function load({ params }) {
	const ev_id = Number(params.event_id)

	const event = await db.event.findUnique({
		where: { event_id: ev_id }
	})

	if (event) {
			extrDuty = event.on_duty
			extrType = event.event_type
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
			event.on_duty = extrDuty
			event.event_type = extrType

	}

	const sc_id = Number(event?.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id },
	})
	const cityid = school?.city_id

	const city = await db.city.findUnique({
		where: { city_id: cityid}
	})

	const cityname = city?.city_name

	if (!event) {
		throw error(404, 'School not found')
	}

	return { event, school, cityname }
}

import { channelMap, gradeMap, statusMap } from './../../../stores/dataStore'
import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { dutyMap3, eventMap } from '../../../stores/dataStore'

let extrType = ''
let extrDuty = ''
let ev_id: number
let extrGrade = ''
let extrChannel = ''
let extrStatus = ''
let cityname = ''
let sc_id: number
let onduty = ''
let eventtype = ''
let cldate = ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({ params, locals }) {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }
	
	ev_id = Number(params.event_id)

	const event = await db.event.findUnique({
		where: { event_id: ev_id },
		include: { User: true }
	})

	onduty = String(event?.on_duty)
	eventtype = String(event?.event_type)
	cldate = String(event?.closing_date)

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

	sc_id = Number(event?.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id }
	})

	const cityid = school?.city_id

	const city = await db.city.findUnique({
		where: { city_id: cityid }
	})
	cityname = String(city?.city_name)

	const inters = await db.interestedStudents.findMany({
		where: { event_id: ev_id },
		orderBy: { intrest_id: 'desc' }
	})

	if (inters) {
		for (const obj of inters) {
			extrGrade = obj.grade
			extrChannel = obj.channel
			extrStatus = obj.status
			for (const gM of gradeMap) {
				if (extrGrade == gM.id) {
					extrGrade = gM.name
				}
			}
			for (const cM of channelMap) {
				if (extrChannel == cM.id) {
					extrChannel = cM.name
				}
			}
			for (const sM of statusMap) {
				if (extrStatus == sM.id) {
					extrStatus = sM.name
				}
			}
			obj.grade = extrGrade
			obj.channel = extrChannel
			obj.status = extrStatus
		}
	}

	const user = event?.User

	const countries = await db.country.findMany({})

	const regions = await db.region.findMany({})

	if (!event) {
		throw error(404, 'School not found')
	}

	return { event, school, cityname, countries, regions, inters, onduty, eventtype, cldate, user }
}

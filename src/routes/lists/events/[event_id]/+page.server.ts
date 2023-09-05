import { channelMap, gradeMap, statusMap } from './../../../stores/dataStore';
import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { dutyMap3, eventMap } from '../../../stores/dataStore'
import type { Action, Actions } from './$types'

let extrType = ''
let extrDuty = ''
let ev_id: number
let extrGrade
let extrChannel
let extrStatus

export async function load({ params }) {
	ev_id = Number(params.event_id)

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

	const inters = await db.interestedStudents.findMany({
		where: { event_id: ev_id }
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

	const countries = await db.country.findMany({})

	const regions = await db.region.findMany({})

	if (!event) {
		throw error(404, 'School not found')
	}

	return { event, school, cityname, countries, regions, inters }
}

const interested: Action = async ({ request }) => {
  const data = await request.formData()
  const count = Number(data.get('number'))
	const country_id = Number(data.get('country'))
	const region_id = Number(data.get('connect'))
	const grade = Number(data.get('grade'))
	const channel = Number(data.get('channel'))
  const apply = Boolean(data.get('apply'))
  const work_title = String(data.get('work'))
	const status = Number(data.get('status'))
  const event_id = ev_id
	const applied = apply

  await db.interestedStudents.create({
    data: {
      Event: {
        connect: {
          event_id:  event_id,
        },
      },
      count,
      grade,
      applied,
      work_title,
      channel,
      status,
      Region: {
        connect: {
          region_id:  region_id,
        },
      },
      Country: {
        connect: {
          country_id: country_id,
        },
      },
    }
  })
  throw redirect(303, '../../lists/events')
}


export const actions: Actions = { interested }

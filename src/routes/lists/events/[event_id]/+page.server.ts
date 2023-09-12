import { channelMap, gradeMap, my_id, statusMap } from './../../../stores/dataStore';
import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { dutyMap3, eventMap } from '../../../stores/dataStore'
import type { Action, Actions } from './$types'

let extrType = ''
let extrDuty = ''
let ev_id: number
let extrGrade = ''
let extrChannel = ''
let extrStatus = ''
let cityname = ''
let schoolname = ''
let sc_id: number
let onduty = ''
let eventtype = ''
let cldate = ''

export async function load({ params }) {
	ev_id = Number(params.event_id)

	const event = await db.event.findUnique({
		where: { event_id: ev_id }
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
		where: { school_id: sc_id },
	})
	schoolname = String(school?.name)

	const cityid = school?.city_id

	const city = await db.city.findUnique({
		where: { city_id: cityid}
	})
	cityname = String(city?.city_name)

	const inters = await db.interestedStudents.findMany({
		where: { event_id: ev_id },
		orderBy: {intrest_id: 'desc'}
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

	const user_id = my_id

	const user = await db.user.findUnique({
		where: { user_id: user_id }
	})

	const countries = await db.country.findMany({})

	const regions = await db.region.findMany({})

	if (!event) {
		throw error(404, 'School not found')
	}

	return { event, school, cityname, countries, regions, inters, onduty, eventtype, cldate, user }
}

const interested: Action = async ({ request }) => {
  const data = await request.formData()
  const count = Number(data.get('number'))
	const country_id = Number(data.get('country'))
	const region_id = Number(data.get('connect'))
	const grade = String(data.get('grade'))
	const channel = String(data.get('channel'))
  const apply = Boolean(data.get('apply'))
  const work_title = String(data.get('work'))
	const status = String(data.get('status'))
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

const event: Action = async ({ request }) => {
  const data = await request.formData()
  const event_name = String(data.get('fantasy'))
  const clos_date = data.get('meeting-time')
  const on_duty = String(data.get('duty'))
  const event_type = String(data.get('type'))
  const estimated_student = Number(data.get('estimate'))
  const note = String(data.get('message'))
  const closing_date = new Date(String(clos_date))
	const email = String(data.get('email'))

  if (event_name.length < 10) {
    console.log(event_name.length)
    return fail(400, { title: true })
  }

  const user = await db.user.findUnique({
		where: {user_email: email}
	})

	if (!user) {
		return fail(400, { user: true })
	}

  await db.event.update({
		where: {event_id: ev_id},
    data: {
      event_name,
      closing_date,
      on_duty,
      event_type,
      estimated_student,
      note,
    }
  })
  throw redirect(303, '../../lists/events')
}

const eventU: Action = async ({ request }) => {
  const data = await request.formData()
	const email = String(data.get('email'))
	console.log(email)

	const user = await db.user.findUnique({
		where: {user_email: email}
	})

	if (!user) {
		return fail(400, { user: true })
	}

	const one = await db.event.findUnique({
		where: {event_id: ev_id},
		include: { User: true }
	})

	let already = false

	one?.User.forEach(function(item) {
		if (item.user_email == email) {
			already = true
		}
	})

	if (already) {
		return fail(400, { already: true })
	}

	const us_id = user.user_id

  await db.event.update({
		where: {event_id: ev_id},
    data: {
			User: {
				connect: {
					user_id: us_id
				}
			}
    }
  })
  throw redirect(303, '../../lists/events')
}

export const actions: Actions = { interested, event, eventU }

import { channelMap, dateSlugify, gradeMap, my_id, slugify, statusMap } from './../../../stores/dataStore';
import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { dutyMap3, eventMap } from '../../../stores/dataStore'
import type { Action, Actions } from './$types'

let extrType = ''
let extrDuty = ''
let ev_id: number
let extrGrade
let extrChannel
let extrStatus
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

	const countries = await db.country.findMany({})

	const regions = await db.region.findMany({})

	if (!event) {
		throw error(404, 'School not found')
	}

	return { event, school, cityname, countries, regions, inters, onduty, eventtype, cldate }
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

const event: Action = async ({ request }) => {
  const data = await request.formData()
  const event_name = String(data.get('fantasy'))
  const clos_date = data.get('meeting-time')
  const on_duty = String(data.get('duty'))
  const event_type = String(data.get('type'))
  const estimated_student = Number(data.get('estimate'))
  const note = String(data.get('message'))
  const closing_date = new Date(String(clos_date))

  const slugDate = dateSlugify(String(clos_date))
  console.log('psqldate' + clos_date)
  console.log('slugDate' + slugDate)
  console.log('closing_date' + closing_date)

  if (event_name.length < 10) {
    console.log(event_name.length)
    return fail(400, { title: true })
  }
  //const school_name = 'Eventus Üzleti, Művészeti Szakgimnázium, Technikum, Gimnázium, Szakképző Iskola, Alapfokú Művészeti Iskola és Kollégium'
  //const city_name = 'Egerszalók'
  const cn = slugify(String(cityname?.slice(0, 12)))
  const sn = slugify(String(schoolname?.slice(0, 12)))
  const se = slugify(event_name.slice(0, 12))
  const slug = slugDate + '-' + cn + '-' + se + '-' + sn
  console.log(slug)

  const uniqueSlug = await db.event.findUnique({
    where: { slug }
  })

  if (uniqueSlug) {
    return fail(400, { uslug: true })
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
      slug,
    }
  })
  throw redirect(303, '../../lists/events')
}


export const actions: Actions = { interested, event }

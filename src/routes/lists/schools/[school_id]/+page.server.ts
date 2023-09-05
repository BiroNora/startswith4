import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventMap, dutyMap3, schType, duType, dateSlugify, slugify,  } from '../../../stores/dataStore.js'
import type { Action, Actions } from './$types'

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

	return { school, resS, resD, contact, event, city, region, county }
}

const event: Action = async ({ request }) => {
  const data = await request.formData()
  const event_name = String(data.get('fantasy'))
  const clos_date = data.get('meeting-time')
  const on_duty = String(data.get('duty'))
  const event_type = String(data.get('type'))
  const estimated_student = Number(data.get('estimate'))
  const school_email = String(data.get('schoolemail'))
  const user_email = String(data.get('uemail'))
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

  const useremail = await db.user.findUnique({
    where: { user_email }
  })
  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  const school_id = schoolemail?.school_id
  const user_id = useremail?.user_id
  const school_active = schoolemail?.active
  const user_active = useremail?.active

  if (!school_active || !user_active) {
    return fail(400, { inactsu: true })
  }

  const city_id = schoolemail?.city_id

  const city = await db.city.findUnique({
    where: { city_id }
  })
  const city_name = city?.city_name
  const school_name = schoolemail?.name
  //const school_name = 'Eventus Üzleti, Művészeti Szakgimnázium, Technikum, Gimnázium, Szakképző Iskola, Alapfokú Művészeti Iskola és Kollégium'
  //const city_name = 'Egerszalók'
  const cn = slugify(String(city_name?.slice(0, 12)))
  const sn = slugify(String(school_name?.slice(0, 12)))
  const se = slugify(event_name.slice(0, 12))
  const slug = slugDate + '-' + cn + '-' + se + '-' + sn
  console.log(slug)

  const uniqueSlug = await db.event.findUnique({
    where: { slug }
  })

  if (uniqueSlug) {
    return fail(400, { uslug: true })
  }

  if ((!useremail)) {
    return fail(400, { user: true })
  }
  if ((!schoolemail)) {
    return fail(400, { school: true })
  }

  await db.event.create({
    data: {
      event_name,
      closing_date,
      on_duty,
      event_type,
      estimated_student,
      note,
      slug,
      School: {
        connect: {
          school_id:  school_id ,
        },
      },
      User: {
        connect: {
          user_id: `${ user_id }`,
        },
      },
    }
  })

  throw redirect(303, '../../lists/schools')
}


const contact: Action = async ({ request }) => {
  const data = await request.formData()
  const contact_name = String(data.get('contactname'))
  const contact_email = String(data.get('contactemail'))
  const contact_phone = String(data.get('contactphone'))
  const user_email = String(data.get('useremail'))
  const contact_note = String(data.get('contactmessage'))
  const active = true


  const contact = await db.contact.findUnique({
    where: { contact_email }
  })
  const useremail = await db.user.findUnique({
    where: { user_email }
  })

  const user_id = useremail?.user_id

  const active_by = String(user_id)

  if ((contact)) {
    return fail(400, { contact: true })
  }

  if ((contact) || (!useremail)) {
    return fail(400, { contacts: true })
  }
  else {
    await db.contact.create({
      data: {
        contact_email,
        contact_name,
        contact_phone,
        contact_note,
        User: {
          connect: {
            user_id: `${ user_id }`,
          },
        },
        active,
        active_by,
        School: {
          connect: {
            school_id:  sc_id,
          },
        },
      },
    })
  }
  throw redirect(303, '../../lists/schools')
}


export const actions: Actions = { contact, event }

import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventMap, dutyMap3, schType, duType, dateSlugify, slugify, my_id, dutyType, schoolType } from '../../../stores/dataStore.js'
import type { Action, Actions } from './$types'

let extrType = ''
let extrDuty = ''
let sc_id: number
let school_name = ''
let city_name = ''

export async function load({ params }) {
	sc_id = Number(params.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id }
	})

  school_name = String(school?.name)

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

	const city = await db.city.findUnique({
		where: { city_id: school?.city_id }
	})
  city_name = String(city?.city_name)

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

	return { school, resS, resD, contact, event, city, region, county, country }
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
          school_id:  sc_id ,
        },
      },
      User: {
        connect: {
          user_id: my_id,
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
  const active_by = my_id
  const contact_note = String(data.get('contactmessage'))
  const active = true

  const contact = await db.contact.findUnique({
    where: { contact_email }
  })

  if ((contact)) {
    return fail(400, { contact: true })
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
            user_id: my_id,
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

const school: Action = async ({ request }) => {
	const data = await request.formData()
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
	const basic = Boolean(data.get('bas'))
	const medior = Boolean(data.get('med'))
	const high = Boolean(data.get('hig'))
	const coop = Boolean(data.get('coop'))
	const note = String(data.get('note'))
	const active = true
	const school_type = []
	const duty = []

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

	if (basic) {
		duty.push(dutyType[0][0]) // BASIC
	}
	if (medior) {
		duty.push(dutyType[1][0]) // MEDIOR
	}
	if (high) {
		duty.push(dutyType[2][0]) // HIGH
	}

	await db.school.update({
    where: {school_id: sc_id },
		data: {
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
			duty,
			active,
		}
	})

	throw redirect(303, '../../lists/schools')
}


export const actions: Actions = { contact, event, school }

import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database.js'
import {
	eventMap,
	dutyMap,
	schType,
	duType,
	dateSlugify,
	slugify,
	dutyType,
	schoolType
} from '../../../stores/dataStore.js'
import type { Action, Actions } from './$types'

let extrType = ''
let extrDuty = ''
let sc_id: number
let school_name = ''
let city_name = ''
let my_id: string
let active_by: string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({ params, locals }) {
	if (!locals.user || locals.user.active === false) {
		throw redirect(302, '/auth/login')
	}

	my_id = locals.user.email
	active_by = locals.user.name

	sc_id = Number(params.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id }
	})

	school_name = String(school?.school_name)

	let extrSchoolType = ''
	let extrSchoolDuty = ''

	if (school) {
		schType.map((type, index) => {
			const ind = String(index + 1)
			school.school_type.forEach(function (item) {
				if (ind === item) {
					extrSchoolType += type
					extrSchoolType += ', '
				}
			})
		})
		duType.map((type, index) => {
			const ind = String(index + 1)
			school.duty.forEach(function (item) {
				if (ind === item) {
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
			for (const dM of dutyMap) {
				if (extrDuty === dM.id) {
					extrDuty = dM.name
				}
			}
			for (const eT of eventMap) {
				if (extrType === eT.id) {
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
	const date = new Date(String(clos_date))
	const event_year = date.getFullYear()
	const month = date.getMonth() + 1
	const semester = month >= 3 && month <= 9 ? 'SPRING' : 'FALL'

	const slugDate = dateSlugify(String(clos_date))

	if (event_name.length < 10) {
		return fail(400, { title: true })
	}
	//const school_name = 'Eventus Üzleti, Művészeti Szakgimnázium, Technikum, Gimnázium, Szakképző Iskola, Alapfokú Művészeti Iskola és Kollégium'
	//const city_name = 'Egerszalók'
	const cn = slugify(String(city_name?.slice(0, 12)))
	const sn = slugify(String(school_name?.slice(0, 12)))
	const se = slugify(event_name.slice(0, 12))
	const slug = slugDate + '-' + cn + '-' + se + '-' + sn

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
			event_year,
			semester,
			on_duty,
			event_type,
			estimated_student,
			note,
			slug,
			School: {
				connect: {
					school_id: sc_id
				}
			},
			User: {
				connect: {
					user_email: my_id
				}
			}
		}
	})
	throw redirect(303, '../../lists/events')
}

const contact: Action = async ({ request }) => {
	const data = await request.formData()
	const contact_name = String(data.get('contactname'))
	const contact_email = String(data.get('contactemail'))
	const contact_phone = String(data.get('contactphone'))
	const contact_note = String(data.get('contactmessage'))
	const active = true

	const contact = await db.contact.findUnique({
		where: { contact_email }
	})

	if (contact) {
		return fail(400, { contact: true })
	} else {
		await db.contact.create({
			data: {
				contact_email,
				contact_name,
				contact_phone,
				contact_note,
				User: {
					connect: {
						user_email: my_id
					}
				},
				active,
				active_by,
				School: {
					connect: {
						school_id: sc_id
					}
				}
			}
		})
	}
	throw redirect(303, '../../lists/contacts')
}

const school: Action = async ({ request }) => {
	const data = await request.formData()
	const school_name = String(data.get('name'))
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
	const active = Boolean(data.get('active'))
	const school_type: string[] = []
	const duty: string[] = []
	const levels: boolean[] = [basic, medior, high]
	const types: boolean[] = [
		altisk, gimn, szakgimn, szakkoz, szakisk,
		techn, szakkepz, almuv, muvokt, keszseg,
		fejl, kieg, kolleg, hidp, nembes
	]

	types.forEach((type, index) => {
		if (type) {
			school_type.push(schoolType[index][0])
		}
	})

	levels.forEach((level, index) => {
		if (level) {
			duty.push(dutyType[index][0])
		}
	})

	await db.school.update({
		where: { school_id: sc_id },
		data: {
			school_name,
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
			active_by,
			basic,
			medior,
			high
		}
	})

	throw redirect(303, '../../lists/schools')
}

export const actions: Actions = { contact, event, school }

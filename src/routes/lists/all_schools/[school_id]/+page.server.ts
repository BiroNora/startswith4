import { error, fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventMap, dutyMap3, schType, duType } from '../../../stores/dataStore.js'
import type { Action, Actions } from './$types'


let extrType = ''
let extrDuty = ''
let sc_id: number

export async function load({ params }) {
	sc_id = Number(params.school_id)

	const school = await db.school.findUnique({
		where: { school_id: sc_id },
		include: { User: true}
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

  const user = school?.User
	console.log(user)

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

const schoolU: Action = async ({ request }) => {
  const data = await request.formData()
	const email = String(data.get('email'))

	const user = await db.user.findUnique({
		where: {user_email: email}
	})

	if (!user) {
		return fail(400, { usercontact: true })
	}

	const one = await db.school.findUnique({
		where: {school_id: sc_id},
		include: { User: true }
	})

	let alreadycontact = false

	one?.User.forEach(function(item) {
		if (item.user_email == email) {
			alreadycontact = true
		}
	})

	if (alreadycontact) {
		return fail(400, { alreadycontact: true })
	}

	const us_id = user.user_id

	const contactresult = await db.school.update({
		where: {school_id: sc_id},
    data: {
			User: {
				connect: {
					user_id: us_id
				}
			}
    }
  })
  return { contactresult }
}

const schoolUD: Action = async ({ request }) => {
  const data = await request.formData()
	const email = String(data.get('email'))

	const user = await db.user.findUnique({
		where: {user_email: email}
	})

	if (!user) {
		return fail(400, { user: true })
	}

	const one = await db.school.findUnique({
		where: {school_id: sc_id},
		include: { User: true }
	})

	let already = false

	one?.User.forEach(function(item) {
		if (item.user_email == email) {
			already = true
		}
	})

	if (!already) {
		return fail(400, { already: true })
	}

	const us_id = user.user_id

	const result = await db.school.update({
		where: {school_id: sc_id},
    data: {
			User: {
				disconnect: {	user_id: us_id }
			}
    }
  })
  return { result }
}

export const actions: Actions = { schoolU, schoolUD }

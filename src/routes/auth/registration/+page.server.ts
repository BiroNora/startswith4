import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'
import { db } from '$lib/database'
import { dutyType, isStrongPassword } from '../../stores/dataStore'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/auth/login')
	}

	const regions = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})

	if (!regions) {
		return fail(400, {
			error: true,
			message: 'Something went wrong. Please try it later.'
		})
	}

	return { regions }
}

const user: Action = async ({ request }) => {
	const data = await request.formData()
	const user_name = String(data.get('name'))
	const nationality = String(data.get('nationality'))
	const user_phone = String(data.get('phone'))
	const user_email = String(data.get('email'))
	const basic = Boolean(data.get('basic'))
	const reB = String(data.get('regB'))
	const medior = Boolean(data.get('medior'))
	const reM = String(data.get('regM'))
	const high = Boolean(data.get('high'))
	const reH = String(data.get('regH'))
	const superior = Boolean(data.get('superior'))
	const reS = String(data.get('regS'))
	const director = Boolean(data.get('director'))
	const reD = String(data.get('regD'))
	const password1 = data.get('password1')
	const password2 = data.get('password2')
	const active = true
	const active_by = 'self'

	let regionB = dutyType[0][0]
	let regionM = dutyType[1][0]
	let regionH = dutyType[2][0]
	let regionS = dutyType[3][0]
	let regionD = dutyType[4][0]
	const on_duty = []

	regionB += basic ? reB : '0'
	regionM += medior ? reM : '0'
	regionH += high ? reH : '0'
	regionS += superior ? reS : '0'
	regionD += director ? reD : '0'

	if (
		regionB === '10' &&
		regionM === '20' &&
		regionH === '30' &&
		regionS === '40' &&
		regionD === '50')
		{
		return fail(400, { regions: true })
	}

	on_duty.push(Number(regionB))
	on_duty.push(Number(regionM))
	on_duty.push(Number(regionH))
	on_duty.push(Number(regionS))
	on_duty.push(Number(regionD))

	if (
		typeof user_email !== 'string' ||
		typeof password1 !== 'string' ||
		typeof password2 !== 'string' ||
		!user_email ||
		!password1 ||
		!password2 ||
		password1 !== password2
	) {
		return fail(400, { invalid: true })
	}

	if (!isStrongPassword(password1)) {
		return fail(400, { passw: true })
	}

	const user = await db.user.findUnique({
		where: { user_email }
	})

	if (user) {
		return fail(400, { user: true })
	}

	await db.user.create({
		data: {
			user_name,
			nationality,
			user_phone,
			user_email,
			on_duty,
			passwordHash: await bcrypt.hash(password1, 10),
			userAuthToken: crypto.randomUUID(),
			active,
			active_by
		}
	})

	throw redirect(303, '/lists/activities')
}

export const actions: Actions = { user }

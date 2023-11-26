import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Action, Actions } from './$types'

const today = new Date()
let dir_flag: boolean
let is_director: boolean
let dir_duty: string

export async function load({ locals }) {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }

	// Gives back the original array of user's duties
	const user_duty = locals.user.duty

	const dir_num = (locals.user.duty)[4]

	if (dir_num > 50) {
		dir_duty = String(dir_num % 10) // BAS, MED, HIGH
	}

	// Shows if the user is director
	dir_flag = is_director = dir_num % 10 == 0 ? false : true

	const activities = await db.activity.findMany({
		where: {
			end_date: {
				gte: today
			}
		},
		orderBy: { end_date: 'desc'}
	})

	if (!activities) {
		throw error(404, 'Program not found')
	}

	const regio = await db.region.findMany({
		select: {region_id: true, region_name: true},
		orderBy: { region_name: 'asc' }
	})

	const city = await db.city.findMany({})

	return { activities, regio, city, user_duty, dir_flag, dir_duty, is_director }
}

const activity: Action = async ({ request }) => {
	const data = await request.formData()
	const act_name = String(data.get('fantasy'))
	const clos_date = data.get('meeting-time')
	const duty = String(data.get('duty'))
	const region_id = Number(data.get('region'))
	const act_note = String(data.get('message'))
	const end_date = new Date(String(clos_date))
	dir_flag = false
	const all_region = false
	const on_duty = duty + region_id

	await db.activity.create({
		data: {
			end_date,
			act_name,
			act_note,
			on_duty,
			dir_flag,
			all_region
		}
	})
	throw redirect(303, '../../lists/activities')
}

const delAct: Action = async ({ request }) => {
    const data = await request.formData()
    const act_id = Number(data.get('actid'))

	await db.activity.delete({
		where: { act_id: act_id }
	})
	throw redirect(303, '../../lists/activities')
}

const dir_message: Action = async ({ request }) => {
	const data = await request.formData()
	const act_name = String(data.get('dir_message'))
	const clos_date = data.get('meeting-time')
	let on_duty = dir_duty
	const reg = String(data.get('region'))
	let all_region: boolean
	dir_flag = true

	if (reg === 'ALL') {
		// Region_id ONLY for force
		on_duty += '0'
		all_region = true
	} else {
		on_duty += reg
		all_region = false
	}

	const end_date = new Date(String(clos_date))

	await db.activity.create({
		data: {
			end_date,
			act_name,
			on_duty,
			dir_flag,
			all_region
		}
	})
	throw redirect(303, '../../lists/activities')
}

export const actions: Actions = { activity, delAct, dir_message }

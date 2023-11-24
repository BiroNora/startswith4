import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Action, Actions } from './$types'

const today = new Date()

export async function load({ locals }) {
	if (!locals.user) {
    throw redirect(302, '/auth/login')
  }

	const duty = locals.user.duty

	const activities = await db.activity.findMany({
		where: {
			end_date: {
				gte: today
			}
		}
	})

	if (!activities) {
		throw error(404, 'Program not found')
	}

	const regio = await db.region.findMany({
		orderBy: { region_name: 'asc' }
	})

	const city = await db.city.findMany({})

	return { activities, regio, city, duty }
}

const activity: Action = async ({ request }) => {
	const data = await request.formData()
	const act_name = String(data.get('fantasy'))
	const clos_date = data.get('meeting-time')
	const on_duty = String(data.get('duty'))
	const region_id = Number(data.get('region'))
	const act_note = String(data.get('message'))
	const end_date = new Date(String(clos_date))

	await db.activity.create({
		data: {
			end_date,
			act_name,
			act_note,
			on_duty,
			region_id
		}
	})
	throw redirect(303, '../../lists/activities')
}

const delAct: Action = async ({ request }) => {
    const data = await request.formData()
    const act_id = Number(data.get('actid'))
    console.log(act_id)

	await db.activity.delete({
		where: { act_id: act_id }
	})
	throw redirect(303, '../../lists/activities')
}

export const actions: Actions = { activity, delAct }

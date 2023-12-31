import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Actions } from './$types'

let act_id: number

export async function load({ params, locals }) {
	if (!locals.user || locals.user.active === false) {
    throw redirect(302, '/auth/login')
  }

	act_id = Number(params.act_id)

	const activity = await db.activity.findUnique({
		where: { act_id: act_id }
	})

	if (!activity) {
		return fail(400, { act: true })
	}

	const reg_id = activity.on_duty.charAt(1)

	const region = await db.region.findUnique({
		where: { region_id: Number(reg_id) },
		select: { region_id: true, region_name: true}
	})

	return { activity, region }
}

async function delAct() {
	await db.activity.delete({
		where: { act_id: act_id }
	})
	throw redirect(303, '../../lists/activities')
}

export const actions: Actions = { delAct }

import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Action, Actions } from './$types'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({ params }) {
	const activities = await db.activity.findMany({
	})

	if (!activities) {
    throw error(404, 'Program not found')
	}

  const regio = await db.region.findMany({
    orderBy: { region_name: 'asc' }
	})

  const city = await db.city.findMany({
  })

	return { activities, regio, city }
}

const activity: Action = async ({ request }) => {
  const data = await request.formData()
  const act_name = String(data.get('fantasy'))
  const clos_date = data.get('meeting-time')
  const region_id = Number(data.get('region'))
  const act_note = String(data.get('message'))
  const end_date = new Date(String(clos_date))

  await db.activity.create({
    data: {
      end_date,
      act_name,
      act_note,
      region_id
    }
  })
  throw redirect(303, '../../lists/activities')}


  async function delAct() {
    const data = await request.formData()
    const act_id = Number(data.get('actid'))
    console.log(act_id)

    await db.activity.delete({
      where: { act_id: act_id}
    })
    throw redirect(303, '../../lists/activities')
  }

export const actions: Actions = { activity, delAct }

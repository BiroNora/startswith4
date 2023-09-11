import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'
import { my_id } from '../../stores/dataStore'


export const load: PageServerLoad = async (event) => {
  console.log(event)
  const contacts = await db.contact.findMany({
    where: {
      user_id:  my_id,
      },   // Todo! user_id comes from cookies
    orderBy: { contact_name: 'asc' }
  })

  event.setHeaders({
    'Cashe-Control': 'public, max-age=0, s-maxage=60'
  })

  if (!contacts) {
    throw error(404, 'School not found')
  }

  return { contacts }
}

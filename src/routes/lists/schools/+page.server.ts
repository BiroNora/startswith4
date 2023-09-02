import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

const my_id = "0747dd3d-2895-4587-9598-8330ec9b89da"

export const load: PageServerLoad = async (event) => {
  console.log(event)
  const schools = await db.school.findMany({
    where: {
      user_id: my_id,
      active: true,
      },   // Todo! user_id comes from cookies
    orderBy: { name: 'asc' }
  })

  event.setHeaders({
    'Cashe-Control': 'public, max-age=0, s-maxage=60'
  })

  const cities = await db.city.findMany({})

  if (!schools) {
    throw error(404, 'School not found')
  }

  return { schools, cities }
}

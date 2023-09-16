import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'


export const load: PageServerLoad = async (event) => {
  const schools = await db.school.findMany({
    include: { User: true },
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

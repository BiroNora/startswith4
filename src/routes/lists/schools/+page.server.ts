import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const school = await db.school.findMany({
    orderBy: { name: 'asc' }
  })

  const city = await db.city.findMany({})

  if (!school) {
    throw error(404, 'School not found')
  }

  return { school, city }
}

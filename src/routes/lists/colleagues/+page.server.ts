import { error, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, '/auth/login')
  }
	const users = await db.user.findMany({
    orderBy: { user_name: 'asc' }
  })

	const regions = await db.region.findMany({ })

  if (!users || !regions) {
    throw error(404, 'Something went wrong. Please try it later.')
  }

  const regs = regions.map(({ region_id, region_name }) => ({
    region_id,
    region_name
  }))

	return { users, regs }
}

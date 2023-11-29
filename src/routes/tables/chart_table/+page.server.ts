import { db } from '$lib/database'
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.active === false) {
    throw redirect(302, '/auth/login')
  }

	const years = await db.event.findMany({
		distinct: ['event_year'],
		select: {
			event_year: true
		}
	})

	if (!years) {
		return fail(400, {
			error: true,
			message: 'Something went wrong. Please try it later.'
		})
	}

	const distinctYears = [...new Set(years.map((item) => String(item.event_year)))]
	distinctYears.sort()
	distinctYears.unshift('ALL')

	const countries = await db.country.findMany({
		orderBy: { country_name: 'asc' }
	})

	if (!countries) {
		return fail(400, {
			error: true,
			message: 'Something went wrong. Please try it later.'
		})
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

	return {
		distinctYears,
		countries,
		regions
	}
}

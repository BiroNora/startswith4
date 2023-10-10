import { db } from "$lib/database"
import { fail } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  const years = await db.event.findMany({
		distinct: ['year'],
      select: {
        year: true,
      },
	})

  if (!years) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const _distinctYearsNum = [...new Set(years.map(item => item.year))]

  const distinctYears = [...new Set(years.map(item => String(item.year)))]
  distinctYears.sort()
  distinctYears.unshift('ALL')

  return { distinctYears, _distinctYearsNum }
}

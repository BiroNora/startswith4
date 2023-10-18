import { db } from "$lib/database"
import { fail } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  const years = await db.event.findMany({
		distinct: ["event_year"],
      select: {
        event_year: true,
      },
	})

  if (!years) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const distinctYears = [...new Set(years.map(item => String(item.event_year)))]
  distinctYears.sort()
  distinctYears.unshift('ALL')

  const regions = await db.region.findMany({})

  if (!regions) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  //regions.unshift({
  //  region_id: 0,
  //  region_name: 'ALL',
  //  country_id: 0,
  //})

  return { distinctYears, regions }
}

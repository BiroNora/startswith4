import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const country = await db.country.findMany({
    orderBy: { country_name: 'asc' },
  })
  const regio = await db.region.findMany({
    orderBy: { region_name: 'asc' },
  })
  const county = await db.county.findMany({
    orderBy: { county_name: 'asc' },
  })
  const city = await db.city.findMany({
    orderBy: { city_name: 'asc' },
  })
  return {country, regio, county, city}
}

const location: Action = async ({ request }) => {
  const data = await request.formData()
  const country_name = String(data.get('country'))
  const region_name = String(data.get('region'))
  const county_name = String(data.get('county'))
  const city_name = String(data.get('city'))
  let exists = false

  const countryifexists = await db.country.findUnique({
    where: {country_name}
  })
  //console.log(countryifexists)
  const regioncountry = await db.region.findUnique({
    where: { region_name }
  })

  const countyregion = await db.county.findUnique({
    where: { county_name }
  })

  const citycounty = await db.city.findUnique({
    where: { city_name }
  })

  if ((countryifexists) && (regioncountry?.country_id == countryifexists?.country_id) && (countyregion?.region_id == regioncountry?.region_id) && (citycounty?.county_id == countyregion?.county_id) && (citycounty)) {
    exists = true
    return fail(400, {school: true})
  }

  if (!countryifexists?.country_name) {
    await db.country.create({
      data: {
        country_name,
      }
    })
  }

  const countryid = await db.country.findUnique({
    where: {country_name}
  })

  const country_id = countryid?.country_id

  if (!regioncountry?.region_name) {
    await db.region.create({
      data: {
        region_name,
        country_id
      }
    })
  }

  const regionid = await db.region.findUnique({
    where: {region_name}
  })

  const region_id = regionid?.region_id

  if (!countyregion?.county_name) {
    await db.county.create({
      data: {
        county_name,
        region_id
      }
    })
  }

  const countyid = await db.county.findUnique({
    where: {county_name}
  })

  const county_id = countyid?.county_id

  if (!citycounty?.city_name) {
    await db.city.create({
      data: {
        city_name,
        county_id
      }
    })
  }

  throw redirect(303, '/register/school')
}

export const actions: Actions = { location }

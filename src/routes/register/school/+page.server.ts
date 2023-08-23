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

const school: Action = async ({ request }) => {
  const data = await request.formData()
  const country_id = Number(String(data.get('countr')))
  const region_id = Number(String(data.get('region')))
  const county_id = Number(String(data.get('county')))
  const city_id = Number(String(data.get('city')))
  const om_id = String(data.get('om')) || null
  const name = String(data.get('name'))
  const zip_code = String(data.get('zip'))
  const address = String(data.get('address'))
  const dir_name = String(data.get('dirname'))
  const dir_phone = String(data.get('dirphone'))
  const school_email = String(data.get('email'))
  const website = String(data.get('website')) || null
  const altisk = Boolean(data.get('iskA'))
  const gimn = Boolean(data.get('iskB'))
  const szakgimn = Boolean(data.get('iskC'))
  const szakkoz = Boolean(data.get('iskD'))
  const szakisk = Boolean(data.get('iskE'))
  const techn = Boolean(data.get('iskF'))
  const szakkepz = Boolean(data.get('iskG'))
  const almuv = Boolean(data.get('iskH'))
  const muvokt = Boolean(data.get('iskI'))
  const keszseg = Boolean(data.get('iskJ'))
  const fejl = Boolean(data.get('iskK'))
  const kieg = Boolean(data.get('iskL'))
  const kolleg = Boolean(data.get('iskM'))
  const hidp = Boolean(data.get('iskN'))
  const contact_name = String(data.get('contactname'))
  const contact_email = String(data.get('contactemail'))
  const contact_phone = String(data.get('contactphone'))
  const contact_note = String(data.get('contactnote'))
  const user_email = String(data.get('useremail'))
  const coop = Boolean(data.get('coop'))
  const note = String(data.get('note'))
  const school_type = []
  const common = []
  let contact_id = ''


  const regioncountry = await db.region.findUnique({
    where: { region_id }
  })
  if (regioncountry?.country_id != country_id) {
    return fail(400, { local: true })
  }

  const countyregion = await db.county.findUnique({
    where: { county_id }
  })
  if (countyregion?.region_id != region_id) {
    return fail(400, { local: true })
  }

  const citycounty = await db.city.findUnique({
    where: { city_id }
  })
  if (citycounty?.county_id != county_id) {
    return fail(400, { local: true })
  }

  if (country_id == 1 && om_id?.length != 6) {
    return fail(400, { omval: true })
  }

  if (altisk) {
    school_type.push('ÁLTALÁNOS ISKOLA')
  }
  if (gimn) {
    school_type.push('GIMNÁZIUM')
  }
  if (szakgimn) {
    school_type.push('SZAKGIMNÁZIUM')
  }
  if (szakkoz) {
    school_type.push('SZAKKÖZÉPISKOLA')
  }
  if (szakisk) {
    school_type.push('SZAKISKOLA')
  }
  if (techn) {
    school_type.push('TECHNIKUM')
  }
  if (szakkepz) {
    school_type.push('SZAKKÉPZŐ ISKOLA')
  }
  if (almuv) {
    school_type.push('ALAPFOKÚ MŰVÉSZETOKTATÁS')
  }
  if (muvokt) {
    school_type.push('MŰVÉSZETI OKTATÁS')
  }
  if (keszseg) {
    school_type.push('KÉSZSÉGFEJLESZTÉS')
  }
  if (fejl) {
    school_type.push('FEJLESZTŐ NEVELÉS-OKTATÁS')
  }
  if (kieg) {
    school_type.push('KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS')
  }
  if (kolleg) {
    school_type.push('KOLLÉGIUM')
  }
  if (hidp) {
    school_type.push('HÍDPROGRAMOK')
  }
  console.log(school_type)

  if
    (contact_email.valueOf() === 'null' ||
    contact_name.valueOf() === 'null' ||
    contact_phone.valueOf() === 'null' ||
    user_email.valueOf() === 'null') {
    console.log('nincs contact')

    const schoolid = await db.school.findUnique({
      where: { school_email }
    })

    const s_id = schoolid?.school_id
    console.log('sch_id' + s_id)

    if (s_id) {
      return fail(400, { sch: true })
    }

    await db.school.create({
      data: {
        om_id,
        name,
        zip_code,
        address,
        dir_name,
        dir_phone,
        school_email,
        website,
        school_type,
        coop,
        note,
        city_id,
        country_id,
        county_id,
        region_id
      }
    })
  }

  if
    (contact_email.valueOf() !== 'null' &&
    contact_name.valueOf() !== 'null' &&
    contact_phone.valueOf() !== 'null' &&
    user_email.valueOf() !== 'null'){
    console.log('van contact')

    const schoolEid = await db.school.findUnique({
      where: { school_email }
    })

    const sE_id = schoolEid?.school_id
    console.log('sch_id' + sE_id)

    if (sE_id) {
      return fail(400, { sch: true })
    }

    await db.school.create({
      data: {
        om_id,
        name,
        zip_code,
        address,
        dir_name,
        dir_phone,
        school_email,
        website,
        school_type,
        coop,
        note,
        city_id,
        country_id,
        county_id,
        region_id
      }
    })

    const schoolid = await db.school.findUnique({
      where: { school_email }
    })

    const userid = await db.user.findUnique({
      where: { user_email }
    })

    const s_id = schoolid?.school_id
    const u_id = userid?.user_id
    console.log('sch_id' + s_id)
    console.log('u_id' + u_id)

    if (!s_id || !u_id) {
      return fail(400, { sch: true })
    }

    const contid = await db.contact.findUnique({
      where: { contact_email }
    })

    const conty = contid?.contact_id
    console.log(conty)
    console.log(String(contid?.contact_id))

    if (!conty) {
      await db.contact.create({
        data: {
          contact_email,
          contact_name,
          contact_phone,
          contact_note,
        }
      })
    }

    if (conty) {
      contact_id = String(conty)
    }
    else {
      const conid = await db.contact.findUnique({
      where: { contact_email }
      })

      contact_id = String(conid?.contact_id)
    }

    common.push(contact_id)
    common.push(String(s_id))
    common.push(String(u_id))

    const commonunique = await db.contactOnUserOnSchool.findUnique({
      where: { common }
    })

    if (commonunique) {
      return fail(400, {real: true})
    }

    await db.contactOnUserOnSchool.create({
      data: {
        common,
      }
    })
  }
  throw redirect(303, '/login')
}


export const actions: Actions = { school }

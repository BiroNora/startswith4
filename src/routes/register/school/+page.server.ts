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
  console.log(school_email)
  console.log(country_id)
  console.log(contact_name.length)
  console.log(contact_email.valueOf())
  console.log(typeof(contact_email))
  console.log(typeof(contact_phone))
  console.log(typeof(contact_note))
  console.log(typeof(user_email))
  console.log(contact_name)


  if (country_id == 1 && om_id?.length != 6) {
    return fail(400, {omval: true})
  }

  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  if ((schoolemail)) {
    return fail(400, {schoolemail: true})
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

  if (contact_email.valueOf() === 'null' ||
      contact_name.valueOf() === 'null' ||
      contact_phone.valueOf() === 'null' ||
      user_email.valueOf() === 'null') {
      console.log('nincs contact')

  }
  if (contact_email.valueOf() !== 'null' &&
      contact_name.valueOf() !== 'null' &&
      contact_phone.valueOf() !== 'null' &&
      user_email.valueOf() !== 'null'){
      console.log('van contact')

  const contacty = await db.contact.findUnique({
    where: {contact_email}
  })

  //if ((contacty)) {
    //const contactyschool = await db.contactonschool.findUnique({
      //where: {contact_email, school_email}
    //})
    //return fail(400, {contact: true})
  //}

  await db.contact.create({
    data: {
      contact_email,
      contact_name,
      contact_phone,
      contact_note,
    }
  })

  await db.ContactOnSchool.create({
    data: {
      school_email,
      contact_email
    }
  })

  await db.ContactOnUser.create({
    data: {
      user_email,
      contact_email
    }
  })

  //const cont = await db.contact.
  }
  const regioncountry = await db.region.findUnique({
    where: { region_id }
  })
  if (regioncountry?.country_id != country_id) {
    return fail(400, {local: true})
  }

  const countyregion = await db.county.findUnique({
    where: { county_id }
  })
  if (countyregion?.region_id != region_id) {
    return fail(400, {local: true})
  }

  const citycounty = await db.city.findUnique({
    where: { city_id }
  })
  if (citycounty?.county_id != county_id) {
    return fail(400, {local: true})
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

  throw redirect(303, '/login')
}

export const actions: Actions = { school }

import { duty } from './../../stores/dataStore';
import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'
import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  const regio = await db.region.findMany({
    orderBy: { region_name: 'asc' },
  })

  return {regio}
}

const user: Action = async ({ request }) => {
	const data = await request.formData()
  const name = String(data.get('name'))
  const nationality = String(data.get('nationality'))
  const phone = String(data.get('phone'))
	const user_email = String(data.get('email'))
  const basic = Boolean(data.get('basic'))
  const reB = String(data.get('regB'))
  const medior = Boolean(data.get('medior'))
  const reM = String(data.get('regM'))
  const high = Boolean(data.get('high'))
  const reH = String(data.get('regH'))
  const superior = Boolean(data.get('superior'))
  const reS = String(data.get('regS'))
  const director = Boolean(data.get('director'))
  const reD = String(data.get('regD'))
	const password1 = data.get('password1')
  const password2 = data.get('password2')
  let regionB = "1"
  let regionM = "2"
  let regionH = "3"
  let regionS = "4"
  let regionD = "5"
  const on_duty = [] // duryreg = ["10", "24", "30", "40", "50"]  medior / Budapest

  if (basic == true) {
    regionB += reB
  } else {
    regionB += "0"
  }
  if (medior == true) {
    regionM += reM
  } else {
    regionM += "0"
  }
  if (high == true) {
    regionH += reH
  } else {
    regionH += "0"
  }
  if (superior == true) {
    regionS += reS
  } else {
    regionS += "0"
  }
  if (director == true) {
    regionD += reD
  } else {
    regionD += "0"
  }

  on_duty.push(regionB)
  on_duty.push(regionM)
  on_duty.push(regionH)
  on_duty.push(regionS)
  on_duty.push(regionD)

	if (typeof user_email != 'string' ||
      typeof password1 != 'string' ||
      typeof password2 != 'string' ||
      !user_email || !password1 || !password2 ||
      password1 !== password2) {
		return fail(400, { invalid: true })
	}

  const user = await db.user.findUnique({
    where: { user_email }
  })

  if (user) {
    return fail(400, {user: true})
  }

  await db.user.create({
    data: {
      name,
      nationality,
      phone,
      user_email,
      on_duty,
      passwordHash: await bcrypt.hash(password1, 10),
      userAuthToken: crypto.randomUUID(),
    }
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { user }

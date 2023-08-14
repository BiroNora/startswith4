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
	const email = String(data.get('email'))
  const basic = Boolean(data.get('basic'))
  const reB = String(data.get('regB'))
  const medior = Boolean(data.get('medior'))
  const reM = String(data.get('regM')) || null
  const high = Boolean(data.get('high'))
  const reH = String(data.get('regH')) || null
  const superior = Boolean(data.get('superior'))
  const reS = String(data.get('regS')) || null
  const director = Boolean(data.get('director'))
	const password1 = data.get('password1')
  const password2 = data.get('password2')
  let regionB
  let regionM
  let regionH
  let regionS

  if (reB != null && reB.length != 0 && basic != false) {
    regionB = Number(reB)
  } else {
    regionB = NaN
  }

  if (reM != null && reM.length != 0 && medior != false) {
    regionM = Number(reM)
  } else {
    regionM = NaN
  }

  if (reH != null && reH.length != 0 && high != false) {
    regionH = Number(reH)
  } else {
    regionH = NaN
  }

  if (reB != null && reB.length != 0 && superior != false) {
    regionS = Number(reS)
  } else {
    regionS = NaN
  }

	if (typeof email != 'string' ||
      typeof password1 != 'string' ||
      typeof password2 != 'string' ||
      !email || !password1 || !password2 ||
      password1 !== password2) {
		return fail(400, { invalid: true })
	}

  if (basic == false && high == false && medior == false && superior == false && director == false) {
    return fail(400, { invalid: true })
  }

  const user = await db.user.findUnique({
    where: { email }
  })

  if (user) {
    return fail(400, {user: true})
  }

  await db.user.create({
    data: {
      name,
      nationality,
      phone,
      email,
      basic,
      regionB,
      medior,
      regionM,
      high,
      regionH,
      superior,
      regionS,
      director,
      passwordHash: await bcrypt.hash(password1, 10),
      userAuthToken: crypto.randomUUID(),
    }
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { user }

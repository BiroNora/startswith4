import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'
import { db } from '$lib/database'


export const load: PageServerLoad = async () => {
	// todo
}

const register: Action = async ({ request }) => {
	const data = await request.formData()
  const name = String(data.get('name'))
  const nationality = String(data.get('nationality'))
  const phone = String(data.get('phone'))
	const email = String(data.get('email'))
  const basic = Boolean(data.get('basic'))
  const regionB = String(data.get('regB')) || null
  const medior = Boolean(data.get('medior'))
  const regionM = String(data.get('regM')) || null
  const high = Boolean(data.get('high'))
  const regionH = String(data.get('regH')) || null
  const superior = Boolean(data.get('superior'))
  const regionS = String(data.get('regS')) || null
  const director = Boolean(data.get('director'))
	const password1 = data.get('password1')
  const password2 = data.get('password2')

	if (typeof email != 'string' ||
      typeof password1 != 'string' ||
      typeof password2 != 'string' ||
      !email || !password1 || !password2 ||
      password1 !== password2) {
		return fail(400, { invalid: true })
	}

  if (regionB == null && regionH == null && regionM == null && regionS == null && director == false) {
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

export const actions: Actions = { register }

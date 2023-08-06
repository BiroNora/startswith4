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
  const regB = String(data.get('regB'))
  const medior = Boolean(data.get('medior'))
  const regM = String(data.get('regM'))
  const high = Boolean(data.get('high'))
  const regH = String(data.get('regH'))
  const superior = Boolean(data.get('superior'))
  const regS = String(data.get('regS'))
  const director = Boolean(data.get('director'))
	const password1 = data.get('password1')
  const password2 = data.get('password2')
  console.log(typeof director)

	if (typeof email != 'string' ||
      typeof password1 != 'string' ||
      typeof password2 != 'string' ||
      !email || !password1 || !password2 ||
      password1 !== password2) {
		return fail(400, { invalid: true })
	}

  const user = await db.user.findUnique({
    where: { email }
  })

  if (user) {
    return fail(400, {user: true})
  }

  const regionB = regB.split(",")
  const regionM = regM.split(",")
  const regionH = regH.split(",")
  const regionS = regS.split(",")

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

import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/database'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'
import { isStrongPassword } from '../../stores/dataStore'

let userEmail: string
let isValide: boolean

export const load: PageServerLoad = async ({ url }) => {
  const token = (url.search).slice(1)

  if (!token) {
    return redirect(302, '../reset-password-error')  }

    const user = await db.user.findFirst({
      where: { resetToken: token },
    })

    if (user && user.active === true && user.resetTokenExpiry && new Date(user.resetTokenExpiry) >= new Date()) {
      userEmail = user.user_email
      isValide = true
      return { isValide, userEmail }
    } else {
      isValide = false
      userEmail = ''
      return { isValide, userEmail }
    }
}

const reset: Action = async ({ request }) => {
  const data = await request.formData()
  const email = userEmail
  const password = data.get('password')
  const password1 = data.get('password1')

  if (
    email.length <= 1 ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof password1 !== 'string' ||
    !email ||
    !password ||
    !password1 ||
    password !== password1 ||
    !isStrongPassword(password)
    ) {
    return fail(400, { credentials: true })
  }

  // generate new auth token just in case
  await db.user.update({
    where: { user_email: email },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID() }
  })

  throw redirect(302, '/auth/login')
}

export const actions: Actions = { reset }

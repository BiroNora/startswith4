import { db } from '$lib/database'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'


export const load: PageServerLoad = async () => {
  // todo
}

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData()
  const user_email = data.get('email')
  const password = data.get('password')

  if (
    typeof user_email !== 'string' ||
    typeof password !== 'string' ||
    !user_email ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const user = await db.user.findUnique({ where: { user_email } })

  if (!user) {
    return fail(400, { credentials: true })
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash)

  if (!userPassword) {
    return fail(400, { credentials: true })
  }

  // generate new auth token just in case
  const authenticatedUser = await db.user.update({
    where: { user_email: user.user_email },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('session', authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  })

  // redirect the user
  throw redirect(302, '/lists/activities')
}

export const actions: Actions = { login }

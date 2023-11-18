import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')
  console.log(session)

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await db.user.findUnique({
    where: { userAuthToken: session },
    select: { user_email: true, user_name: true, on_duty: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      email: user.user_email,
      name: user.user_name,
      duty: user.on_duty
    }
  }

  // load page as normal
  return await resolve(event)
}

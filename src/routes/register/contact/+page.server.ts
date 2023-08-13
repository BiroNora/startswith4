import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { db } from '$lib/database'


const contact: Action = async ({ request }) => {
  const data = await request.formData()
  const contact_name = String(data.get('name'))
  const contact_email = String(data.get('email'))
  const contact_phone = String(data.get('phone'))
  const note = String(data.get('message'))

  const contact = await db.contact.findUnique({
    where: {contact_email}
  })

  if ((contact)) {
    return fail(400, {contact: true})
  }
  await db.contact.create({
    data: {
      contact_email,
      contact_name,
      contact_phone,
      note,
    }
  })

  throw redirect(303, '/register/school')
}

export const actions: Actions = { contact }

import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { db } from '$lib/database'


const contact: Action = async ({ request }) => {
  const data = await request.formData()
  const contact_name = String(data.get('name'))
  const contact_email = String(data.get('email'))
  const contact_phone = String(data.get('phone'))
  const user_email = String(data.get('uemail'))
  const contact_note = String(data.get('message'))

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
      contact_note,
      user_email
    }
  })

  const newcontact = await db.contact.findUnique({
    where: {contact_email}
  })
  console.log(newcontact?.contact_id)

  throw redirect(303, '../lists/contacts')
}

export const actions: Actions = { contact }

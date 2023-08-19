import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { db } from '$lib/database'


const contact: Action = async ({ request }) => {
  const data = await request.formData()
  const contact_name = String(data.get('contactname'))
  const contact_email = String(data.get('contactemail'))
  const contact_phone = String(data.get('contactphone'))
  const user_email = String(data.get('useremail'))
  const school_email = String(data.get('schoolemail'))
  const contact_note = String(data.get('contactmessage'))

  const contact = await db.contact.findUnique({
    where: {contact_email}
  })
  const useremail = await db.user.findUnique({
    where: {user_email}
  })
  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  if ((contact) || (!useremail) || (!schoolemail)) {
    return fail(400, {contact: true})
  }
  else {
    await db.contact.create({
    data: {
      contact_email,
      contact_name,
      contact_phone,
      contact_note,
    }
  })

  await db.contactOnSchool.create({
    data: {
      school_email,
      contact_email
    }
  })

  await db.contactOnUser.create({
    data: {
      user_email,
      contact_email
    }
  })

  throw redirect(303, '../lists/contacts')
  }


}

export const actions: Actions = { contact }

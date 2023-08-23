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
  const common = []

  const contact = await db.contact.findUnique({
    where: { contact_email }
  })
  const useremail = await db.user.findUnique({
    where: { user_email }
  })
  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  const s_id = schoolemail?.school_id
  const u_id = useremail?.user_id

  if ((contact)) {
    return fail(400, { contact: true })
  }

  if ((contact) || (!useremail) || (!schoolemail)) {
    return fail(400, { contacts: true })
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

    const contactid = await db.contact.findUnique({
      where: { contact_email }
    })

    const contid = contactid?.contact_id

    if (!contid) {
      return fail(400, { local: true })
    }
    else {

      common.push(String(contid))
      common.push(String(s_id))
      common.push(String(u_id))

      const commonunique = await db.contactOnUserOnSchool.findUnique({
        where: { common }
      })

      if (commonunique) {
        return fail(400, {real: true})
      }

      await db.contactOnUserOnSchool.create({
        data: {
          common,
        }
      })
    }
  }

  throw redirect(303, '../lists/contacts')
}


export const actions: Actions = { contact }

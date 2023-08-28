import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { db } from '$lib/database'


export const load: PageServerLoad = async () => {
  const contact = await db.contact.findMany({
    orderBy: { contact_name: 'asc' },
  })
  return {contact}
}

const contacts: Action = async ({ request }) => {
  const data = await request.formData()
  const contact_name = String(data.get('name'))
  const contact_email = String(data.get('email'))

  if (contact_name == '1') {
      return fail(400, {school: true})
  }
  const regioncountry = await db.contact.findUnique({
    where: { contact_email }
  })

  throw redirect(303, '/login')
}


export const actions: Actions = { contacts }

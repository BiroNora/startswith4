import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { db } from '$lib/database'

function slugify(text:string) {
  return text
  .replace(/\s/g, '-')
  .replace(/[^a-zA-Z0-9-]/g, '')
  .toLowerCase()
}


const event: Action = async ({ request }) => {
  const data = await request.formData()
  const event_name = String(data.get('fantasy'))
  const clos_date = String(data.get('meeting-time'))
  const on_duty = String(data.get('duty'))
  const event_type = String(data.get('type'))
  const estimated_student = Number(data.get('estimate'))
  const school_email = String(data.get('schoolemail'))
  const user_email = String(data.get('uemail'))
  const note = String(data.get('message'))

  const closing_date = new Date(clos_date)
  closing_date.setHours(closing_date.getHours() + 2)

  const create_date = new Date()
  create_date.setHours(create_date.getHours() + 2)

  const useremail = await db.user.findUnique({
    where: { user_email }
  })
  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  //const school_name = schoolemail?.name
  const school_name = slugify('Eventus Üzleti, Művészeti Szakgimnázium, Technikum, Gimnázium, Szakképző Iskola, Alapfokú Művészeti Iskola és Kollégium')
  console.log(school_name)

  const school_id = schoolemail?.school_id
  const user_id = useremail?.user_id

  if ((!useremail)) {
    return fail(400, { user: true })
  }
  if ((!schoolemail)) {
    return fail(400, { school: true })
  }

  await db.event.create({
    data: {
      event_name,
      create_date,
      closing_date,
      on_duty,
      event_type,
      estimated_student,
      note,
      school_id,
      user_id
    }
  })
  throw redirect(303, '../lists/events')
}


export const actions: Actions = { event }

import { db } from '$lib/database'
import { fail, redirect} from '@sveltejs/kit'
import type { Action, Actions } from './$types'
import { slugify } from '../../stores/dataStore'
import { timeSlugify } from '../../stores/dataStore'
import { hourSetter } from '../../stores/dataStore'


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

  const closing_date = hourSetter(clos_date)
  const slugDate = timeSlugify(clos_date)
  console.log('psqldate' + closing_date)
  console.log('slugDate' + slugDate)

  if (event_name.length < 10) {
    console.log(event_name.length)
    return fail(400, { title: true })
  }

  const useremail = await db.user.findUnique({
    where: { user_email }
  })
  const schoolemail = await db.school.findUnique({
    where: {school_email}
  })

  const city_id = schoolemail?.city_id

  const city = await db.city.findUnique({
    where: { city_id }
  })
  const city_name = city?.city_name
  const school_name = schoolemail?.name
  //const school_name = 'Eventus Üzleti, Művészeti Szakgimnázium, Technikum, Gimnázium, Szakképző Iskola, Alapfokú Művészeti Iskola és Kollégium'
  //const city_name = 'Egerszalók'
  const cn = slugify(String(city_name?.slice(0, 15)))
  const sn = slugify(String(school_name?.slice(0, 15)))
  const se = slugify(event_name.slice(0, 15))
  const slug = slugDate + '-' + cn + '-' + se + '-' + sn
  console.log(slug)

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
      slug,
      school_id,
      user_id
    }
  })
  throw redirect(303, '../lists/events')
}


export const actions: Actions = { event }

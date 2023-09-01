import { error } from '@sveltejs/kit'
import { db } from '$lib/database'
import { eventType, dutyMap3, schType } from '../../../stores/dataStore.js'

let extrType = ''
let extrDuty = ''

export async function load( { params }) {
  const sc_id = Number(params.school_id)
  const school = await db.school.findUnique({
    where: { school_id: sc_id }
  })

  let extrschoolType = ''

  if (school) {
    schType.map((type, index) => {
      const ind = String(index + 1)
      school.school_type.forEach(function (item) {
        if (ind == item) {
          extrschoolType += type
          extrschoolType += ', '
        }
      })
    })
  }

  const res = extrschoolType.slice(0, -2)

  const schooly_id = Number(school?.school_id)

  const event = await db.event.findMany({
    where: { school_id: schooly_id},
    orderBy: { closing_date: 'desc'}
  })

  if (event) {
    for (const obj of event) {
      extrDuty = obj.on_duty
      extrType = obj.event_type
      for (const dM of dutyMap3) {
        if (extrDuty == dM.id) {
          extrDuty = dM.name
        }
      }
      for (const eT of eventType) {
        if (extrType == eT.id) {
          extrType = eT.name
        }
      }
      obj.on_duty = extrDuty
      obj.event_type = extrType
    }
  }

  if (!school) {
    throw error(404, 'School not found')
  }

  return { school, event, res }
}

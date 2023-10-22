import { db } from "$lib/database"
import { fail } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

let eventCount = 0
let estimatedStudent = 0

export const load: PageServerLoad = async () => {
  const years = await db.event.findMany({
		distinct: ["event_year"],
      select: {
        event_year: true,
      },
	})

  if (!years) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const distinctYears = [...new Set(years.map(item => String(item.event_year)))]
  distinctYears.sort()
  distinctYears.unshift('ALL')

  const regions = await db.region.findMany({})

  if (!regions) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const schoolsCount = await db.school.count({
    where: {
			coop: true,
			active: true,
			User: {
				some: {
					NOT: {
						user_id: undefined
					}
				}
			},
		},
  })

  if (!schoolsCount) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const schoolsWithEventCounts = await db.school.findMany({
    where: {
			coop: true,
			active: true,
			User: {
				some: {
					NOT: {
						user_id: undefined
					}
				}
			},
		},
    select: {
      school_id: true,
      Event: {
        select: {
          event_id: true,
          estimated_student: true,
          InterestedStudents: {
            select: {
              intrest_count: true,
              status: true
            }
          }
        },
      },
    },
  })

  if (!schoolsWithEventCounts) {
    return fail(400, {
      error: true,
      message: 'Something went wrong. Please try it later.'
    })
  }

  const eventCounts = schoolsWithEventCounts.map((school) => {
    // Calculate the event_count
    eventCount = school.Event.length

    // Calculate the estimated_student
    estimatedStudent = school.Event.reduce(
      (total, event) => total + (event.estimated_student || 0), 0)

    return {eventCount, estimatedStudent}
  })

  const totalEvents = eventCounts.reduce((total, school) => total + school.eventCount, 0)
  const totalEstStudents = eventCounts.reduce((total, school) => total + school.estimatedStudent, 0)

  // Define type for data
  interface InterestedStudent {
    intrest_count: number
    status: string
  }

  // Use map to extract InterestedStudents arrays
  const allInterestedStudents: InterestedStudent[] = schoolsWithEventCounts.flatMap((school) => {
    return school.Event.flatMap((event) => event.InterestedStudents)
  })

  // Use filter to get InterestedStudents with status
  const interestedWithStat0: InterestedStudent[] =
  allInterestedStudents.filter((student) => student.status === '0')

  const interestedWithStat1: InterestedStudent[] =
  allInterestedStudents.filter((student) => student.status === '1')

  const interestedWithStat2: InterestedStudent[] =
  allInterestedStudents.filter((student) => student.status === '2')

  const interestedWithStat3: InterestedStudent[] =
  allInterestedStudents.filter((student) => student.status === '3')

  // Calculate the grand total intrest_count for status
  const totalIntrest0: number = interestedWithStat0.reduce(
    (total, student) => total + student.intrest_count, 0)

  const totalIntrest1: number = interestedWithStat1.reduce(
    (total, student) => total + student.intrest_count, 0)

  const totalIntrest2: number = interestedWithStat2.reduce(
    (total, student) => total + student.intrest_count, 0)

  const totalIntrest3: number = interestedWithStat3.reduce(
    (total, student) => total + student.intrest_count, 0)

  return {
    distinctYears,
    regions,
    schoolsCount,
    totalEvents,
    totalEstStudents,
    totalIntrest0,
    totalIntrest1,
    totalIntrest2,
    totalIntrest3
  }
}

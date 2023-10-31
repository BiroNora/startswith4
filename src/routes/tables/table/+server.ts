import { db } from '$lib/database'

export async function POST({ request }) {
	const requestBody = await request.text()
	const formData = JSON.parse(requestBody)
	const {
    selectedYear,
    selectedSemester,
    selectedDuty,
    selectedCountry,
    selectedRegion
  } = formData
	console.log('selY ' + selectedYear)
	console.log('selS ' + selectedSemester)
	console.log('selD ' + selectedDuty)
  console.log('selC ' + selectedCountry)
	console.log('selR ' + selectedRegion)

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
    selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('year all, semest string, duty all, country all, reg all')
		try {
			const statusCountry = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          c.country_name,
          CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
        FROM interested i
        JOIN Country c
        ON i.country_id = c.country_id
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY c.country_name
      `
      const statusGrade = await db.$queryRaw`
        WITH UserAggregates AS (
            SELECT
              stu."A" AS school_id,
              STRING_AGG(u.user_name, ', ') AS user_names
            FROM "_SchoolToUser" stu
            JOIN users u ON stu."B" = u.user_id
            GROUP BY stu."A"
          )
        SELECT
          c.country_name,
          CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN Country c
        ON i.country_id = c.country_id
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY c.country_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ statusCountry, statusGrade })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			// Create a Response object and return it
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

			// Return an error response
			const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
				status: 500, // Internal Server Error
				headers: {
					'Content-Type': 'application/json'
				}
			})

			return errorResponse
		}
	}
}


export type RequestPayload = {
	selectedYear: number
	selectedSemester: string
	selectedDuty: string
	selectedRegion: number
  selectedCountry: number
}

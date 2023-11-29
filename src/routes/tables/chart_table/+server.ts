import { db } from '$lib/database'
import { redirect } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  if (!locals.user || locals.user.active === false) {
    throw redirect(302, '/auth/login')
  }

	const requestBody = await request.text()
	const formData = JSON.parse(requestBody)
	const { selectedYear, selectedSemester, selectedDuty, selectedCountry, selectedRegion } = formData
	//console.log('selY ' + selectedYear)
	//console.log('selS ' + selectedSemester)
	//console.log('selD ' + selectedDuty)
	//console.log('selC ' + selectedCountry)
	//console.log('selR ' + selectedRegion)

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('1. year all, semest string, duty all, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('2. year num, semester all, duty all, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
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
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `
			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// ALL, ALL, ALL, ALL, ALL

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('3. year all, semester all, duty all, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE s.coop = TRUE
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
        WHERE s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('4. year num, semester string, duty all, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('5. year all, semest string, duty string, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND e.on_duty IN (${selectedDuty})
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
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('6. year num, semester all, duty string, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('7. year all, semester all, duty string, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.on_duty IN (${selectedDuty})
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
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion == null
	) {
		console.log('8. year num, semester string, duty string, country all, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// Country NUM, region ALL

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('9. year all, semest string, duty all, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND i.country_id IN (${selectedCountry})
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
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('10. year num, semester all, duty all, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
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
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('11. year all, semester all, duty all, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE i.country_id IN (${selectedCountry})
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
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('12. year num, semester string, duty all, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('13. year all, semest string, duty string, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
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
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('14. year num, semester all, duty string, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('15. year all, semester all, duty string, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion == null
	) {
		console.log('16. year num, semester string, duty string, country num, reg all')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// COUNRY NUM, 1. REGION NUM

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('17. year all, semest string, duty all, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
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
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('18. year num, semester all, duty all, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('19. year all, semester all, duty all, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
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
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('20. year num, semester string, duty all, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.country_id IN(${selectedCountry})
          AND i.region_id IN(${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// selectedDuty != 'ALL'

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('21. year all, semest string, duty string, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
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
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('22. year num, semester all, duty string, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('23. year all, semester all, duty string, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// NUMS AND STRINGS!

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry != null &&
		selectedRegion != null
	) {
		console.log('24. year num, semester string, duty string, country num, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.country_id IN (${selectedCountry})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// COUNTRY ALL, 2.REGION NUM

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('25. year all, semest string, duty all, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND i.region_id IN (${selectedRegion})
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
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('26. year num, semester all, duty all, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('27. year all, semester all, duty all, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE i.region_id IN (${selectedRegion})
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
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty == 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('28. year num, semester string, duty all, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	// selectedDuty != 'ALL'

	if (
		selectedYear == null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('29. year all, semest string, duty string, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
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
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('30. year num, semester all, duty string, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear == null &&
		selectedSemester == 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('31. year all, semester all, duty string, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

	if (
		selectedYear != null &&
		selectedSemester != 'ALL' &&
		selectedDuty != 'ALL' &&
		selectedCountry == null &&
		selectedRegion != null
	) {
		console.log('32. year num, semester string, duty string, country all, reg num')
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
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          CAST(SUM(i.intrest_count) AS INTEGER) AS total_intrest_count,
          CAST(SUM(CASE WHEN i.status != '0' THEN i.intrest_count ELSE 0 end) AS INTEGER) AS intert,
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
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
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `
			const admittedGrade = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_1,
          CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_2,
          CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_3,
          CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_4,
          CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_status_5
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `
			const subjectIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
      `

			const subjectAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_1,
          CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_2,
          CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_3,
          CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_4,
          CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_5,
          CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_6,
          CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_7,
          CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_8,
          CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_9,
          CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_10,
          CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_11,
          CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_12,
          CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_13,
          CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_work_title_14
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
      `

			const regionIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name
      `

			const regionAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          r.region_name,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY r.region_name
      `

			const channelIntrest = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			const channelAdmitted = await db.$queryRaw`
        WITH UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        )
        SELECT
          i.channel,
          CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count
        FROM interested i
        JOIN events e
        ON e.event_id = i.event_id
        JOIN schools s
        ON e.school_id = s.school_id
        JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND i.region_id IN (${selectedRegion})
          AND s.coop = TRUE
          AND s.active = TRUE
          AND i.status = '1'
        GROUP BY i.channel
        ORDER BY CAST(i.channel AS INTEGER) ASC
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				statusCountry,
				statusGrade,
				admittedGrade,
				subjectIntrest,
				subjectAdmitted,
				regionIntrest,
				regionAdmitted,
				channelIntrest,
				channelAdmitted
			})
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

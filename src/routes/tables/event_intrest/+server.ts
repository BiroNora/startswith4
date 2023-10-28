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
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
            CAST(SUM(CASE WHEN i.channel = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_1,
            CAST(SUM(CASE WHEN i.channel = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_2,
            CAST(SUM(CASE WHEN i.channel = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_3,
            CAST(SUM(CASE WHEN i.channel = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_4,
            CAST(SUM(CASE WHEN i.channel = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_5,
            CAST(SUM(CASE WHEN i.channel = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_6,
            CAST(SUM(CASE WHEN i.channel = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_7,
            CAST(SUM(CASE WHEN i.channel = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_8,
            CAST(SUM(CASE WHEN i.channel = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_9,
            CAST(SUM(CASE WHEN i.channel = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_channel_10,
            CAST(SUM(CASE WHEN i.grade = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_1,
            CAST(SUM(CASE WHEN i.grade = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_2,
            CAST(SUM(CASE WHEN i.grade = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_3,
            CAST(SUM(CASE WHEN i.grade = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_4,
            CAST(SUM(CASE WHEN i.grade = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_grade_5,
            CAST(SUM(CASE WHEN i.work_title = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_1,
            CAST(SUM(CASE WHEN i.work_title = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_2,
            CAST(SUM(CASE WHEN i.work_title = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_3,
            CAST(SUM(CASE WHEN i.work_title = '4' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_4,
            CAST(SUM(CASE WHEN i.work_title = '5' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_5,
            CAST(SUM(CASE WHEN i.work_title = '6' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_6,
            CAST(SUM(CASE WHEN i.work_title = '7' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_7,
            CAST(SUM(CASE WHEN i.work_title = '8' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_8,
            CAST(SUM(CASE WHEN i.work_title = '9' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_9,
            CAST(SUM(CASE WHEN i.work_title = '10' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_10,
            CAST(SUM(CASE WHEN i.work_title = '11' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_11,
            CAST(SUM(CASE WHEN i.work_title = '12' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_12,
            CAST(SUM(CASE WHEN i.work_title = '13' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_13,
            CAST(SUM(CASE WHEN i.work_title = '14' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_work_title_14
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student,
            CAST(SUM(CASE WHEN e.event_type = '1' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_1,
            CAST(SUM(CASE WHEN e.event_type = '2' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_2,
            CAST(SUM(CASE WHEN e.event_type = '3' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_3,
            CAST(SUM(CASE WHEN e.event_type = '4' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_4,
            CAST(SUM(CASE WHEN e.event_type = '5' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_5,
            CAST(SUM(CASE WHEN e.event_type = '6' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_6,
            CAST(SUM(CASE WHEN e.event_type = '7' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_7,
            CAST(SUM(CASE WHEN e.event_type = '8' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_8,
            CAST(SUM(CASE WHEN e.event_type = '9' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_9,
            CAST(SUM(CASE WHEN e.event_type = '10' THEN e.estimated_student ELSE 0 END) AS INTEGER) AS event_type_10
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(es.event_type_1, 0) AS sum_event_type_1,
          COALESCE(es.event_type_2, 0) AS sum_event_type_2,
          COALESCE(es.event_type_3, 0) AS sum_event_type_3,
          COALESCE(es.event_type_4, 0) AS sum_event_type_4,
          COALESCE(es.event_type_5, 0) AS sum_event_type_5,
          COALESCE(es.event_type_6, 0) AS sum_event_type_6,
          COALESCE(es.event_type_7, 0) AS sum_event_type_7,
          COALESCE(es.event_type_8, 0) AS sum_event_type_8,
          COALESCE(es.event_type_9, 0) AS sum_event_type_9,
          COALESCE(es.event_type_10, 0) AS sum_event_type_10,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          COALESCE(ic.intrest_count_channel_1, 0) AS total_intrest_count_channel_1,
          COALESCE(ic.intrest_count_channel_2, 0) AS total_intrest_count_channel_2,
          COALESCE(ic.intrest_count_channel_3, 0) AS total_intrest_count_channel_3,
          COALESCE(ic.intrest_count_channel_4, 0) AS total_intrest_count_channel_4,
          COALESCE(ic.intrest_count_channel_5, 0) AS total_intrest_count_channel_5,
          COALESCE(ic.intrest_count_channel_6, 0) AS total_intrest_count_channel_6,
          COALESCE(ic.intrest_count_channel_7, 0) AS total_intrest_count_channel_7,
          COALESCE(ic.intrest_count_channel_8, 0) AS total_intrest_count_channel_8,
          COALESCE(ic.intrest_count_channel_9, 0) AS total_intrest_count_channel_9,
          COALESCE(ic.intrest_count_channel_10, 0) AS total_intrest_count_channel_10,
          COALESCE(ic.intrest_grade_1, 0) AS total_intrest_grade_1,
          COALESCE(ic.intrest_grade_2, 0) AS total_intrest_grade_2,
          COALESCE(ic.intrest_grade_3, 0) AS total_intrest_grade_3,
          COALESCE(ic.intrest_grade_4, 0) AS total_intrest_grade_4,
          COALESCE(ic.intrest_grade_5, 0) AS total_intrest_grade_5,
          COALESCE(ic.intrest_count_work_title_1, 0) AS total_intrest_count_work_title_1,
          COALESCE(ic.intrest_count_work_title_2, 0) AS total_intrest_count_work_title_2,
          COALESCE(ic.intrest_count_work_title_3, 0) AS total_intrest_count_work_title_3,
          COALESCE(ic.intrest_count_work_title_4, 0) AS total_intrest_count_work_title_4,
          COALESCE(ic.intrest_count_work_title_5, 0) AS total_intrest_count_work_title_5,
          COALESCE(ic.intrest_count_work_title_6, 0) AS total_intrest_count_work_title_6,
          COALESCE(ic.intrest_count_work_title_7, 0) AS total_intrest_count_work_title_7,
          COALESCE(ic.intrest_count_work_title_8, 0) AS total_intrest_count_work_title_8,
          COALESCE(ic.intrest_count_work_title_9, 0) AS total_intrest_count_work_title_9,
          COALESCE(ic.intrest_count_work_title_10, 0) AS total_intrest_count_work_title_10,
          COALESCE(ic.intrest_count_work_title_11, 0) AS total_intrest_count_work_title_11,
          COALESCE(ic.intrest_count_work_title_12, 0) AS total_intrest_count_work_title_12,
          COALESCE(ic.intrest_count_work_title_13, 0) AS total_intrest_count_work_title_13,
          COALESCE(ic.intrest_count_work_title_14, 0) AS total_intrest_count_work_title_14,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          sum_event_type_1,
          sum_event_type_2,
          sum_event_type_3,
          sum_event_type_4,
          sum_event_type_5,
          sum_event_type_6,
          sum_event_type_7,
          sum_event_type_8,
          sum_event_type_9,
          sum_event_type_10,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          total_intrest_count_channel_1,
          total_intrest_count_channel_2,
          total_intrest_count_channel_3,
          total_intrest_count_channel_4,
          total_intrest_count_channel_5,
          total_intrest_count_channel_6,
          total_intrest_count_channel_7,
          total_intrest_count_channel_8,
          total_intrest_count_channel_9,
          total_intrest_count_channel_10,
          total_intrest_grade_1,
          total_intrest_grade_2,
          total_intrest_grade_3,
          total_intrest_grade_4,
          total_intrest_grade_5,
          total_intrest_count_work_title_1,
          total_intrest_count_work_title_2,
          total_intrest_count_work_title_3,
          total_intrest_count_work_title_4,
          total_intrest_count_work_title_5,
          total_intrest_count_work_title_6,
          total_intrest_count_work_title_7,
          total_intrest_count_work_title_8,
          total_intrest_count_work_title_9,
          total_intrest_count_work_title_10,
          total_intrest_count_work_title_11,
          total_intrest_count_work_title_12,
          total_intrest_count_work_title_13,
          total_intrest_count_work_title_14,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        LEFT JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		selectedRegion == null
	) {
		console.log('year all, semester all, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
        ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE s.country_id IN(${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE s.country_id IN(${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE s.country_id IN(${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        LEFT JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE s.country_id IN(${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          JOIN schools s USING (school_id)
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.country_id IN(${selectedCountry})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s -- Define the 's' alias here
            ON e.school_id = s.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.country_id IN(${selectedCountry})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE s.country_id IN(${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        LEFT JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE s.country_id IN(${selectedCountry})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.country_id IN(${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.country_id IN (${selectedCountry})
          AND s.region_id IN (${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty string, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.region_id IN (${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty string, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.region_id IN (${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty string, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.country_id IN(${selectedCountry})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty string, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.country_id IN (${selectedCountry})
            AND s.region_id IN (${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.country_id IN (${selectedCountry})
          AND s.region_id IN (${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty all, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty all, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty all, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        LEFT JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty all, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semest string, duty string, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({ schoolsData })
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
		console.log('year num, semester all, duty string, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year all, semester all, duty string, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200
			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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
		console.log('year num, semester string, duty string, country all, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s USING (school_id)
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY e.school_id
          ),
              UserAggregates AS (
          SELECT
            stu."A" AS school_id,
            STRING_AGG(u.user_name, ', ') AS user_names
          FROM "_SchoolToUser" stu
          JOIN users u ON stu."B" = u.user_id
          GROUP BY stu."A"
          ),
              IntrestCountStatus AS (
          SELECT
            s.school_id,
            CAST(SUM(CASE WHEN i.status = '0' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_0,
            CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
            CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          LEFT JOIN interested i ON e.event_id = i.event_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
          ),
              EstimatedStudent AS (
          SELECT
            s.school_id,
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
          FROM schools s
          JOIN events e ON s.school_id = e.school_id
          WHERE e.event_year IN (${selectedYear})
            AND e.semester IN (${selectedSemester})
            AND e.on_duty IN (${selectedDuty})
            AND s.region_id IN(${selectedRegion})
            AND s.active = true
            AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
          GROUP BY s.school_id
        )
        SELECT
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          COALESCE(ec.event_count, 0) AS event_count,
          COALESCE(es.sum_estimated_student, 0) AS sum_estimated_student,
          COALESCE(ic.intrest_count_status_0, 0) AS total_intrest_count_status_0,
          COALESCE(ic.intrest_count_status_1, 0) AS total_intrest_count_status_1,
          COALESCE(ic.intrest_count_status_2, 0) AS total_intrest_count_status_2,
          COALESCE(ic.intrest_count_status_3, 0) AS total_intrest_count_status_3,
          s.active
        FROM schools s
        JOIN "_SchoolToUser" stu
          ON stu."A" = s.school_id
        JOIN users u
          ON stu."B" = u.user_id
        JOIN country country
          ON s.country_id = country.country_id
        JOIN region r
          ON s.region_id = r.region_id
        JOIN county county
          ON s.county_id = county.county_id
        JOIN city c
          ON s.city_id = c.city_id
        JOIN events e
          USING (school_id)
        LEFT JOIN interested i
          ON e.event_id = i.event_id
        LEFT JOIN EventCounts ec
          ON s.school_id = ec.school_id
        LEFT JOIN UserAggregates ua
          ON s.school_id = ua.school_id
        LEFT JOIN IntrestCountStatus ic
          ON s.school_id = ic.school_id
        LEFT JOIN EstimatedStudent es
          ON s.school_id = es.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.region_id IN(${selectedRegion})
          AND s.active = true
          AND EXISTS (SELECT 1 FROM "_SchoolToUser" sub_stu WHERE sub_stu."A" = s.school_id)
        GROUP BY
          ua.user_names,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.basic,
          s.medior,
          s.high,
          ec.event_count,
          es.sum_estimated_student,
          total_intrest_count_status_0,
          total_intrest_count_status_1,
          total_intrest_count_status_2,
          total_intrest_count_status_3,
          s.active
        ORDER BY s.school_name
      `

			await db.$disconnect()

			const responseBody = JSON.stringify({ schoolsData })
			const responseHeaders = {
				'Content-Type': 'application/json'
			}
			const responseStatus = 200

			const response = new Response(responseBody, {
				status: responseStatus,
				headers: responseHeaders
			})

			return response
		} catch (error) {
			console.error('Error:', error)

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

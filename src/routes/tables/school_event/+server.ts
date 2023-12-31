import { db } from '$lib/database'
import { redirect } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  if (!locals.user || locals.user.active === false) {
    throw redirect(302, '/auth/login')
  }

	const requestBody = await request.text()
	const formData = JSON.parse(requestBody)
	const {
    selectedYear,
    selectedSemester,
    selectedDuty,
    selectedCountry,
    selectedRegion
  } = formData

	if (
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('year all, semest string, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
            CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3
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
            CAST(SUM(e.estimated_student) AS INTEGER) AS sum_estimated_student
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('year num, semester all, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('year all, semester all, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('4. year num, semester string, duty all, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('5. year all, semest string, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('6. year num, semester all, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('7. year all, semester all, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('8. year num, semester string, duty string, country all, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('9. year all, semest string, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('10. year num, semester all, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('11. year all, semester all, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('12. year num, semester string, duty all, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
            ON e.school_id = s.school_id
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('13. year all, semest string, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('14. year num, semester all, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('15. year all, semester all, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion === null || selectedRegion === undefined)
	) {
		console.log('16. year num, semester string, duty string, country num, reg all')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('17. year all, semest string, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
            ON e.school_id = s.school_id
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('18. year num, semester all, duty all, country num, reg num')
		try {
			const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
          SELECT
              e.school_id,
              COALESCE(CAST(COUNT(*) AS INTEGER), 0) AS event_count
          FROM events e
          JOIN schools s
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('19. year all, semester all, duty all, country num, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('20. year num, semester string, duty all, country num, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('21. year all, semest string, duty string, country num, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('22. year num, semester all, duty string, country num, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('23. year all, semester all, duty string, country num, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry !== null && selectedCountry !== undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('24. year num, semester string, duty string, country num, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('25. year all, semest string, duty all, country all, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('26. year num, semester all, duty all, country all, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('27. year all, semester all, duty all, country all, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('28. year num, semester string, duty all, country all, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('29. year all, semest string, duty string, country all, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('30. year num, semester all, duty string, country all, reg num')
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
		(selectedYear === null || selectedYear === undefined) &&
		selectedSemester === 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('31. year all, semester all, duty string, country all, reg num')
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
		(selectedYear !== null && selectedYear !== undefined) &&
		selectedSemester !== 'ALL' &&
		selectedDuty !=='ALL' &&
		(selectedCountry === null || selectedCountry === undefined) &&
		(selectedRegion !== null && selectedRegion !== undefined)
	) {
		console.log('32. year num, semester string, duty string, country all, reg num')
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

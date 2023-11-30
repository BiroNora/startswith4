import { db } from '$lib/database'
import { redirect } from '@sveltejs/kit'

export async function POST({ request, locals }) {
  if (!locals.user || locals.user.active === false) {
    throw redirect(302, '/auth/login')
  }

	const requestBody = await request.text()
	const formData = JSON.parse(requestBody)
	const { selectedYear, selectedSemester, selectedDuty } = formData
	console.log('selY ' + selectedYear)
	console.log('selS ' + selectedSemester)
	console.log('selD ' + selectedDuty)

	if (
		selectedYear === null &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL'
	) {
		console.log('1. year all, semest string, duty all')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear !== null &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL'
	) {
		console.log('2. year num, semest all, duty all')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear === null &&
		selectedSemester === 'ALL' &&
		selectedDuty === 'ALL'
	) {
		console.log('3. year all, semest all, duty all')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear !== null &&
		selectedSemester !== 'ALL' &&
		selectedDuty === 'ALL'
	) {
		console.log('4. year num, semest string, duty all')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear === null &&
		selectedSemester !== 'ALL' &&
		selectedDuty !== 'ALL'
	) {
		console.log('5. year all, semest string, duty string')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear !== null &&
		selectedSemester !== 'ALL' &&
		selectedDuty !== 'ALL'
	) {
		console.log('6. year num, semest string, duty string')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.semester IN (${selectedSemester})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear === null &&
		selectedSemester === 'ALL' &&
		selectedDuty !== 'ALL'
	) {
		console.log('7. year all, semest all, duty string')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
		selectedYear !== null &&
		selectedSemester === 'ALL' &&
		selectedDuty !== 'ALL'
	) {
		console.log('8. year num, semest all, duty string')
		try {
			const regionIntAdm = await db.$queryRaw`
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
              CAST(SUM(i.intrest_count) AS INTEGER) AS intrest_count,
              CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1
        FROM interested i
        JOIN region r
        USING (region_id)
        JOIN events e
        USING (event_id)
        JOIN schools s
          ON e.school_id = s.school_id
          JOIN UserAggregates ua
        ON s.school_id = ua.school_id
        WHERE e.event_year IN (${selectedYear})
          AND e.on_duty IN (${selectedDuty})
          AND s.coop = TRUE
          AND s.active = TRUE
        GROUP BY r.region_name;
      `

			await db.$disconnect()
			// Create a JSON response object
			const responseBody = JSON.stringify({
				regionIntAdm
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
}

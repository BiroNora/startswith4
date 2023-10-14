import { db } from '$lib/database'

export async function POST({ request }) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)
    // Access the "year" and "semester" properties
  const { selectedYear, selectedSemester, selectedDuty } = formData
  console.log('selY ' + selectedYear)
  console.log('selS ' + selectedSemester)
  console.log('selD ' + selectedDuty)

  if (selectedYear == null && selectedSemester != 'ALL' && selectedDuty == 'ALL') {
    console.log('year all, semest string')
    try {
      const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.semester IN (${selectedSemester})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
        ec.event_count,
        e.event_year,
        e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.semester IN (${selectedSemester})
        GROUP BY
        e.event_name,
        e.on_duty,
        ec.event_count,
        e.event_year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()
      // Create a JSON response object
      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      // Create a Response object and return it
      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      // Return an error response
      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear != null && selectedSemester == 'ALL' && selectedDuty == 'ALL') {
    console.log('semester all')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.event_year IN (${selectedYear})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.event_year IN (${selectedYear})
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear == null && selectedSemester == 'ALL' && selectedDuty == 'ALL') {
    console.log('year null, semester all')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200
      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear != null && selectedSemester != 'ALL' && selectedDuty == 'ALL') {
    console.log('year and semester given')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.event_year IN (${selectedYear}) AND e.semester IN (${selectedSemester})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.event_year IN (${selectedYear}) AND e.semester IN (${selectedSemester})
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  // selectedDuty != 'ALL'

  if (selectedYear == null && selectedSemester != 'ALL' && selectedDuty != 'ALL') {
    console.log('year all, semest string, duty string')
    try {
      const schoolsData = await db.$queryRaw`
        WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.semester IN (${selectedSemester}) AND e.on_duty IN (${selectedDuty})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
        ec.event_count,
        e.event_year,
        e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.semester IN (${selectedSemester}) AND e.on_duty IN (${selectedDuty})
        GROUP BY
        e.event_name,
        e.on_duty,
        ec.event_count,
        e.event_year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()
      // Create a JSON response object
      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      // Create a Response object and return it
      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      // Return an error response
      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear != null && selectedSemester == 'ALL' && selectedDuty != 'ALL') {
    console.log('semester all, duty string')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.event_year IN (${selectedYear}) AND e.on_duty IN (${selectedDuty})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.event_year IN (${selectedYear}) AND e.on_duty IN (${selectedDuty})
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear == null && selectedSemester == 'ALL' && selectedDuty != 'ALL') {
    console.log('year null, semester all, duty string')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.on_duty IN (${selectedDuty})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.on_duty IN (${selectedDuty})
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200
      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return errorResponse
    }
  }

  if (selectedYear != null && selectedSemester != 'ALL' && selectedDuty != 'ALL') {
    console.log('year and semester given, duty string')
    try {
      const schoolsData = await db.$queryRaw`
       WITH EventCounts AS (
        SELECT
            e.school_id,
            CAST(COUNT(*)AS INTEGER) AS event_count
        FROM events e
        WHERE e.event_year IN (${selectedYear}) AND e.semester IN (${selectedSemester}) AND e.on_duty IN (${selectedDuty})
        GROUP BY e.school_id
        )
        SELECT
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          u.user_name,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          CAST(SUM(CASE WHEN i.status = '1' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_1,
          CAST(SUM(CASE WHEN i.status = '2' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_2,
          CAST(SUM(CASE WHEN i.status = '3' THEN i.intrest_count ELSE 0 END) AS INTEGER) AS intrest_count_status_3,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
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
        WHERE e.event_year IN (${selectedYear}) AND e.semester IN (${selectedSemester}) AND e.on_duty IN (${selectedDuty})
        GROUP BY
        e.event_name,
        e.on_duty,
          ec.event_count,
          e.event_year,
          e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          u.user_name,
          e.estimated_student,
          s.school_id,
          s.school_name,
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s.school_name
      `;

      await db.$disconnect()

      const responseBody = JSON.stringify({ schoolsData })
      const responseHeaders = {
        'Content-Type': 'application/json',
      }
      const responseStatus = 200

      const response = new Response(responseBody, {
        status: responseStatus,
        headers: responseHeaders,
      })

      return response
    } catch (error) {
      console.error('Error:', error)

      const errorResponse = new Response(JSON.stringify({ error: 'An error occurred' }), {
        status: 500, // Internal Server Error
        headers: {
          'Content-Type': 'application/json',
        },
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

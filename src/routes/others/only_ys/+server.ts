import { db } from '$lib/database'

export async function POST({ request }) {
  const requestBody = await request.text()
  const formData = JSON.parse(requestBody)
    // Access the "year" and "semester" properties
  const { selectedYear, selectedSemester } = formData
  console.log(selectedYear)
  console.log(selectedSemester)
  if (selectedYear == null && selectedSemester != 'ALL') {
    try {
      const schoolsData = await db.$queryRaw`
        SELECT
        e.year,
        e.semester,
          u."name",
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
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
        WHERE e.semester IN (${selectedSemester})
        GROUP BY
        e.year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          u."name",
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s."name"
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

  if ((selectedYear != null && selectedYear != 0) && selectedSemester == 'ALL') {
    console.log('semester all')
    try {
      const schoolsData = await db.$queryRaw`
        SELECT
        e.year,
        e.semester,
          u."name",
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
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
        WHERE e."year" IN (${selectedYear})
        GROUP BY
        e.year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          u."name",
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s."name"
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

  if ((selectedYear == null || selectedYear == 0) && selectedSemester == 'ALL') {
    console.log('year null, semester all')
    try {
      const schoolsData = await db.$queryRaw`
        SELECT
        e.year,
        e.semester,
          u."name",
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
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
        GROUP BY
        e.year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          u."name",
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s."name"
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

  if (selectedYear != null && selectedSemester != 'ALL') {
    console.log('Oh')
    try {
      const schoolsData = await db.$queryRaw`
        SELECT
        e.year,
        e.semester,
          u."name",
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
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
        WHERE e."year" IN (${selectedYear}) AND e.semester IN (${selectedSemester})
        GROUP BY
        e.year,
        e.semester,
          country.country_name,
          r.region_name,
          county.county_name,
          c.city_name,
          i."count",
          i.status,
          u."name",
          e.event_name,
          e.estimated_student,
          s.school_id,
          s."name",
          s.zip_code,
          s.address,
          s.school_type,
          s.duty
        ORDER BY s."name"
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
  selectedYear: number;
  selectedSemester: string;
}

import { db } from '$lib/database'

export async function POST({ request }) {
  const requestBody = await request.text()
  //console.log('Received request body:', requestBody)
  const formData = JSON.parse(requestBody)
    // Access the "year" and "semester" properties
  const { selectedYear, selectedSemester } = formData
  //console.log('Selected Year:', selectedYear)
  //console.log('Selected Semester:', selectedSemester)

  // Do further processing with the parameters

  try {
    if (!selectedYear ) {
      throw new Error('year Invalid request body');
    }
    if (!selectedSemester) {
      throw new Error('semester request body');
    }
    if (!request.body) {
      throw new Error('Invalid request body');
    }
    const schoolsData = await db.$queryRaw`
      SELECT
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
    `;
    //console.log(schoolsData)

    // Close the Prisma client connection
    await db.$disconnect();

    // Create a JSON response object
    const responseBody = JSON.stringify({ schoolsData })
    const responseHeaders = {
      'Content-Type': 'application/json',
    }
    const responseStatus = 200;

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

    return errorResponse;
  }
}

export type RequestPayload = {
  selectedYear: number;
  selectedSemester: string;
}

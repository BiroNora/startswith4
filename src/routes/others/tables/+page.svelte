<script lang="ts">
	import type { InterestedStudents } from '@prisma/client'
	import { schType, seasonSlugify } from '../../stores/dataStore'
	import type { PageServerData } from './$types'

  export let data: PageServerData

  const { schools, countries, regions, counties, cities, events } = data

	let pageName="Tables"

	// Schootypes
	function getType(arr: string[]): string {
		let types: string = ''

		arr.forEach((value: string) => {
			const index: number = parseInt(value, 10) - 1 // Convert value to integer and subtract 1 to match array index
			if (index >= 0 && index < schType.length) {
				types += schType[index] + ', '
			}
		})
		types = types.slice(0, -2)
		return types
	}

	const evs = schools.map((school) => ({
		...school,
		eventsCount: school.Event.length,
	}))

	const initialTotalEventCount = evs.reduce(
		(total, school) => total + school.eventsCount, 0)

	let initialTotalStudentCount = events.reduce(
		(total: number, event: any) => total + (event.estimated_student || 0), 0)

	let initialTotalIntrStudentCount = events.reduce((total: number, event: any) => {
		if (event.InterestedStudents) {
			// Filter InterestedStudents with status === "0" and sum their counts
			const countWithStateZero = event.InterestedStudents
				.filter((student: any) => student.status === '0')
				.reduce((sum: number, student: any) => sum + student.count, 0)

			return total + countWithStateZero
		}
		return total
	}, 0)

	let initialTotalIntrStudentCountOne = events.reduce((total: number, event: any) => {
		if (event.InterestedStudents) {
			const countWithStateOne = event.InterestedStudents
				.filter((student: any) => student.status === '1')
				.reduce((sum: number, student: any) => sum + student.count, 0)

			return total + countWithStateOne
		}
		return total
	}, 0)

	let initialTotalIntrStudentCountTwo = events.reduce((total: number, event: any) => {
		if (event.InterestedStudents) {
			const countWithStateTwo = event.InterestedStudents
				.filter((student: any) => student.status === '2')
				.reduce((sum: number, student: any) => sum + student.count, 0)

			return total + countWithStateTwo
		}
		return total
	}, 0)

	let initialTotalIntrStudentCountThree = events.reduce((total: number, event: any) => {
		if (event.InterestedStudents) {
			const countWithStateThree = event.InterestedStudents
				.filter((student: any) => student.status === '3')
				.reduce((sum: number, student: any) => sum + student.count, 0)

			return total + countWithStateThree
		}
		return total
	}, 0)

	let schoolCount: number = schools.length

	// Define a type for the events parameter
	type EventWithEstimatedStudent = {
		estimated_student?: number,
		InterestedStudents: InterestedStudents[] }

	// Function to update the total event count
	function updateTotalEventCount(filteredEvents: EventWithEstimatedStudent[]) {
		const totalEventCountCell = document.getElementById("totalEventCount")

		if (totalEventCountCell) {
			// Calculate the total count of events
			const totalEventCount = filteredEvents.length
			// Update the total event count in the header cell
			totalEventCountCell.textContent = String(totalEventCount)
		}
	}

	function add(events: EventWithEstimatedStudent[]) {
		return events.reduce((total: number, event) => total + (event.estimated_student || 0), 0)
	}

	function addInterest(interestedStudents: InterestedStudents[]): number {
		return interestedStudents.reduce((total: number, student) => {
			if (student.status === '0') {
				return total + student.count
			}
			return total
		}, 0)
	}

	function addInterestOne(interestedStudents: InterestedStudents[]): number {
		return interestedStudents.reduce((total: number, student) => {
			if (student.status === '1') {
				return total + student.count
			}
			return total
		}, 0)
	}

	function addInterestTwo(interestedStudents: InterestedStudents[]): number {
		return interestedStudents.reduce((total: number, student) => {
			if (student.status === '2') {
				return total + student.count
			}
			return total
		}, 0)
	}

	function addInterestThree(interestedStudents: InterestedStudents[]): number {
		return interestedStudents.reduce((total: number, student) => {
			if (student.status === '3') {
				return total + student.count
			}
			return total
		}, 0)
	}

	function calculateInterestForSchoolEvents(events: EventWithEstimatedStudent[]): number {
		return events.reduce((total: number, event) => {
			if (event.InterestedStudents) {
				const studentsWithStatusZero = event.InterestedStudents.filter(
					student => student.status === '0'
				);
				const countWithStatusZero = studentsWithStatusZero.reduce(
					(sum, student) => sum + student.count,
					0
				)
				return total + countWithStatusZero
			}
			return total
		}, 0)
	}

	function calculateInterestForSchoolEventsOne(events: EventWithEstimatedStudent[]): number {
		return events.reduce((total: number, event) => {
			if (event.InterestedStudents) {
				const studentsWithStatusOne = event.InterestedStudents.filter(
					student => student.status === '1'
				)
				const countWithStatusOne = studentsWithStatusOne.reduce(
					(sum, student) => sum + student.count,
					0
				)
				return total + countWithStatusOne
			}
			return total
		}, 0)
	}

	function calculateInterestForSchoolEventsTwo(events: EventWithEstimatedStudent[]): number {
		return events.reduce((total: number, event) => {
			if (event.InterestedStudents) {
				const studentsWithStatusTwo = event.InterestedStudents.filter(
					student => student.status === '2'
				)
				const countWithStatusTwo = studentsWithStatusTwo.reduce(
					(sum, student) => sum + student.count,
					0
				)
				return total + countWithStatusTwo
			}
			return total
		}, 0)
	}

	function calculateInterestForSchoolEventsThree(events: EventWithEstimatedStudent[]): number {
		return events.reduce((total: number, event) => {
			if (event.InterestedStudents) {
				const studentsWithStatusThree = event.InterestedStudents.filter(
					student => student.status === '3'
				);
				const countWithStatusThree = studentsWithStatusThree.reduce(
					(sum, student) => sum + student.count,
					0
				)
				return total + countWithStatusThree
			}
			return total
		}, 0)
	}

	function searchTable() {
		const input = document.getElementById("searchInput") as HTMLInputElement
		const filter = input.value.toUpperCase()
		const table = document.querySelector(".table") as HTMLTableElement
		const rows = table.getElementsByTagName("tr")
		const totalStudentCountCell = document.getElementById("totalStudentCount")
		const totalInterestedStudentCountCell = document.getElementById("totalInterestedStudentCount")
		const totalInterestedStudentCountCellOne = document.getElementById("totalInterestedStudentCountOne")
		const totalInterestedStudentCountCellTwo = document.getElementById("totalInterestedStudentCountTwo")
		const totalInterestedStudentCountCellThree = document.getElementById("totalInterestedStudentCountThree")

		if (totalStudentCountCell && totalInterestedStudentCountCell) {
			let filteredStudents: EventWithEstimatedStudent[] = []
			let filteredSchoolCount = 0

			let filteredEvents: EventWithEstimatedStudent[] = []
			let filteredInterestedStudents: InterestedStudents[] = []

			for (let i = 0; i < rows.length; i++) {
				const cells = rows[i].getElementsByTagName("td")

				if (i !== 0) { // Skip the header row
					let found = false

					for (let j = 0; j < cells.length; j++) {
						const cell = cells[j]
						const text = cell.textContent || cell.innerText

						if (text.toUpperCase().indexOf(filter) > -1) {
							found = true
							break
						}
					}

					if (found) {
						rows[i].style.display = ""
						// Get the corresponding school
						const school = schools[i - 1];
						// Include the InterestedStudents from the school's events if they exist
						if (school.Event) {
							school.Event.forEach((event) => {
								if (event.InterestedStudents) {
									filteredInterestedStudents.push(...event.InterestedStudents)
								}
							})
          }
						// Update the total student count and school count
						if (school.Event) {
							filteredStudents.push(...school.Event)
							filteredEvents.push(...school.Event)
							filteredSchoolCount++
						}
					} else {
						rows[i].style.display = "none"
					}
				}
			}
			// Calculate the sum of estimated_student values in filteredStudents
			const totalStudentCount = add(filteredStudents)

			// Calculate the total interested student count
			const totalInterestedStudentCount = addInterest(filteredInterestedStudents)
			const totalInterestedStudentCountOne = addInterestOne(filteredInterestedStudents)
			const totalInterestedStudentCountTwo = addInterestTwo(filteredInterestedStudents)
			const totalInterestedStudentCountThree = addInterestThree(filteredInterestedStudents)

			// Update the total student count in the header cell
			totalStudentCountCell.textContent = String(totalStudentCount)

			// Call the new updateTotalEventCount function with the filtered events
			updateTotalEventCount(filteredEvents)

			// Update the total interested student count in the header cell
			totalInterestedStudentCountCell.textContent = String(totalInterestedStudentCount)
			totalInterestedStudentCountCellOne!.textContent = String(totalInterestedStudentCountOne)
			totalInterestedStudentCountCellTwo!.textContent = String(totalInterestedStudentCountTwo)
			totalInterestedStudentCountCellThree!.textContent = String(totalInterestedStudentCountThree)

			// Update the total event count in the header cell
			totalStudentCountCell.textContent = String(add(filteredStudents))
			schoolCount = filteredSchoolCount
		}
	}

	function clearInput() {
		let input = document.getElementById("searchInput") as HTMLInputElement
		input.value = ''
		searchTable()
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<hgroup>
		<h1 >Schools* and Presented Students</h1>
		<p>
			<i>&emsp;*Active and cooperative schools with Startswith contact</i>
			<br>
			<i>&emsp;**Semesters: Spring — months between the 3th & 9th months; Autumn — others</i>
		</p>
	</hgroup>
	<br>

	<div class="input-container">
		<input
		type="search"
		id="searchInput"
		placeholder="Search for items..."
		on:input={searchTable}
		/>
		<button
    type="button"
    class="clear-button secondary outline"
    on:click={clearInput}
  	>
    &#10007;
  	</button>
	</div>


	<table class="table">
		<thead>
			<tr>
        <th class="c v">Stratswith Contact</th>
				<th class="c v">Country</th>
        <th class="c v">Region</th>
				<th class="c v">County</th>
				<th class="c v">City</th>
				<th class="c v">
					<div>&#8470; of Schools</div>
					<div><strong>{schoolCount}/{schools.length}</strong></div>
				</th>
				<th class="c v">School Type</th>
				<th class="c b">BAS</th>
        <th class="c b">MED</th>
        <th class="c b">HIGH</th>
				<th class="c v">Semester** of Events</th>
				<th class="c v">
					<div>&#8470; of Events &emsp;</div>
					<div><strong id="totalEventCount">{initialTotalEventCount}</strong></div>
				</th>
        <th class="c v">
					<div>&#8470; of Est./Pres. Students</div>
					<div><strong id="totalStudentCount">{initialTotalStudentCount}</strong></div>
				</th>
				<th class="c v">
					<div>&#8470; of Interested Students</div>
					<div><strong id="totalInterestedStudentCount">{initialTotalIntrStudentCount}</strong></div>
				</th>
        <th class="c v">
					<div>&#8470; of ADMITTED &emsp;</div>
					<div><strong id="totalInterestedStudentCountOne">{initialTotalIntrStudentCountOne}</strong></div>
				</th>
        <th class="c v">
					<div>&#8470; of REJECTED &emsp;</div>
					<div><strong id="totalInterestedStudentCountTwo">{initialTotalIntrStudentCountTwo}</strong></div>
				</th>
        <th class="c v">
					<div>&nbsp;&nbsp;&nbsp; &#8470; of &emsp; IN PROGRESS </div>
					<div><strong id="totalInterestedStudentCountThree">{initialTotalIntrStudentCountThree}</strong></div>
				</th>
			</tr>
		</thead>

		<!-- TABLE BODY -->

		<tbody>
			{#each schools as school}
				<tr>
					<td id="nameCell" class="c">
						{school.User.map((user) => user.name)}</td>
					{#each countries as coun}
						{#if (school.country_id == coun.country_id)}
							<td class="c w">{coun.country_name}</td>
						{/if}
					{/each}
					{#each regions as reg}
						{#if (school.region_id == reg.region_id)}
							<td class="c w">{reg.region_name}</td>
						{/if}
					{/each}
					{#each counties as county}
						{#if (school.county_id == county.county_id)}
							<td class="c w">{county.county_name}</td>
						{/if}
					{/each}
					{#each cities as city}
						{#if (school.city_id == city.city_id)}
							<td class="c">{city.city_name}</td>
						{/if}
					{/each}
					<a href="../lists/all_schools/{school.school_id}" target="_blank" class="centered-link">
						<td class="centered-link nb h">{school.name}</td>
					</a>
					<td class="c w">{getType(school.school_type)}</td>
					{#if (school.basic)}
						<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}
					<!--<td><a href={`/album/${track.albumId}`}>{track.albumTitle}</a></td>-->
					{#if (school.medior)}
						<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}
					{#if (school.high)}
          	<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}
					<td class="c w">{school.Event.map((event) => seasonSlugify(String(event.closing_date)))}</td>
					<td class="c">{school.Event.length}</td>
					<td class="c">{add(school.Event)}</td>
					<td class="c">{calculateInterestForSchoolEvents(school.Event)}</td>
					<td class="c">{calculateInterestForSchoolEventsOne(school.Event)}</td>
					<td class="c">{calculateInterestForSchoolEventsTwo(school.Event)}</td>
					<td class="c">{calculateInterestForSchoolEventsThree(school.Event)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
  .main {
    padding-left: 0.5%;
    padding-top: 2%;
    padding-right: 0.5%;
  }

	.b {
		width: 7%;
		font-size: x-small;
	}

	.c {
		text-align: center
	}

	.g {
		color: #32bea6;
		font-weight: 900;
	}

	.h {
		color: #32bea6;
	}

	.v {
		font-size: 19px;
	}

	.w {
		font-size:xx-small;
	}

	table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px;
    text-align: left;
  }

	tr:nth-child(even) {
  	background-color: #f2f2f2;
	}

	i {
		font-weight: 300;
	}

	.nb {
    text-align: center;
	}

	.centered-link {
		height: 100%; /* Optional: If you want the link to take up the full height of the cell */
		display:table-cell;
		align-items:center;
		justify-content:space-around;
		flex-direction: column;
		text-align:center;
		vertical-align: middle;
		width: 100%;
		border: none; /* Remove border */
		outline: none; /* Remove focus outline (optional, for better accessibility) */
		text-decoration-color: #32bea6;
	}

	th {
    background-color:#fafdfd;
    position: sticky;
    top: 0;
    z-index: 1;
  }

	.input-container {
		position: relative;
	}

	.clear-button {
		position: absolute;
		width: auto;
		top: 35%;
		right: 38px;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-size: 1.2rem;
		color: #32bea6;
	}
</style>

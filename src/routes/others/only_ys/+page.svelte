<script lang="ts">
	import { writable } from 'svelte/store'
	import { duty, semester } from '../../stores/dataStore'
	import type { RequestPayload } from './+server'
	import type { PageServerData } from './$types'

	export let data: PageServerData

	const { distinctYears, regions } = data

	let pageName="ONLY YS"

	let semesterFilter = 'ALL'
	let dutyFilter = 'ALL'

	function searchTable() {
		console.log('called')
		const input = document.getElementById("searchInput") as HTMLInputElement
		const filter = input.value.toUpperCase()
		const table = document.querySelector(".table") as HTMLTableElement
		const rows = table.getElementsByTagName("tr")
		let filteredSchoolCount = 0
		//let filteredInterestedStudents: InterestedStudents[] = []

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
				//if (found) {
				//	rows[i].style.display = ""
				//	// Get the corresponding school
				//
				//		let school = schools[i - 1]
				//
				//	// Include the InterestedStudents from the school's events if they exist
				//	if (school.Event) {
				//		school.Event.forEach((event: any) => {
				//			if (event.InterestedStudents) {
				//				filteredInterestedStudents.push(...event.InterestedStudents)
				//			}
				//		})
				//		filteredSchoolCount++
				//	}
				//} else {
				//	rows[i].style.display = "none"
				//}
			}
		}
	}

	function clearInput() {
		let input = document.getElementById("searchInput") as HTMLInputElement
		input.value = ''
		searchTable()
	}

	// Define a writable store for selectedYear
	export const selectedYear = writable<string>('ALL')
	export const selectedRegion = writable('ALL')

	let responseDataFormatted: any = null

	// Function to format and set responseDataFormatted
	function formatAndSetResponseData(responseData: any) {
		responseDataFormatted = JSON.stringify(responseData, null, 2)
	}

	async function sendDataWithForm(event: any) {
		event.preventDefault()
		try {

			const formData: RequestPayload = {
				selectedYear: Number($selectedYear),
				selectedSemester: semesterFilter,
				selectedDuty: dutyFilter,
				selectedRegion: Number($selectedRegion)
			}

			const response = await fetch('http://localhost:5173/others/only_ys', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log(JSON.stringify(formData))
			if (response.ok) {
				const responseData = await response.json()
				formatAndSetResponseData(responseData)
				console.log('RESPONSEData:' + responseData)
			} else {
				console.error('Server error:', response.statusText)
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<hgroup>
		<h1 >ONLY YS</h1>
		<p><i>&emsp;*Active and cooperative schools with Startswith contact</i></p>
	</hgroup>
	<br>

	<form  on:submit={sendDataWithForm}>
		<div class="semi-circular-input">
		<label for="year">Select Year</label>
		<select bind:value={$selectedYear} name="year" id="year" class="hidden-textbox">
			{#each distinctYears as year}
				<option value={year}>{year} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="semester">Select Semester</label>
		<select bind:value={semesterFilter} name="semester" id="semester" class="hidden-textbox">
			{#each semester as sem}
				<option value={sem}>{sem} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="duty">Select Duty</label>
		<select bind:value={dutyFilter} name="duty" id="duty" class="hidden-textbox">
			{#each duty as d}
				<option value={d.id}>{d.name} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="region">Select Region</label>
		<select bind:value={$selectedRegion} name="region" id="region" class="hidden-textbox">
			<option value="ALL">ALL</option>
			{#each regions as reg}
				<option value={reg.region_id}>{reg.region_name} </option>
			{/each}
		</select>
	</div>

	<button class="btn" id="btn" type="submit">Confirm</button>
	</form>

	<div class="response-data">
		<pre>{responseDataFormatted}</pre>
	</div>

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
        <th class="c v">Startswith Contact</th>
				<th class="c v">Country</th>
        <th class="c v">Region</th>
				<th class="c v">County</th>
        <th class="c v">City</th>
				<th class="c v">
					<div>&#8470; of Schools</div>
					<!--<div><strong>{schoolCount}/{schools.length}</strong></div>-->
				</th>
				<th class="c v">School Type</th>
				<th class="c b">BAS</th>
        <th class="c b">MED</th>
        <th class="c b">HIGH</th>
				<th class="c v">
					<div>&#8470; of Events &emsp;</div>
					<!--<div><strong id="totalEventCount">{initialTotalEventCount}</strong></div>-->
				</th>
        <th class="c v">
					<div>&#8470; of Est./Pres. Students</div>
					<!--<div><strong id="totalStudentCount">{initialTotalStudentCount}</strong></div>-->
				</th>
				<th class="c v">
					<div>&#8470; of Interested Students</div>
					<!--<div><strong id="totalInterestedStudentCount">{initialTotalIntrStudentCount}</strong></div>-->
				</th>
        <th class="c v">
					<div>&#8470; of ADMITTED &emsp;</div>
					<!--<div><strong id="totalInterestedStudentCountOne">{initialTotalIntrStudentCountOne}</strong></div>-->
				</th>
				<th class="c v">
					<div>&#8470; of REJECTED &emsp;</div>
					<!--<div><strong id="totalInterestedStudentCountTwo">{initialTotalIntrStudentCountTwo}</strong></div>-->
				</th>
        <th class="c v">
					<div>&nbsp;&nbsp;&nbsp; &#8470; of &emsp; IN PROGRESS </div>
					<!--<div><strong id="totalInterestedStudentCountThree">{initialTotalIntrStudentCountThree}</strong></div>-->
				</th>
			</tr>
		</thead>

		<!-- TABLE BODY

		<tbody>
			{#each schools as school}
				<tr>
					<td id="nameCell" class="c">
						{school.User.map((user) => user.name)}</td>
					{#each regions as reg}
						{#if (school.region_id == reg.region_id)}
							<td class="c">{reg.region_name}</td>
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
					<td class="c">{school.Event.map((event) => event.year)}</td>
					<td class="c">{school.Event.map((event) => event.semester)}</td>

					<td class="c">{school.Event.length}</td>
					<td class="c"></td>
					<td class="c"></td>
					<td class="c"></td>
				</tr>
			{/each}
		</tbody> -->
	</table>
</div>

<style>
  .main {
    padding-left: 0.5%;
    padding-top: 2%;
    padding-right: 0.5%;
  }

	.c {
		text-align: center
	}

	.b {
		width: 7%;
		font-size: x-small;
	}

	.h {
		color: #32bea6;
	}

	.v {
		font-size: 19px;
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

	select {
		border-top-left-radius: 100px;
    border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
		width: 25%;
	}

	label {
		padding-left: 1%;
		font-size: 22px;
		color: rgb(144, 132, 132);
	}

	.btn {
		border-top-left-radius: 100px;
    border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
		width: 25%;
		background-color: #32bea6;
	}

	.btn:hover {
		background-color: #11a58c;
	}
</style>

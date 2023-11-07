<script lang="ts">
	import { writable } from 'svelte/store'
	import { duty, schType, semester } from '../../stores/dataStore'
	import type { RequestPayload } from './+server'
	import type { PageServerData } from './$types'

	export let data: PageServerData
	export const responseData = writable([])
	export const selectedYear = writable<string>('ALL')
	export const selectedRegion = writable('ALL')
	export const selectedCountry = writable('ALL')

	const {
		distinctYears,
		countries,
		regions,
		schoolsCount,
		totalEvents,
		totalEstStudents,
		totalIntrest0,
		totalIntrest1,
		totalIntrest2,
		totalIntrest3
	} = data

	let pageName="SCHOOL_EVENT"

	let semesterFilter = 'ALL'
	let dutyFilter = 'ALL'
	let responseDataFormatted: any = null
	let schoolsData: any = []
	let schoolsLength = 0
	let totalEventCount = 0
	let sumEstStudents = 0
	let totIntrestStatus_0 = 0
	let totIntrestStatus_1 = 0
	let totIntrestStatus_2 = 0
	let totIntrestStatus_3 = 0
	let filtering = 'OFF'
	let isElementVisible = false
	let selYear: any
  let selSemest: any
	let selDuty: any
  let selCountry: any
  let selRegion: any
	const distinctYearsArray = distinctYears || []
	const countriesArray = countries || []
	const regionsArray = regions || []

	function calcPerc(x: any, y: any) {
		let percentage = 0
		if (x !== 0) {
			percentage = (x * 100) / y
		} else {
			percentage = 0
		}
		return Math.round(percentage)
	}

	$: {$selectedRegion, $selectedCountry}
	$: totEvCount = calcTotalEventCount(schoolsData)
	$: calTotEstStud = calcTotalEstStudents(schoolsData)
	$: calTotIntr_0 = calcTotIntrest_0(schoolsData)
	$: calTotIntr_1 = calcTotIntrest_1(schoolsData)
	$: calTotIntr_2 = calcTotIntrest_2(schoolsData)
	$: calTotIntr_3 = calcTotIntrest_3(schoolsData)

	function updateContent() {
    selYear = $selectedYear
    selSemest = semesterFilter
		selDuty = dutyFilter
    selCountry = $selectedCountry
    selRegion = $selectedRegion
		isElementVisible = true
		clearInput()
  }

	// For JSON visualization
	function formatAndSetResponseData(responseData: any) {
		responseDataFormatted = JSON.stringify(responseData, null, 2)
	}

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

	function calcTotalEventCount(schoolsData: any) {
		totalEventCount = 0
		for (const school of schoolsData) {
			totalEventCount += school.event_count
		}

		return totalEventCount
	}

	function calcTotalEstStudents(data: any) {
		sumEstStudents = 0
		for (const school of data) {
			sumEstStudents += school.sum_estimated_student
		}

		return sumEstStudents
	}

	function calcTotIntrest_0(data: any) {
		totIntrestStatus_0 = 0
		for (const school of data) {
			totIntrestStatus_0 += school.total_intrest_count_status_0
		}

		return totIntrestStatus_0
	}

	function calcTotIntrest_1(data: any) {
		totIntrestStatus_1 = 0
		for (const school of data) {
			totIntrestStatus_1 += school.total_intrest_count_status_1
		}

		return totIntrestStatus_1
	}

	function calcTotIntrest_2(data: any) {
		totIntrestStatus_2 = 0
		for (const school of data) {
			totIntrestStatus_2 += school.total_intrest_count_status_2
		}

		return totIntrestStatus_2
	}

	function calcTotIntrest_3(data: any) {
		totIntrestStatus_3 = 0
		for (const school of data) {
			totIntrestStatus_3 += school.total_intrest_count_status_3
		}

		return totIntrestStatus_3
	}

	async function sendDataWithForm(event: any) {
		event.preventDefault()
		try {
			const formData: RequestPayload = {
				selectedYear: Number($selectedYear),
				selectedSemester: semesterFilter,
				selectedDuty: dutyFilter,
				selectedRegion: Number($selectedRegion),
				selectedCountry: Number($selectedCountry)
			}

			const response = await fetch('http://localhost:5173/tables/school_event', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log(JSON.stringify(formData));
			if (response.ok) {
				const responseData = await response.json();
					//formatAndSetResponseData(responseData);
					schoolsData = responseData.schoolsData;
					console.log('RESPONSEData:' + responseData);
					schoolsLength = schoolsData.length;
				} else {
					console.error('Server error:', response.statusText);
				}
		} catch (error) {
				console.error('Error:', error);
		}
	}

	function searchTable() {
		const input = document.getElementById("searchInput") as HTMLInputElement
		const filter = input.value.toUpperCase()
		const table = document.querySelector(".table") as HTMLTableElement
		const rows = table.getElementsByTagName("tr")

		let count = 0
		totalEventCount = 0
		sumEstStudents = 0
		totIntrestStatus_0 = 0
		totIntrestStatus_1 = 0
		totIntrestStatus_2 = 0
		totIntrestStatus_3 = 0
		filtering = 'ON'

		if (input.value == "") {
			filtering = 'OFF'
		}

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
					let school = schoolsData[i - 1]
					count ++
					totalEventCount += school.event_count
					sumEstStudents += school.sum_estimated_student
					totIntrestStatus_0 += school.total_intrest_count_status_0
					totIntrestStatus_1 += school.total_intrest_count_status_1
					totIntrestStatus_2 += school.total_intrest_count_status_2
					totIntrestStatus_3 += school.total_intrest_count_status_3
				} else {
					rows[i].style.display = "none"
				}
			}
		}
		schoolsLength = count
	}

	function clearInput() {
		let input = document.getElementById("searchInput") as HTMLInputElement
		input.value = ''
		searchTable()
		filtering = 'OFF'
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<hgroup>
		<h1 >Schools* and Events**</h1>
		<i>&emsp;*Active and cooperative schools only with Startswith contact</i>
		<br>
		<i>&emsp;**Semesters: Spring — months between the 3th & 9th months inclusive; Autumn — others</i>
	</hgroup>
	<br>

	<form  on:submit={sendDataWithForm}>
		<div class="semi-circular-input">
		<label for="year"><i>Select </i> Event Year</label>
		<select bind:value={$selectedYear} name="year" id="year" class="hidden-textbox">
			{#each distinctYearsArray as year}
				<option value={year}>{year} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="semester"><i>Select </i> Event Semester</label>
		<select bind:value={semesterFilter} name="semester" id="semester" class="hidden-textbox">
			{#each semester as sem}
				<option value={sem}>{sem} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="duty"><i>Select </i> Event Duty</label>
		<select bind:value={dutyFilter} name="duty" id="duty" class="hidden-textbox">
			{#each duty as d}
				<option value={d.id}>{d.name} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="country"><i>Select </i> School Country</label>
		<select bind:value={$selectedCountry} name="country" id="country" class="hidden-textbox">
			<option value="ALL">ALL</option>
			{#each countriesArray as country}
				<option value={country.country_id}>{country.country_name} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="region"><i>Select </i> School Region</label>
		<select bind:value={$selectedRegion} name="region" id="region" class="hidden-textbox">
			<option value="ALL">ALL</option>
			{#each regionsArray as reg}
				<option value={reg.region_id}>{reg.region_name} </option>
			{/each}
		</select>
	</div>

	<button
		class="btn"
		id="btn"
		type="submit"
		on:click={updateContent}
		>
		Confirm
	</button>
	</form>

	<!--<div class="response-data">
				<pre>{responseDataFormatted}</pre>
		</div>-->

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

	{#if isElementVisible}
		<div class="sticky" id="stickyLine">
			<i class="j">Event Year: </i>{selYear} &nbsp;&nbsp;
			<i>Event Semester: </i>{selSemest} &nbsp;&nbsp;
			<i>Event Duty: </i>
			{#each duty as item (item.id)}
				{#if selDuty == item.id}
					{item.name}
				{/if}
			{/each}
			&nbsp;&nbsp;
			<i>School Country: </i>
				{#if (selCountry != 'ALL')}
					{#each countriesArray as country}
						{#if (country.country_id == selCountry)}
							{country.country_name}
						{/if}
					{/each}
				{:else}
					ALL
				{/if}
			&nbsp;&nbsp;
			<i>School Region: </i>
				{#if (selRegion != 'ALL')}
					{#each regionsArray as reg}
						{#if (reg.region_id == selRegion)}
							{reg.region_name}
						{/if}
					{/each}
				{:else}
					ALL
				{/if}
			&nbsp;&nbsp;
			<i>Filtering: </i>{filtering}
		</div>
	{/if}

	<table class="table">
		<thead>
			<tr>
        <th class="c v">Startswith Contact</th>
				<th class="c v">Country</th>
        <th class="c v">Region</th>
				<th class="c v">County</th>
        <th class="c v">City</th>
				<th class="c v">
					<div>&#8470; of</div>
					<div>Schools</div>
					<br>
					<div><strong>{schoolsLength}/{schoolsCount}</strong></div>
					<br>
					<div><strong class="c i">&sum;: {schoolsCount}</strong></div>
					<div class="c h">{calcPerc(schoolsLength, schoolsCount)} %</div>
				</th>
				<th class="c v">School Type</th>
				<th class="c b">BAS</th>
        <th class="c b">MED</th>
        <th class="c d">HIGH</th>
				<th class="c v">
					<div>&#8470; of</div>
					<div>Events</div>
					<br>
					<div><strong>{totalEventCount}/{calcTotalEventCount(schoolsData)}</strong></div>
					<div class="c">{calcPerc(totalEventCount, totEvCount)} %</div>
					<div><strong class="c i">&sum;: {totalEvents}</strong></div>
					<div class="c h">{calcPerc(totalEventCount, totalEvents)} %</div>
				</th>
        <th class="c v">
					<div>&#8470; of</div>
					<div>Est./Pres. Students</div>
					<div><strong>{sumEstStudents}/{calcTotalEstStudents(schoolsData)}</strong></div>
					<div class="c">{calcPerc(sumEstStudents, calTotEstStud)} %</div>
					<div ><strong class="c i">&sum;: {totalEstStudents}</strong></div>
					<div class="c h">{calcPerc(sumEstStudents, totalEstStudents)} %</div>
				</th>
				<th class="c v">
					<div>&#8470; of</div>
					<div>Interested Students</div>
					<div><strong>{totIntrestStatus_0}/{calcTotIntrest_0(schoolsData)}</strong></div>
					<div class="c">{calcPerc(totIntrestStatus_0, calTotIntr_0)} %</div>
					<div><strong class="c i">&sum;: {totalIntrest0}</strong></div>
					<div class="c h">{calcPerc(totIntrestStatus_0, totalIntrest0)} %</div>
				</th>
        <th class="c v">
					<div>&#8470; of</div>
					<div>ADMITTED</div>
					<br>
					<div><strong>{totIntrestStatus_1}/{calcTotIntrest_1(schoolsData)}</strong></div>
					<div class="c">{calcPerc(totIntrestStatus_1, calTotIntr_1)} %</div>
					<div><strong class="c i">&sum;: {totalIntrest1}</strong></div>
					<div class="c h">{calcPerc(totIntrestStatus_1, totalIntrest1)} %</div>
				</th>
				<th class="c v">
					<div>&#8470; of</div>
					<div>REJECTED</div>
					<br>
					<div><strong>{totIntrestStatus_2}/{calcTotIntrest_2(schoolsData)}</strong></div>
					<div class="c">{calcPerc(totIntrestStatus_2, calTotIntr_2)} %</div>
					<div><strong class="c i">&sum;: {totalIntrest2}</strong></div>
					<div class="c h">{calcPerc(totIntrestStatus_2, totalIntrest2)} %</div>
				</th>
        <th class="c v">
					<div>&#8470; of</div>
					<div>IN PROGRESS</div>
					<div><strong>{totIntrestStatus_3}/{calcTotIntrest_3(schoolsData)}</strong></div>
					<div class="c">{calcPerc(totIntrestStatus_3, calTotIntr_3)} %</div>
					<div><strong class="c i">&sum;: {totalIntrest3}</strong></div>
					<div class="c h">{calcPerc(totIntrestStatus_3, totalIntrest3)} %</div>
				</th>
			</tr>
		</thead>

		<tbody>
			{#each schoolsData as school}
				<tr>
					<td id="nameCell" class="c">{school.user_names}</td>
					<td class="c w">{school.country_name}</td>
					<td class="c w">{school.region_name}</td>
					<td class="c w">{school.county_name}</td>
					<td class="c">{school.city_name}</td>
					<a href="../lists/all_schools/{school.school_id}" target="_blank" class="centered-link">
						<td class="centered-link nb h">{school.school_name}</td>
					</a>
					<td class="c w">{getType(school.school_type)}</td>

					{#if school.basic == true}
						<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}
					{#if school.medior == true}
						<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}
					{#if school.high == true}
						<td class="c g">&#10003;</td>
					{:else}
						<td></td>
					{/if}

					<td class="c">{school.event_count}</td>
					<td class="c">{school.sum_estimated_student}</td>
					<td class="c">{school.total_intrest_count_status_0}</td>
					<td class="c">{school.total_intrest_count_status_1}</td>
					<td class="c">{school.total_intrest_count_status_2}</td>
					<td class="c">{school.total_intrest_count_status_3}</td>
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

	.c {
		text-align: center
	}

	.b {
		width: 6%;
		font-size: x-small;
	}

	.d {
		width: 5%;
		font-size: x-small;
		font-stretch: condensed;
	}

	.g {
		color: #32bea6;
		font-weight: 900;
	}

	.h {
		color: #32bea6;
	}

	.i {
		color: #32bea6;
		font-weight: 600;
	}

	.j {
		padding-left: 1%;
	}

	.v {
		font-size: 17px;
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
    top: 40px;
    z-index: 2;
		padding-top: 10px;
  }

	.sticky {
		background-color: white;
    position: sticky;
    top: 0;
    z-index: 1;
    height: 40px;
    width: 100%;
		padding: 5px;
		color: #32bea6;
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
		font-weight: 400;
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

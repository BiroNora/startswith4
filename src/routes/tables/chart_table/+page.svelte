<script lang="ts">
	import { writable } from 'svelte/store'
	import { duty, gradeMap, schType, semester, statusMap } from '../../stores/dataStore'
	import type { RequestPayload } from './+server'
	import type { PageServerData } from './$types'
	import { Chart } from 'chart.js/auto'

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

	let pageName="CHART_TABLE"

	let semesterFilter = 'ALL'
	let dutyFilter = 'ALL'
	let responseDataFormatted: any = null
	let statusCountry: any = []
	let statusGrade: any = []
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

	$: {$selectedRegion, $selectedCountry}

	interface StatusCountry {
		country_name: string
		total_intrest_count: number
		intrest_count_status_0: number
		intrest_count_status_1: number
		intrest_count_status_2: number
		intrest_count_status_3: number
		intert: number
	}

	function updateContent() {
    selYear = $selectedYear
    selSemest = semesterFilter
		selDuty = dutyFilter
    selCountry = $selectedCountry
    selRegion = $selectedRegion
		isElementVisible = true
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

			const response = await fetch('http://localhost:5173/tables/chart_table', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			console.log(JSON.stringify(formData))

			if (response.ok) {
				const responseData = await response.json()
					formatAndSetResponseData(responseData)
					statusCountry = responseData.statusCountry
					statusGrade = responseData.statusGrade
					console.log('RESPONSEData:' + responseData)
					createChart()
			} else {
				console.error('Server error:', response.statusText)
			}
		} catch (error) {
				console.error('Error:', error)
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

	function createChart() {
		let chartCanvas1: HTMLElement | null = document.getElementById('chartCanvas1')
		let chartCanvas2: HTMLElement | null = document.getElementById('chartCanvas2')

		let countryNames = statusCountry.map((item: StatusCountry) => item.country_name)
		let dataVal = statusCountry.map((item: StatusCountry) => item.total_intrest_count)
		let dataAppl = statusCountry.map((item: StatusCountry) => item.intert)
		let dataValues0 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_0)
		let dataValues1 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_1)
		let dataValues2 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_2)
		let dataValues3 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_3)

		let datasets = [
			{
				label: 'INTERESTED TOTAL',
				backgroundColor: 'rgb(25.1, 2, 71.4)',
				borderColor: 'rgb(255, 99, 132)',
				data: dataVal,
			},
			{
				label: 'INTERESTED / NOT APPLIED',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: dataValues0,
			},
			{
				label: 'INTERESTED / APPLIED',
				backgroundColor: 'rgb(100, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: dataAppl,
			},
			{
				label: statusMap[0].name,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: dataValues1,
			},
			{
				label: statusMap[1].name,
				backgroundColor: 'rgb(75, 192, 192)',
				borderColor: 'rgb(75, 192, 192)',
				data: dataValues2,
			},
			{
				label: statusMap[2].name,
				backgroundColor: 'rgb(255, 205, 86)',
				borderColor: 'rgb(255, 205, 86)',
				data: dataValues3,
			},
		]

		let chart1 = new Chart(chartCanvas1, {
			type: 'bar', // Chart type (e.g., 'bar', 'doughnut', etc.)
			data: {
				labels: countryNames,
				datasets: datasets,
			},
			plugins: {
				datalabels: {
					color: 'black', // Color of the data labels
					anchor: 'end', // Position of the labels (e.g., 'end', 'center', 'start')
					align: 'top', // Alignment of the labels (e.g., 'top', 'center', 'bottom')
					font: {
						weight: 'bold', // Font weight of the labels
					},
					formatter: (context: any) => {
						// Display the dataset value on top of the bar
						return context.dataset.data[context.dataIndex]
					},
				},
			},
  	})

		var chart2 = new Chart(chartCanvas2,{
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: ['Label A', 'Label B', 'Label C'],
				datasets: [
					{
						data: [40, 30, 20],
						backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
					},
				],
			},
		})
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<hgroup>
		<h1 >Chart Table, Schools* and Events**</h1>
		<i>&emsp;*Active and cooperative schools only with Startswith contact</i>
		<br>
		<i>&emsp;**Semesters: Spring — months between the 3th & 9th months inclusive; Autumn — others</i>
	</hgroup>
	<br>

	<form  on:submit={sendDataWithForm}>
		<div class="semi-circular-input">
		<label for="year"><i>Select </i> Event Year</label>
		<select bind:value={$selectedYear} name="year" id="year" class="hidden-textbox">
			{#each distinctYears as year}
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
			{#each countries as country}
				<option value={country.country_id}>{country.country_name} </option>
			{/each}
		</select>
	</div>

	<div class="semi-circular-input">
		<label for="region"><i>Select </i> School Region</label>
		<select bind:value={$selectedRegion} name="region" id="region" class="hidden-textbox">
			<option value="ALL">ALL</option>
			{#each regions as reg}
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

	{#if isElementVisible}
		<div class="sticky" id="stickyLine">
			<i>Event Year: </i>{selYear} &nbsp;&nbsp;
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
					{#each countries as country}
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
					{#each regions as reg}
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
	<br>

	<div class="e">
		<canvas id="chartCanvas1"></canvas>
		<canvas id="chartCanvas2"></canvas>
	</div>

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

	.e {
  width: 60%;
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

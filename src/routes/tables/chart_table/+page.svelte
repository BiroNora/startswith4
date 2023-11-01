<script lang="ts">
	import { writable } from 'svelte/store'
	import { duty, gradeMap, schType, semester, statusMap, subjectMap } from '../../stores/dataStore'
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
	let admittedGrade: any = []
	let intrestSubjects: any = []
	let admittedSubjects: any = []
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

	function calcPerc(x: any, y: any): number {
    return x !== 0 ? Math.round((x * 100) / y) : 0
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
					admittedGrade = responseData.admittedGrade
					intrestSubjects = responseData.intrestSubjects
					admittedSubjects = responseData.admittedSubjects
					console.log('RESPONSEData:' + responseData)
					createChart()
			} else {
				console.error('Server error:', response.statusText)
			}
		} catch (error) {
				console.error('Error:', error)
		}
	}

	function createChart() {
		let chartCanvas1: HTMLElement | null = document.getElementById('chartCanvas1')
		let chartCanvas2: HTMLElement | null = document.getElementById('chartCanvas2')
		let chartCanvas3: HTMLElement | null = document.getElementById('chartCanvas3')
		let chartCanvas4: HTMLElement | null = document.getElementById('chartCanvas4')
		let chartCanvas5: HTMLElement | null = document.getElementById('chartCanvas5')

		// Data of chartCanvas1
		let countryNames = statusCountry.map((item: StatusCountry) => item.country_name)
		let dataVal = statusCountry.map((item: StatusCountry) => item.total_intrest_count)
		let dataAppl = statusCountry.map((item: StatusCountry) => item.intert)
		let dataValues0 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_0)
		let dataValues1 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_1)
		let dataValues2 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_2)
		let dataValues3 = statusCountry.map((item: StatusCountry) => item.intrest_count_status_3)

		let datasets1 = [
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

		// Data of chartCanvas2
		let gardeNames = Array.from({ length: 5 }, (_, i) => gradeMap[i].name)

		const statusValuesMap: { [key: string]: number } = {}
		for (let i = 1; i <= 5; i++) {
			const grStatus = `intrest_grade_status_${i}`
			statusValuesMap[grStatus] = statusGrade[0][grStatus] || 0 // Use 0 as default if value is not present
		}

		const gradeTotal = Object.values(statusValuesMap).reduce((sum, value) => sum + value, 0)

		const gradeData: number[] = []
		for (let i = 1; i <= 5; i++) {
			const grade = `intrest_grade_status_${i}`
			gradeData[i - 1] = calcPerc(statusValuesMap[grade], gradeTotal)
			console.log(`${gradeData[i - 1]} for ${grade}`)
		}

		let gradeColors = ['rgb(251, 2, 71)', 'rgb(255, 99, 132)', 'rgb(100, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)']

		// Data of chartCanvas3
		let admittedNames = Array.from({ length: 5 }, (_, i) => gradeMap[i].name)

		const admittedValuesMap: { [key: string]: number } = {}
		for (let i = 1; i <= 5; i++) {
			const adStatus = `intrest_grade_status_${i}`
			admittedValuesMap[adStatus] = admittedGrade[0][adStatus] || 0 // Use 0 as default if value is not present
		}

		const admittedTotal = Object.values(admittedValuesMap).reduce((sum, value) => sum + value, 0)

		const admittedData: number[] = []
		for (let i = 1; i <= 5; i++) {
			const admit = `intrest_grade_status_${i}`
			admittedData[i - 1] = calcPerc(admittedValuesMap[admit], admittedTotal)
			console.log(`${admittedData[i - 1]} for ${admit}`)
		}

		let admittedColors = ['rgb(251, 2, 71)', 'rgb(255, 99, 132)', 'rgb(100, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)']

		// Data of chartCanvas4
		const subjectNames = Array.from({ length: 14 }, (_, i) => subjectMap[i].name)

		const subjectValuesMap: { [key: string]: number } = {}
		for (let i = 1; i <= 14; i++) {
				const workTitle = `intrest_work_title_${i}`
				subjectValuesMap[workTitle] = intrestSubjects[0][workTitle] || 0 // Use 0 as default if value is not present
		}

		const subjectTotal = Object.values(subjectValuesMap).reduce((sum, value) => sum + value, 0)

		const subjectsInter: number[] = []
		for (let i = 1; i <= 14; i++) {
			const workTitle = `intrest_work_title_${i}`
			subjectsInter[i - 1] = calcPerc(subjectValuesMap[workTitle], subjectTotal)
		}

		let subjectColors = [
			'rgb(251, 2, 71)',
			'rgb(255, 199, 132)',
			'rgb(100, 199, 132)',
			'rgb(54, 162, 235)',
			'rgb(75, 192, 192)',
			'rgb(251, 12, 71)',
			'rgb(255, 99, 132)',
			'rgb(100, 99, 132)',
			'rgb(54, 182, 235)',
			'rgb(175, 192, 192)',
			'rgb(251, 202, 71)',
			'rgb(255, 70, 132)',
			'rgb(100, 56, 132)',
			'rgb(54, 162, 135)',
			'rgb(175, 92, 192)']

		new Chart(chartCanvas1, {
			type: 'bar', // Chart type (e.g., 'bar', 'doughnut', etc.)
			data: {
				labels: countryNames,
				datasets: datasets1,
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Interested Students and their Status per Country',
						font: {
							size: 20,
						},
					},
				},
			},
  	})

		new Chart(chartCanvas2, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: gardeNames,
				datasets: [
					{
						data: gradeData,
						backgroundColor: gradeColors,
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Grade Percentage Proportion of Interested Students',
						font: {
							size: 20,
						},
					},
				},
  		},
		})

		new Chart(chartCanvas3, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: admittedNames,
				datasets: [
					{
						data: admittedData,
						backgroundColor: admittedColors,
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Grade Percentage Proportion of Admitted Students',
						font: {
							size: 20,
						},
					},
				},
  		},
		})

		new Chart(chartCanvas4, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: subjectNames,
				datasets: [
					{
						data: subjectsInter,
						backgroundColor: subjectColors,
					},
				],
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Subject Percentage Proportion of Interested Students',
						font: {
							size: 20,
						},
					},
				},
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
	</div>
	<br>
	<br>
	<div class="container">
		<div class="f">
			<canvas id="chartCanvas2"></canvas>
		</div>
		<br>
		<br>
		<div class="f">
			<canvas id="chartCanvas3"></canvas>
		</div>
	</div>
	<br>
	<div class="container">
		<div class="f">
			<canvas id="chartCanvas4"></canvas>
		</div>
		<br>
		<br>

	</div>
	<br>
</div>

<style>
  .main {
    padding-left: 0.5%;
    padding-top: 2%;
    padding-right: 0.5%;
  }

	.container {
		display: flex; /* or inline-flex */
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
		gap: 8%;
		padding-top: 2%;
		padding-bottom: 4%;
	}

	.e {
  width: 60%;
	padding-top: 4%;
	padding-bottom: 3%;
	padding-left: 3%;
	}

	.f {
  width: 50%;
	}

	i {
		font-weight: 300;
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

<script lang="ts">
	import { writable } from 'svelte/store'
	import { channelMap, duty, gradeMap, semester, statusMap, subjectMap } from '../../stores/dataStore'
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
		regions
	} = data

	let pageName = 'CHART_TABLE'

	let semesterFilter = 'ALL'
	let dutyFilter = 'ALL'
	let responseDataFormatted: any = null
	let statusCountry: any = []
	let statusGrade: any = []
	let admittedGrade: any = []
	let subjectIntrest: any = []
	let subjectAdmitted: any = []
	let regionIntrest: any = []
	let regionAdmitted: any = []
	let channelIntrest: any = []
	let channelAdmitted: any = []
	let isElementVisible = false
	let selYear: any
	let selSemest: any
	let selDuty: any
	let selCountry: any
	let selRegion: any
	const distinctYearsArray = distinctYears || []
	const countriesArray = countries || []
	const regionsArray = regions || []
	const gradeMapLength: number = Object.keys(gradeMap).length
	const subjectMapLength: number = Object.keys(subjectMap).length
	const gradeNames = Array.from({ length: gradeMapLength }, (_, i) => gradeMap[i].name)
	const subjectNames = Array.from({ length: subjectMapLength }, (_, i) => subjectMap[i].name)
	let gradeData: number[] = []
	let subjectData: number[] = []
	let gradeColors = [
		'rgb(251, 2, 71)',
		'rgb(255, 99, 132)',
		'rgb(100, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(75, 192, 192)'
	]
	let subjectColors = [
		'rgb(251, 2, 71)',
		'rgb(255, 216, 132)',
		'rgb(100, 199, 132)',
		'rgb(54, 162, 235)',
		'rgb(75, 192, 192)',
		'rgb(251, 12, 71)',
		'rgb(255, 99, 132)',
		'rgb(100, 99, 132)',
		'rgb(54, 182, 235)',
		'rgb(175, 192, 192)',
		'rgb(252, 169, 3)',
		'rgb(16, 52, 166)',
		'rgb(100, 56, 132)',
		'rgb(54, 162, 135)',
		'rgb(175, 92, 192)'
	]

	$: {
		$selectedRegion, $selectedCountry
	}

	interface StatusCountry {
		country_name: string
		total_intrest_count: number
		intrest_count_status_0: number
		intrest_count_status_1: number
		intrest_count_status_2: number
		intrest_count_status_3: number
		intert: number
	}

	interface RegionIntrest {
		region_name: string
		intrest_count: number
	}

	interface RegionAdmitted {
		region_name: string
		intrest_count: number
	}

	interface ChannelIntrest {
		channel: string
		intrest_count: number
	}

	interface ChannelAdmitted {
		channel: string
		intrest_count: number
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
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			console.log(JSON.stringify(formData))

			if (response.ok) {
				const responseData = await response.json()
				//formatAndSetResponseData(responseData)
				statusCountry = responseData.statusCountry
				statusGrade = responseData.statusGrade
				admittedGrade = responseData.admittedGrade
				subjectIntrest = responseData.subjectIntrest
				subjectAdmitted = responseData.subjectAdmitted
				regionIntrest = responseData.regionIntrest
				regionAdmitted = responseData.regionAdmitted
				channelIntrest = responseData.channelIntrest
				channelAdmitted = responseData.channelAdmitted
				createChart()
			} else {
				console.error('Server error:', response.statusText)
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	function createChart() {
		let chartCanvas1: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas1'
		) as HTMLCanvasElement
		let chartCanvas2: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas2'
		) as HTMLCanvasElement
		let chartCanvas3: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas3'
		) as HTMLCanvasElement
		let chartCanvas4: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas4'
		) as HTMLCanvasElement
		let chartCanvas5: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas5'
		) as HTMLCanvasElement
		let chartCanvas6: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas6'
		) as HTMLCanvasElement
		let chartCanvas7: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas7'
		) as HTMLCanvasElement

		const canvasIds: string[] = [
			'chartCanvas1',
			'chartCanvas2',
			'chartCanvas3',
			'chartCanvas4',
			'chartCanvas5',
			'chartCanvas6',
			'chartCanvas7'
		]
		const existingCharts: Chart[] = []

		// Destroy canvas if existing
		canvasIds.forEach((canvasId) => {
			const canvas: HTMLCanvasElement | null = document.getElementById(
				canvasId
			) as HTMLCanvasElement
			if (canvas) {
				const existingChart: Chart | undefined = Chart.getChart(canvas)
				if (existingChart) {
					existingCharts.push(existingChart)
					existingChart.destroy()
				}
			}
		})

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
				backgroundColor: 'rgb(251, 2, 71)',
				data: dataVal
			},
			{
				label: 'INTERESTED / NOT APPLIED',
				backgroundColor: 'rgb(235, 120, 143)',
				data: dataValues0
			},
			{
				label: 'INTERESTED / APPLIED',
				backgroundColor: 'rgb(93, 43, 110)',
				data: dataAppl
			},
			{
				label: statusMap[0].name,
				backgroundColor: 'rgb(50, 190, 166)',
				data: dataValues1
			},
			{
				label: statusMap[1].name,
				backgroundColor: 'rgb(135, 167, 196)',
				data: dataValues2
			},
			{
				label: statusMap[2].name,
				backgroundColor: 'rgb(242, 196, 97)',
				data: dataValues3
			}
		]

		// Data of chartCanvas2, chartCanvas3
		function calculateGradeData(array: any): number[] {
			gradeData = []

			const statusValuesMap: { [key: string]: number } = {}
			for (let i = 1; i <= gradeMapLength; i++) {
				const grStatus = `intrest_grade_status_${i}`
				statusValuesMap[grStatus] = array[0][grStatus] || 0 // Use 0 as default if value is not present
			}

			const gradeTotal = Object.values(statusValuesMap).reduce((sum, value) => sum + value, 0)

			for (let i = 1; i <= gradeMapLength; i++) {
				const grade = `intrest_grade_status_${i}`
				gradeData.push(calcPerc(statusValuesMap[grade], gradeTotal))
			}
			return gradeData
		}

		// Data of chartCanvas4, chartCanvas5
		function calculateSubjectData(array: any): number[] {
			subjectData = []

			const subjectValuesMap: { [key: string]: number } = {}
			for (let i = 1; i <= subjectMapLength; i++) {
				const workTitle = `intrest_work_title_${i}`
				subjectValuesMap[workTitle] = array[0][workTitle] || 0 // Use 0 as default if value is not present
			}

			const subjectTotal = Object.values(subjectValuesMap).reduce((sum, value) => sum + value, 0)

			for (let i = 1; i <= subjectMapLength; i++) {
				const workTitle = `intrest_work_title_${i}`
				subjectData.push(calcPerc(subjectValuesMap[workTitle], subjectTotal))
			}
			return subjectData
		}

		// Data of chartCanvas6
		const regionNamesInt = regionIntrest.map((item: any) => item.region_name)
		const chartLabels: string[] = regionNamesInt

		function aggrIntrCounts(
			data: RegionIntrest[], admittedData: RegionAdmitted[]): [number[], number[]] {
			const intrCount: number[] = []
			const addmCount: number[] = []

			// Create a map of region_name to intrest_count from regionIntrest
			const intrestMap: Record<string, number> = {}
			for (const item of data) {
				intrestMap[item.region_name] = item.intrest_count
			}

			// Create arrays of intrest_counts for both regionIntrest and regionAdmitted
			for (const item of data) {
				intrCount.push(item.intrest_count)
				const admittedItem = admittedData.find((admitted) => admitted.region_name === item.region_name)
				addmCount.push(admittedItem ? admittedItem.intrest_count : 0)
			}

			return [intrCount, addmCount]
		}

		// Get the two arrays of intrest counts for RegionIntrest and RegionAdmitted
		const [countIntr, countAdm] =	aggrIntrCounts(regionIntrest, regionAdmitted)

		const chartData = [
			{
				label: 'INTERESTED STUDENTS',
				backgroundColor: 'rgb(251, 2, 71)',
				data: countIntr
			},
			{
				label: 'ADMITTED STUDENTS',
				backgroundColor: 'rgb(50, 190, 166)',
				data: countAdm
			}
		]

		// Data of chartCanvas7
		const channelNamesInt = channelIntrest.map((item: any) => item.channel)
		const channelNames = channelNamesInt.map((id: any) => {
			const channel = channelMap.find((item) => item.id === id)
			return channel ? channel.name : 'Unknown'
		})

		function aggrChannelCounts(
			data: ChannelIntrest[], admittedData: ChannelAdmitted[]): [number[], number[]] {
			const intrChCount: number[] = []
			const addmChCount: number[] = []

			// Create a map of region_name to intrest_count from regionIntrest
			const intrestMap: Record<string, number> = {}
			for (const item of data) {
				intrestMap[item.channel] = item.intrest_count
			}

			// Create arrays of intrest_counts for both regionIntrest and regionAdmitted
			for (const item of data) {
				intrChCount.push(item.intrest_count)
				const admittedItem = admittedData.find((admitted) => admitted.channel === item.channel)
				addmChCount.push(admittedItem ? admittedItem.intrest_count : 0)
			}

			return [intrChCount, addmChCount]
		}

		// Get the two arrays of intrest counts for RegionIntrest and RegionAdmitted
		const [countChIntr, countChAdm] =	aggrChannelCounts(channelIntrest, channelAdmitted)

		const chart7Data = [
			{
				label: 'INTERESTED STUDENTS',
				backgroundColor: 'rgb(251, 2, 71)',
				data: countChIntr
			},
			{
				label: 'ADMITTED STUDENTS',
				backgroundColor: 'rgb(50, 190, 166)',
				data: countChAdm
			}
		]

		new Chart(chartCanvas1, {
			type: 'bar', // Chart type (e.g., 'bar', 'doughnut', etc.)
			data: {
				labels: countryNames,
				datasets: datasets1
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Interested Students and their Status per Country',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas2, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: gradeNames,
				datasets: [
					{
						data: calculateGradeData(statusGrade),
						backgroundColor: gradeColors
					}
				]
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Grade Percentage Proportion of Interested Students',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas3, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: gradeNames,
				datasets: [
					{
						data: calculateGradeData(admittedGrade),
						backgroundColor: gradeColors
					}
				]
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Grade Percentage Proportion of Admitted Students',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas4, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: subjectNames,
				datasets: [
					{
						data: calculateSubjectData(subjectIntrest),
						backgroundColor: subjectColors
					}
				]
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Subject Percentage Proportion of Interested Students',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas5, {
			type: 'doughnut', // Doughnut chart type
			data: {
				labels: subjectNames,
				datasets: [
					{
						data: calculateSubjectData(subjectAdmitted),
						backgroundColor: subjectColors
					}
				]
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Subject Percentage Proportion of Admitted Students',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas6, {
			type: 'bar', // Chart type (e.g., 'bar', 'doughnut', etc.)
			data: {
				labels: chartLabels,
				datasets: chartData
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Interested / Applied Students Are Informed by Which Center',
						font: {
							size: 20
						}
					}
				}
			}
		})

		new Chart(chartCanvas7, {
			type: 'bar', // Chart type (e.g., 'bar', 'doughnut', etc.)
			data: {
				labels: channelNames,
				datasets: chart7Data
			},
			options: {
				plugins: {
					title: {
						display: true,
						text: 'Interested / Applied Students Are Informed by Which Channel',
						font: {
							size: 20
						}
					}
				}
			}
		})
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<hgroup>
		<h1>Chart Tables* of Events** and Interested Students</h1>
		<i>&emsp;*Events only with active and cooperative schools</i>
		<br />
		<i>&emsp;**Semesters: Spring — months between the 3th & 9th months inclusive; Autumn — others</i
		>
	</hgroup>
	<br />

	<form on:submit={sendDataWithForm} id="top">
		<div >
			<label for="year"><i>Select </i> Event Year</label>
			<select bind:value={$selectedYear} name="year" id="year" class="hidden-textbox">
				{#each distinctYearsArray as year}
					<option value={year}>{year} </option>
				{/each}
			</select>
		</div>

		<div >
			<label for="semester"><i>Select </i> Event Semester</label>
			<select bind:value={semesterFilter} name="semester" id="semester" class="hidden-textbox">
				{#each semester as sem}
					<option value={sem}>{sem} </option>
				{/each}
			</select>
		</div>

		<div >
			<label for="duty"><i>Select </i> Event Duty</label>
			<select bind:value={dutyFilter} name="duty" id="duty" class="hidden-textbox">
				{#each duty as d}
					<option value={d.id}>{d.name} </option>
				{/each}
			</select>
		</div>

		<div >
			<label for="country"><i>Select </i> School Country</label>
			<select bind:value={$selectedCountry} name="country" id="country" class="hidden-textbox">
				<option value="ALL">ALL</option>
				{#each countriesArray as country}
					<option value={country.country_id}>{country.country_name} </option>
				{/each}
			</select>
		</div>

		<div >
			<label for="region"><i>Select </i> School Region</label>
			<select bind:value={$selectedRegion} name="region" id="region" class="hidden-textbox">
				<option value="ALL">ALL</option>
				{#each regionsArray as reg}
					<option value={reg.region_id}>{reg.region_name} </option>
				{/each}
			</select>
		</div>

		<button class="btn" id="btn" type="submit" on:click={updateContent}> Confirm </button>
	</form>

	 <!--<div class="response-data">
		<pre>{responseDataFormatted}</pre>
	</div>-->

	{#if isElementVisible}
		<div class="sticky select1" id="stickyLine">
			<i class="h">Event Year: </i>{selYear} &nbsp;&nbsp;
			<i>Event Semester: </i>{selSemest} &nbsp;&nbsp;
			<i>Event Duty: </i>
			{#each duty as item (item.id)}
				{#if selDuty == item.id}
					{item.name}
				{/if}
			{/each}
			&nbsp;&nbsp;
			<i>School Country: </i>
			{#if selCountry != 'ALL'}
				{#each countriesArray as country}
					{#if country.country_id == selCountry}
						{country.country_name}
					{/if}
				{/each}
			{:else}
				ALL
			{/if}
			&nbsp;&nbsp;
			<i>School Region: </i>
			{#if selRegion != 'ALL'}
				{#each regionsArray as region}
					{#if region.region_id == selRegion}
						{region.region_name}
					{/if}
				{/each}
			{:else}
				ALL
			{/if}
			&nbsp;&nbsp;
		</div>
	{/if}
	<div class="e" style="margin-bottom: 3rem;">
		<canvas id="chartCanvas1" />
	</div>
	<div class="container" style="margin-bottom: 3rem;">
		<div class="f">
			<canvas id="chartCanvas2" />
		</div>
		<div class="f">
			<canvas id="chartCanvas3" />
		</div>
	</div>
	<div class="container" style="margin-bottom: 3rem;">
		<div class="f">
			<canvas id="chartCanvas4" />
		</div>
		<div class="f">
			<canvas id="chartCanvas5" />
		</div>
	</div>
	<div class="g" style="margin-bottom: 3rem;">
		<canvas id="chartCanvas6" />
	</div>
	<div class="e" style="margin-bottom: 3rem;">
		<canvas id="chartCanvas7" />
	</div>
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
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
		width: 90%;
		padding-top: 4%;
		padding-bottom: 3%;
		padding-left: 3%;
	}

	.f {
		width: 90%;
	}

	.g {
		width: 90%;
		padding-top: 4%;
		padding-bottom: 3%;
		padding-left: 3%;
	}

	.h {
		padding-left: 2%;
	}

	i {
		font-weight: 300;
	}

	.sticky {
		background-color: rgb(246, 242, 242);
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

	.select1 {
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
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

	.flower {
    font-size: 140%;
    color: #a0a9a8;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
  }

  .flower:hover {
    font-size: 140%;
    color: #32bea6;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
  }
</style>

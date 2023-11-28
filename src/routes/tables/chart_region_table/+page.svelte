<script lang="ts">
	import { writable } from 'svelte/store'
	import { duty, semester, statusMap, subjectMap } from '../../stores/dataStore'
	import type { RequestPayload } from './+server'
	import type { PageServerData } from './$types'
	import { Chart } from 'chart.js/auto'

	export let data: PageServerData
	export const responseData = writable([])
	export const selectedYear = writable<string>('ALL')
	export const selectedRegion = writable('ALL')
	export const selectedCountry = writable('ALL')

	const {
		distinctYears
	} = data

	let pageName = 'CHART_REGION_TABLE'

	let semesterFilter = 'ALL'
	let dutyFilter = 'ALL'
	let responseDataFormatted: any = null
	let regionIntAdm: any = []
	let isElementVisible = false
	let selYear: any
	let selSemest: any
	let selDuty: any
	const distinctYearsArray = distinctYears || []
	let gradeColors = [
		'rgb(251, 2, 71)',
		'rgb(255, 99, 132)',
		'rgb(100, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(75, 192, 192)',
		'rgb(252, 169, 3)'
	]

	let err_mess = false
	let err_mess1 = false

	$: {
		$selectedRegion, $selectedCountry
	}

	function calcPerc(counts: number[]): number[] {
		const total = counts.reduce((sum, count) => sum + count, 0)
		return counts.map(count => Math.round((count / total) * 100))
	}

	function updateContent() {
		selYear = $selectedYear
		selSemest = semesterFilter
		selDuty = dutyFilter
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
				selectedDuty: dutyFilter
			}

			const response = await fetch('http://localhost:5173/tables/chart_region_table', {
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
				regionIntAdm = responseData.regionIntAdm
				createChart()
			} else {
				console.error('Server error:', response.statusText)
        destroyChart()
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

  function destroyChart() {
		err_mess = true

		const canvasIds: string[] = [
			'chartCanvas1',
			'chartCanvas2'
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
  }

	function createChart() {
		err_mess = false
		let chartCanvas1: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas1'
		) as HTMLCanvasElement
		let chartCanvas2: HTMLCanvasElement | null = document.getElementById(
			'chartCanvas2'
		) as HTMLCanvasElement

		const canvasIds: string[] = [
			'chartCanvas1',
			'chartCanvas2'
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

		// Data of chartCanvas1, chartCanvas2
		const regions = regionIntAdm.map((entry: any) => entry.region_name)
		const intrestCounts = regionIntAdm.map((entry: any) => entry.intrest_count)
		const intrestCountStatus1 = regionIntAdm.map((entry: any) => entry.intrest_count_status_1)

		if (intrestCounts.length === 0 && intrestCountStatus1.length === 0) {
			err_mess1 = true
		} else {
			err_mess1 = false

			new Chart(chartCanvas1, {
				type: 'doughnut',
				data: {
					labels: regions,
					datasets: [
						{
							data: calcPerc(intrestCounts),
							backgroundColor: gradeColors
						}
					]
				},
				options: {
					plugins: {
						title: {
							display: true,
							text: 'Percentage Proportion of Interested Students at Regions',
							font: {
								size: 20
							}
						}
					}
				}
			})

			new Chart(chartCanvas2, {
				type: 'doughnut',
				data: {
					labels: regions,
					datasets: [
						{
							data: calcPerc(intrestCountStatus1),
							backgroundColor: gradeColors
						}
					]
				},
				options: {
					plugins: {
						title: {
							display: true,
							text: 'Percentage Proportion of Admitted Students at Regions',
							font: {
								size: 20
							}
						}
					}
				}
			})
		}
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main" id="top">
	<hgroup>
		<h1>Chart Tables* of Events** and Interested Students at Regions</h1>
		<i>&emsp;*Events only with active and cooperative schools</i>
		<br />
		<i>&emsp;**Semesters: Spring — months between the 3th & 9th months inclusive; Autumn — others</i
		>
	</hgroup>
	<br />

	<form on:submit={sendDataWithForm} >
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
		</div>
	{/if}

	{#if err_mess}
		<div class="container" style="margin-bottom: 8rem;">
			<p><i>Something went wrong. Please try it later.</i></p>
		</div>
	{/if}

	{#if err_mess1}
		<div class="container" style="margin-bottom: 8rem;">
			<p><i>No data available.</i></p>
		</div>
	{/if}

	<div class="container" style="margin-bottom: 3rem;">
		<div class="f">
			<canvas id="chartCanvas1" />
		</div>
		<div class="f">
			<canvas id="chartCanvas2" />
		</div>
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

	.f {
		width: 90%;
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

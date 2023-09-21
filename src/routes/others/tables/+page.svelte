<script lang="ts">
  import { schType, statusType } from '../../stores/dataStore'
	import type { PageServerData } from './$types'

  export let data: PageServerData

  const { schools, countries, regions, events, istudents } = data

	let pageName="Tables"

	function getType(arr: string[]): string {
		let types: string = ''

		arr.forEach((value: string) => {
			const index: number = parseInt(value, 10) - 1 // Convert value to integer and subtract 1 to match array index
			if (index >= 0 && index < schType.length) {
				types += schType[index] + ', '
			}
		})
		// Remove the trailing comma and space
		types = types.slice(0, -2)

		return types
	}

	function add(events: Array<{ estimated_student?: number }>) {
  	return events.reduce((total, event) => total + (event.estimated_student || 0), 0)
	}

	const evs = schools.map((school) => ({
		...school,
		eventsCount: school.Event.length,
	}))

	const totalEventCount = evs.reduce(
		(total, school) => total + school.eventsCount,
		0
  )
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<h1 >Schools and Presented Students</h1>
	<input
		type="search"
		id="searchInput"
		placeholder="Search for items..."
	/>

	<table class="table">
		<thead>
			<tr>
        <th class="c">Stratswidth Contact</th>
				<th class="c">Country</th>
        <th class="c">Region</th>
				<!-- A kereséshez kell majd igazítani! -->
				<th class="c">
					<div>&#8470;&nbsp;Schools</div>
					<div><strong>{schools.length}</strong></div>
				</th>
				<th class="c">School Type</th>
				<th class="c b">BAS</th>
        <th class="c b">MED</th>
        <th class="c b">HIGH</th>
				<th class="c">
					<div>&#8470;&nbsp;Events</div>
					<div><strong>{totalEventCount}</strong></div>
				</th>
        <th class="c">Est./Pres. Students</th>
				<th class="c">Interested Students</th>
        <th class="c">Admitted</th>
        <th class="c">Rejected</th>
        <th class="c">In Progress</th>
			</tr>
		</thead>
		<tbody>
			{#each schools as school}
				<tr>
					<td id="nameCell" class="c">
						{school.User.map((user) => user.name)}</td>
					{#each countries as coun}
						{#if (school.country_id == coun.country_id)}
							<td class="c">{coun.country_name}</td>
						{/if}
					{/each}
					{#each regions as reg}
						{#if (school.region_id == reg.region_id)}
							<td class="c">{reg.region_name}</td>
						{/if}
					{/each}
					<a href="../lists/all_schools/{school.school_id}" class="centered-link">
						<td class="c nb">{school.name}</td>
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
					<td class="c">{school.Event.length}</td>
					<td class="c">{add(school.Event)}</td>
					<td class="c"></td>
					<td class="c">{statusType[0][1]}</td>
					<td class="c">{statusType[1][1]}</td>
					<td class="c">{statusType[2][1]}</td>
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

	.w {
		font-size:x-small;
	}

	table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

	.nb {
		border-bottom: 0.3px solid #ddd;
    text-align: center;
	}

	.centered-link {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%; /* Optional: If you want the link to take up the full height of the cell */
		width: 100%;
		border: none; /* Remove border */
		outline: none; /* Remove focus outline (optional, for better accessibility) */
	}

	th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>

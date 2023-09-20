<script lang="ts">
	import { schType } from '../../stores/dataStore'
	import type { PageServerData } from './$types'

  export let data: PageServerData

  const { schools, regions } = data

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
</script>

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
        <th class="c">Region</th>
				<th class="c">School Name</th>
				<th class="c">School Type</th>
				<th class="c">BAS</th>
        <th class="c">MED</th>
        <th class="c">HIGH</th>
        <th class="c">Students</th>
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
					{#each regions as reg}
						{#if (school.region_id == reg.region_id)}
							<td class="c">{reg.region_name}</td>
						{/if}
					{/each}
					<td class="c">{school.name}</td>
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
					<td class="c">{add(school.Event)}</td>
					<td class="c"></td>
					<td class="c"></td>
					<td class="c"></td>
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

	.g {
		color: #32bea6;
		font-weight: 900;
	}

	.w {
		font-size:x-small;
	}
</style>

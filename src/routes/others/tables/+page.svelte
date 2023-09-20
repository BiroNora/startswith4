<script lang="ts">
	import type { PageServerData } from './$types'

  export let data: PageServerData
  const { schools, countries, regions, counties, cities } = data
</script>

<div >
	<h1 >Tracks</h1>

	<input
		type="search"
		placeholder="Search for items..."
		class="main"
	/>

	<table class="table">
		<thead>
			<tr>
        <th>Stratswidth Contact</th>
        <th>Country</th>
        <th>Regio</th>
        <th>County</th>
				<th>Om_ID</th>
				<th>School Name</th>
				<th>School Type</th>
				<th>BASIC</th>
        <th>MEDIOR</th>
        <th>HIGH</th>
        <th>Est. Students</th>
        <th>Admitted</th>
        <th>Rejected</th>
        <th>In Progress</th>
			</tr>
		</thead>
		<tbody>
			{#each schools as school}
				<tr>
					<td>{school.name}</td>
					<td>{school.basic}</td>
					<!--<td><a href={`/album/${track.albumId}`}>{track.albumTitle}</a></td>-->
					<td>{school.medior}</td>
          <td>{school.high}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
  .main {
    padding-left: 5%;
    padding-top: 2%;
    padding-right: 5%;
  }
</style>

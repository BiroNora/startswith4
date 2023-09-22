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



	const evs = schools.map((school) => ({
		...school,
		eventsCount: school.Event.length,
	}))

	const totalEventCount = evs.reduce(
		(total, school) => total + school.eventsCount,
		0
  )
	// Define a type for the events parameter
	type EventWithEstimatedStudent = {
        estimated_student?: number;
    };

    function add(events: EventWithEstimatedStudent[]) {
        return events.reduce((total: number, event) => total + (event.estimated_student || 0), 0);
    }

    function searchTable() {
        const input = document.getElementById("searchInput") as HTMLInputElement;
        const filter = input.value.toUpperCase();
        const table = document.querySelector(".table") as HTMLTableElement;
        const rows = table.getElementsByTagName("tr");
        const totalEventCountCell = document.getElementById("totalEventCount");

        if (totalEventCountCell) {
            let filteredEvents: EventWithEstimatedStudent[] = [];

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName("td");

                if (i !== 0) { // Skip the header row
                    let found = false;

                    for (let j = 0; j < cells.length; j++) {
                        const cell = cells[j];
                        const text = cell.textContent || cell.innerText;

                        if (text.toUpperCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        rows[i].style.display = "";
                        // Cast the Event property to the correct type
                        const schoolEvent: EventWithEstimatedStudent[] = schools[i - 1].Event;
                        filteredEvents.push(...schoolEvent);
                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }

            // Update the total event count in the header cell
            totalEventCountCell.textContent = String(add(filteredEvents));
        }
    }

    // The initial total event count is provided from the server
     /* Provide the initial count here from your server */;




	function searchTable1() {
		const input = document.getElementById("searchInput") as HTMLInputElement;
		const filter = input.value.toUpperCase();
		const table = document.querySelector(".table") as HTMLTableElement;
		const rows = table.getElementsByTagName("tr");

		for (let i = 0; i < rows.length; i++) {
			const cells = rows[i].getElementsByTagName("td");
			let found = false;

			for (let j = 0; j < cells.length; j++) {
				const cell = cells[j];
				const text = cell.textContent || cell.innerText;

				if (text.toUpperCase().indexOf(filter) > -1) {
					found = true;
					break;
				}
			}

			if (found || i === 0) {
				rows[i].style.display = "";
			} else {
				rows[i].style.display = "none";
			}
		}
	}
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
		on:input={searchTable}
	/>

	<table class="table">
		<thead>
			<tr>
        <th class="c">Stratswidth Contact</th>
				<th class="c">Country</th>
        <th class="c">Region</th>
				<!-- A kereséshez kell majd igazítani! -->
				<th class="c">
					<div>&#8470; of Schools</div>
					<div><strong>{schools.length}</strong></div>
				</th>
				<th class="c">School Type</th>
				<th class="c b">BAS</th>
        <th class="c b">MED</th>
        <th class="c b">HIGH</th>
				<th class="c">
					<div>&#8470; of Events</div>
					<div><strong></strong></div>
				</th>
        <th class="c">
					<div>&#8470; of Est./Pres. Students</div>
					<div><strong id="totalEventCount"></strong></div>
				</th>
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
						<td class="centered-link nb">{school.name}</td>
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
	}

	th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>

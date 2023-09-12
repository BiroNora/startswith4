<script lang="ts">
	import { enhance } from '$app/forms'
	import {
		channelMap,
		dutyMap3,
		eventMap,
		formatDate,
		gradeMap,
		statusMap,
		timeSlugify
	} from '../../../stores/dataStore.js'
	import type { ActionData } from './$types'

	let pageName = 'Event Details'
	let isInput = true

	function isWork() {
		if (isInput == true) {
			isInput = false
		} else {
			isInput = true
		}
		return isInput
	}

	function scrollToConnect() {
		window.scrollTo({
			top: 0
		})
	}

	export let data
	export let form: ActionData
	let formattedTimestamp

	function dater(timestampWithTimezone: string): string {
		const date = new Date(timestampWithTimezone)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hour = String(date.getHours()).padStart(2, '0')
		const minute = String(date.getMinutes()).padStart(2, '0')

		formattedTimestamp = `${year}-${month}-${day}T${hour}:${minute}`

		return formattedTimestamp
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
	<h1>Event Details</h1>
	<hgroup>
		<hgroup class="title">
			<h3>{data.event.event_name}</h3>
			<a href="#section_interested" class="aa"> &#9758; Érdeklődő diákok hozzáadása </a>
		</hgroup>
		<br />
		<h4 class="h41">Adatok</h4>
		<a href="#section_event" class="ad"> &#9758; Esemény adatainak módosítása </a> &nbsp; &nbsp;
		<a href="#section2_event" class="ad"> &#9758; Startswith kapcsolat hozzáadása </a>
		<ul class="ab">
			<li class="lb">
				Időpont: {formatDate(data.event.closing_date)}, {timeSlugify(data.event.closing_date)}
			</li>
			<li class="lb">Szervező: {data.event.on_duty}</li>
			<li class="lb">Esemény formája: {data.event.event_type}</li>
			<li class="lb">Becsült résztvevők száma: {data.event.estimated_student}</li>
			<li class="lb">Feljegyzés: {data.event.note}</li>
			<li class="lb">Iskola:</li>
			<hgroup>
				<ul class="ac">
					<li class="la">
						<a href="../../lists/schools/{data.school?.school_id}" class="aa">
							{data.school?.name}
							{' 🏠 '}
							{data.cityname}
						</a>
					</li>
				</ul>
			</hgroup>
			<li class="lb">Érdeklődő diákok:</li>
			<hgroup>
				{#each data.inters as ints}
					<ul class="ac">
						<li class="lb">Diákok száma: {ints.count}</li>
						{#each data.countries as country}
							{#if country.country_id == ints.country_id}
								<li class="lb">Ország: {country.country_name}</li>
							{/if}
						{/each}
						<li class="lb">Évfolyam: {ints.grade}</li>
						{#each data.regions as regio}
							{#if regio.region_id == ints.region_id}
								<li class="lb">Régió, ahonnan értesült a programról: {regio.region_name}</li>
							{/if}
						{/each}
						<li class="lb">Csatorna, ahonnan értesült a programról: {ints.channel}</li>
						{#if ints.applied == true}
							<li class="lb">Jelentkezési mű címe: {ints.work_title}</li>
							<li class="lb">Státusza: {ints.status}</li>
						{:else}
							<li class="lb">Nem jelentkezett</li>
						{/if}
						<br />
					</ul>
				{/each}
			</hgroup>
			<a href="#top" class="flower"
				>&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a
			>
		</ul>
	</hgroup>

	<!-- Interested students adding form -->

	<div class="grid interested-to-position" id="section_interested">
		<div class="rei">
			<p class="h43">Interested Students Register</p>
		</div>
		<form action="?/interested" method="post" use:enhance>
			<div>
				<label for="number">Number of Students</label>
				<input type="number" name="number" id="number" required />
			</div>
			<div>
				<label for="country">Country</label>
				<select name="country" id="country">
					{#each data.countries as country}
						<option value={country.country_id}>{country.country_name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="grade">Grade</label>
				<select name="grade" id="grade" class="hidden-textbox">
					{#each gradeMap as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="connect">Connected by / Region</label>
				<select name="connect" id="connect">
					{#each data.regions as region}
						<option value={region.region_id}>{region.region_name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="channel">Channeled by</label>
				<select name="channel" id="channel" class="hidden-textbox">
					{#each channelMap as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
			</div>
			<button type="button" on:click={() => isWork()} class="contrast outline cgb">Apply</button>
			<fieldset disabled={isInput}>
				<input type="hidden" name="apply" value={isInput} />
				<div>
					<label for="work">Title of Work</label>
					<input type="text" name="work" id="work" required />
				</div>
				<div>
					<label for="status">Status</label>
					<select name="status" id="status" class="hidden-textbox">
						{#each statusMap as item, index (item.id)}
							<option value={item.id}>{item.name}</option>
						{/each}
					</select>
				</div>
				<br />
			</fieldset>
			<button class="btn" id="btn" type="submit">Register</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
	</div>

	<!-- Event update form -->

	<div class="grid event-to-position" id="section_event">
		<div class="rei">
			<p>Event Update</p>
		</div>
		<form action="?/event" method="post" use:enhance>
			<div>
				<label for="fantasy"> Event Name * </label>
				<input
					type="text"
					name="fantasy"
					id="fantasy"
					minlength="10"
					placeholder="ANY LONGER"
					value={data.event.event_name}
					required
				/>
				<p><i class="iii">* event name must be unique and at least 10 characters long</i></p>
			</div>
			<div>
				<label for="meeting-time">Event Date</label>
				<input
					type="datetime-local"
					id="meeting-time"
					value={dater(String(data.event.closing_date))}
					name="meeting-time"
					min="2021-06-07T00:00"
					max="2060-06-14T00:00"
				/>
			</div>
			<div>
				<label for="duty">On Duty</label>
				<select bind:value={data.onduty} name="duty" id="duty" class="hidden-textbox">
					{#each dutyMap3 as item, index (item.id)}
						<option value={item.id}>{item.name} </option>
					{/each}
				</select>
			</div>
			<div>
				<label for="type">Event Type</label>
				<select bind:value={data.eventtype} name="type" id="type" class="hidden-textbox">
					{#each eventMap as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
				<p><i class="iii">in case of * please leave a comment</i></p>
			</div>
			<div>
				<label for="estimate">Estimated Number of Participants</label>
				<input
					type="text"
					value={data.event.estimated_student}
					name="estimate"
					id="estimate"
					required
				/>
			</div>
			<label for="message">Note</label>
			<textarea id="message" value={data.event.note} name="message" rows="4" cols="50" />
			<button class="btn" id="btnevent" type="submit">Update</button>
			<br />
			{#if form?.user}
				<p class="error">Please enter valide data.</p>
			{/if}
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
	</div>

	<!-- Event user update form -->

	<div class="grid event2-to-position" id="section2_event">
		<div class="rei">
			<p>Event User Update</p>
		</div>
		<p class="uni">{data.event.event_name}</p>
		<form action="?/eventU" method="post" use:enhance>
			<div>
			</div>
			<div>
				<label for="email">Email</label>
				<input type="text" name="email" id="email" required />
			</div>
			{#if form?.user}
				<p class="error">Please enter valide data.</p>
			{/if}
			{#if form?.already}
				<p class="error">User already added.</p>
			{/if}
			<button class="btn" id="btnevent" type="submit">Add User</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
	</div>
	<div>
		<a href="#top" class="flower grid event3-to-position">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
	</div>
</div>

<style>
	.main {
		padding-left: 5%;
		padding-top: 2%;
		padding-right: 5%;
	}

	.aa {
		color: #32bea6;
		font-weight: 400;
		line-height: normal;
		font-size: 22px;
	}

	.ab {
		color: #83918f;
		padding: 2%;
		font-weight: 400;
		line-height: normal;
		font-size: 22px;
	}

	.ac {
		color: #83918f;
		font-weight: 400;
		line-height: normal;
		padding-top: 1%;
		padding-left: 5%;
		text-indent: -6%;
		font-size: 22px;
	}

	.ad {
		color: #83918f;
		font-weight: 400;
		line-height: normal;
		font-size: 22px;
	}

	.la {
		list-style-type: none;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.4;
		font-size: 22px;
	}

	.lb {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.4;
		font-size: 22px;
	}

	fieldset {
		position: relative;
		padding: 6px;
	}

	label {
		padding: 6px;
	}

	.rei p {
		position: relative;
		line-height: normal;
		font-size: 140%;
		font-weight: bold;
	}

	.grid {
		padding: 35px 15px 0px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: space-around;
		width: 55%;
		line-height: 75%;
		grid-row: minmax(5px, auto);
	}

	.grid input:checked {
		background-color: #32bea6;
	}

	.btn {
		margin-bottom: 0;
		background-color: #32bea6;
	}

	.interested-to-position {
		transform: translateY(120vh); /* Move the element down one viewport height (vh) */
	}

	.event-to-position {
		transform: translateY(260vh);
	}

	.event2-to-position {
		transform: translateY(400vh);
	}

	.event3-to-position {
		transform: translateY(430vh);
		padding-bottom: 80px;
	}

	.flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}

	.h41 {
		color: #83918f;
	}

	.h43 {
		color: #737978;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}

	.uni {
		color: #444f4d;
		font-weight: 500;
		line-height: normal;
		font-size: 24px;
	}

	.error {
    color: tomato;
    padding: 2%;
    text-align: center;
    font-style: italic;
    line-height: 95%;
    font-weight: 500;
  }
</style>

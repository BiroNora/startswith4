<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	import {
		channelMap,
		formatDate,
		gradeMap,
		statusMap,
		timeSlugify
	} from '../../../stores/dataStore.js'

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

	export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
	<h1>Event Details</h1>
	<hgroup>
		<hgroup class="title">
			<h3>{data.event.event_name}</h3>
			<a href="#Section_further_down" class="aa"> &#9758; Érdeklődő diákok hozzáadása </a>
		</hgroup>
		<ul class="ab">
			<li class="lb">
				Időpont: {formatDate(data.event.closing_date)}, {timeSlugify(data.event.closing_date)}
			</li>
			<li class="lb">Szervező: {data.event.on_duty}</li>
			<li class="lb">Esemény formája: {data.event.event_type}</li>
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
						<br>
					</ul>
				{/each}
			</hgroup>
			<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
		</ul>
	</hgroup>

	<div class="grid element-to-position" id="Section_further_down">
		<div class="rei">
			<p class="h43">Interested Students Register</p>
		</div>
		<form action="?/interested" method="post" use:enhance>
			<div>
				<label for="number">Number of Students</label>
				<input type="text" name="number" id="number" required />
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
			<button type="button" on:click={() => isWork()} class="contrast outline cgb" >Apply</button>
			<fieldset disabled={isInput}>
				<input type="hidden" name="apply" value={isInput}>
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
		</form>
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

	.element-to-position {
		transform: translateY(100vh); /* Move the element down one viewport height (vh) */
	}

	.flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}

	.h43 {
		color: #737978;
	}
</style>

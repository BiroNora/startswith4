<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
  import { dateSlugify } from '../../stores/dataStore.js'

	let pageName = 'My Activity List'


	function scrollToConnect() {
		window.scrollTo({
			top: 0
		})
	}

	export let data
	export let form: ActionData
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
	<div id="base">
    <hgroup>
		<h1>Activity Details</h1>
    <a
      href="#section_event"
      class="aa"
    >
      &#9758; Program hozzáadása
    </a>
      &nbsp; &nbsp;
    </hgroup>
    <br />
    <ul>
      {#each data.activities as act}
        <li class="li aa">
            {dateSlugify(String(act.end_date))}
            &#9753
            {act.act_name}
            {' 🏠 '}
            {act.act_note}
            &#10087
            {#each data.regio as reg}
              {#if act.region_id == reg.region_id}
              {reg.region_name}
              {/if}
            {/each}
        </li>
      {/each}
    </ul>
    <br>
		<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
	</div>


	<!-- Activity form -->

	<div class="grid element-to-position" id="section_event" >
		<div class="rei">
			<p>Activity Register</p>
		</div>
		<form action="?/activity" method="post" use:enhance>
			<div>
				<label for="fantasy">
					Event Name
				</label>
				<input
					type="text"
					name="fantasy"
					id="fantasy"
					placeholder="Activity"
					required
				/>
			</div>
			<div>
				<label for="meeting-time">Activity Date</label>
				<input
					type="datetime-local"
					id="meeting-time"
					name="meeting-time"
					value="YYYY-MM-DDT00:00"
					min="2021-06-07T00:00"
					max="2060-06-14T00:00"
				/>
			</div>
      <div>
        <label for="region">Region</label>
        <select name="region" id="region" >
          {#each data.regio as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
			<label for="message">Note</label>
				<textarea id="message" name="message" rows="2" cols="50" />

			{#if form?.inactsu}
				<p class="error">Something went wrong.</p>
			{/if}

			{#if form?.user || form?.school}
				<p class="error">Please enter correct data.</p>
			{/if}

			{#if form?.title}
				<p class="error">Event name is too short.</p>
			{/if}

			{#if form?.uslug}
				<p class="error">Event already exists.</p>
			{/if}

			<button class="btn" id="btnevent" type="submit">Register</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
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

	.ad {
		color: #83918f;
		font-weight: 400;
		line-height: normal;
		font-size: 22px;
	}

	.la {
		list-style-position: inside;
		list-style-type: disc;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.4;
		font-size: 22px;
	}

	.lb {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -5%;
		line-height: 1.4;
		font-size: 22px;
	}

	.h41 {
		color: #83918f;
	}

	.h42 {
		color: #32bea6;
	}

	.h43 {
		color: #737978;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
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
		transform: translateY(420vh); /* Move the element down one viewport height (vh) */
	}

	.flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
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

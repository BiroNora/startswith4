<script lang="ts">
	import { dateSlugify } from '../../stores/dataStore.js'
	import type { ActionData } from './$types'

	let pageName = 'Activity List'

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
		<h1>Activities</h1>
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
			<li class="li">
				<a href="../lists/activities/{act.act_id}" class="ab">
					{dateSlugify(String(act.end_date))}
					&#9753
					{act.act_name}
					&#10087
					{act.act_note}
					{' 🏠 '}
					{#each data.regio as reg}
						{#if act.region_id == reg.region_id}
						{reg.region_name}
						{/if}
					{/each}
				</a>
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
		<form action="?/activity" method="post" >
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
		color: #32bea6;
		font-weight: 400;
		line-height: normal;
		font-size: 23px;
	}

	.li {
    list-style-position: inside;
    list-style-type: none; /* Remove default bullet */
    padding-left: 5%;
    text-indent: -6%;
    color: #32bea6; /* Set font color to #32bea6 */
		line-height: 1.35;
	}

	.li::before {
    content: "•"; /* Use a disc bullet character */
    color: rgb(144, 132, 132); /* Set the bullet color to grey */
    margin-right: 45px; /* Adjust spacing between bullet and text */
		font-size: 30px;
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
		padding-top: 1%;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
		padding-top: 1%;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}

	.w {
		width: auto;
	}

	.error {
		color: tomato;
		padding: 2%;
		text-align: center;
		font-style: italic;
		line-height: 95%;
		font-weight: 500;
	}

	.z {
		display: inline-flex;
		flex-direction: row-reverse;
	}

	.cc {
    background-color: #32bea6;
    border: 1em solide #32bea6;
  }

  .cc:hover {
    background-color: #0ba38a;
  }
	article::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
</style>

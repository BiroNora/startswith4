<script lang="ts">
	import { enhance } from '$app/forms'
	import { dutyMap3, eventMap, formatDate, timeSlugify } from '../../../stores/dataStore.js'
	import type { ActionData } from './$types'
	let pageName = 'Event Details'

	export let data
	export let form: ActionData
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>


<div class="main">
	<h1>Event Details</h1>
	<hgroup>
		<hgroup class="title">
			<h3>{data.event.event_name} </h3>
			<a href="#Section_further_down" class="aa" > &#9758; Érdeklődő diákok hozzáadása</a>
		</hgroup>
		<ul class="ab">
			<li class="lb">Időpont: {formatDate(data.event.closing_date)}, {timeSlugify(data.event.closing_date)}</li>
			<li class="lb">Szervező: {data.event.on_duty}</li>
			<li class="lb">Esemény formája: {data.event.event_type}</li>
			<li class="lb">Feljegyzés: {data.event.note}</li>
			<li class="lb">Iskola:</li>
			<hgroup>
					<ul class="ac">
						<li class="la">
							<a href="../../lists/schools/{data.school?.school_id}" class="aa">
								{data.school?.name} {' 🏠 '} {data.cityname}
							</a>
						</li>
					</ul>
			</hgroup>
			<!--
			<hgroup>
				{#each data.school as sch}
					<ul class="ac">
						<hgroup>
							<li class="lc">Érdeklődő diákok:</li>
							<li class="la">
								<a href="../../lists/schools/{sch.school_id}" class="aa">
									Név: {sch.name}
								</a>
							</li>
							<li class="ld">Telefon: {sch.dir_phone}</li>
							<li class="ld">Email: {sch.school_email}</li>
							<li class="ld">Feljegyzés: {sch.note}</li>
						</hgroup>
					</ul>
				{/each}
			</hgroup>
			-->
		</ul>
	</hgroup>

	<div class="grid element-to-position" id="Section_further_down" >
		<div class="rei">
			<p>Interested Students Register</p>
		</div>
		<form action="?/event" method="post" use:enhance>
			<div>
				<label for="number">Number of Students</label>
				<input type="text" name="number" id="number" required />
			</div>
			<div>
        <label for="countr">Country</label>
        <select name="countr" id="countr" >
          {#each country as countr}
            <option value="{countr.country_id}">{countr.country_name}</option>
          {/each}
        </select>
      </div>
			<div>
				<label for="duty">Grade</label>
				<select name="duty" id="duty" class="hidden-textbox">
					{#each dutyMap3 as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
			</div>
			<div>
        <label for="region">Connected by / Region</label>
        <select name="region" id="region" >
          {#each regio as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
			<div>
        <label for="region">Channeled by</label>
        <select name="region" id="region" >
          {#each regio as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
			<div>
				<label for="meeting-time">Event Date</label>
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
				<label for="duty">On Duty</label>
				<select name="duty" id="duty" class="hidden-textbox">
					{#each dutyMap3 as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="type">Event Type</label>
				<select name="type" id="type" class="hidden-textbox">
					{#each eventMap as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
				</select>
				<p><i class="iii">in case of * please leave a comment</i></p>
			</div>

			<div>
				<label for="schemail">School Email</label>
				<input type="email" name="schoolemail" id="schoolemail" required />
			</div>
			<div>
				<label for="uemail">User Email</label>
				<input type="email" name="uemail" id="uemail" required />
			</div>
			<br />
			<fieldset>
				<legend class="n">Note</legend>
				<br />
				<textarea id="message" name="message" rows="4" cols="50" />
			</fieldset>
			<button class="btn" id="btn" type="submit">Register</button>
		</form>
	</div>
</div>


<style>
	#Section_further_down {
		transform: translateY(40%);
	}

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
		border: 1px solid #32bea6;
		border-radius: 5px;
		border-spacing: 2px;
	}

	label {
		padding: 6px;
	}

	legend {
		padding: 6px;
	}

	.iii {
		display: flex;
		text-align: left;
		padding-left: 5px;
		color: rgb(146, 136, 136);
	}

	.n {
		font-weight: 500;
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

	.noticea {
		color: #32bea6;
		padding: 2%;
		text-align: center;
		font-weight: 500;
		line-height: normal;
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

<script lang="ts">
	import { enhance } from '$app/forms'
	import { formatDate } from '../../../stores/dataStore.js'
	import type { ActionData } from './$types.js'

	let pageName = 'School Details'

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
		<h1>School Details</h1>
		<hgroup>
			{#if !data.school.active || !data.school.coop}
				<h3>{data.school.school_name} {' ⚠️ '}</h3>
			{:else if data.school.active}
				<h3>{data.school.school_name}</h3>
			{/if}
			<hgroup>
				<h6>{data.school.zip_code} {data.city?.city_name} {data.school.address}</h6>
				<div>
					{data.country?.country_name} / {data.region?.region_name} régió / {data.county?.county_name}
					megye
					<br>
					<div class="z">Number of Events:&nbsp;{data.event.length}</div>
			</hgroup>
			<br />
			<h4 class="h41">Adatok</h4>
			<a href="#section_school" class="ad" > &#9758; Startswith kapcsolat hozzáadása </a> &nbsp; &nbsp;
			&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
			<a href="#section3_event" class="ad">
				<strong class="error1">&#10008;</strong>&nbsp; Startswith kapcsolat törlése
			</a>
			<ul class="ab">
				<li class="lb">OM szám: {data.school.om_id}</li>
				<li class="lb">Igazgató: {data.school.dir_name}</li>
				<li class="lb">Iskola telefon: {data.school.dir_phone}</li>
				<li class="lb">Iskola email: {data.school.school_email}</li>
				<li class="lb">Website: {data.school.website}</li>
				<li class="lb">Iskola típusa: {data.resS}</li>
				<li class="lb">Felelős: {data.resD}</li>
				<li class="lb">Feljegyzés: {data.school.note}</li>
				<li class="ld">Startswith kapcsolat:</li>
				<hgroup>
					{#each data.school.User as u}
						<ul class="ac">
							<li class="lc">
								Név: {u.user_name}
							</li>
						</ul>
					{/each}
				</hgroup>
				<li class="ld">Kapcsolat:</li>
				<hgroup>
					{#each data.contact as con}
						<ul class="ac">
							<hgroup>
								<li class="lc">
									Név: {con.contact_name}
								</li>
								<li class="lc">Telefon: {con.contact_phone}</li>
								<li class="lc">Email: {con.contact_email}</li>
								<li class="lc">Feljegyzés: {con.contact_note}</li>
							</hgroup>
						</ul>
					{/each}
				</hgroup>
			</ul>
			<hgroup>
				<h4 class="h42">Események</h4>
				<h4 class="y">Number of Events:&nbsp;{data.event.length}</h4>
			</hgroup>
			<br />
			<ul class="aa">
				{#each data.event as e}
					<li class="la">
						<a href="../../lists/all_events/{e.event_id}" class="aa">
							{formatDate(e.closing_date)} &#9753 {e.event_name} &#10086 {e.on_duty} &#10087 {e.event_type}
						</a>
					</li>
				{/each}
			</ul>
			<br />
		</hgroup>
		<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
	</div>


	<!-- School user update form -->

	<div class="grid event2-to-position" id="section_school">
		<div class="rei">
			<p>School Startswith User Update</p>
		</div>
		<p class="uni">{data.school.school_name}</p>
		<form action="?/schoolU" method="post" use:enhance>
			<div />
			<div>
				<label for="email">Email</label>
				<input type="text" name="email" id="email" required />
			</div>
			{#if form?.usercontact}
				<p class="error">Please enter valide data.</p>
			{/if}
			{#if form?.alreadycontact}
				<p class="error">Startswith user already added.</p>
			{/if}
			{#if form?.contactresult}
				<p class="success">Startswith user added.</p>
			{/if}
			<button class="btn" id="btnevent" type="submit">Add</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
	</div>

	<!-- User delete form -->

	<div class="grid event3-to-position" id="section3_event">
		<div class="rei">
			<p>School Startswith User Remove</p>
		</div>
		<p class="uni">{data.school.school_name}</p>
		<form action="?/schoolUD" method="post" use:enhance>
			<div />
			<div>
				<label for="email">Email</label>
				<input type="text" name="email" id="email" required />
			</div>
			{#if form?.user || form?.already}
				<p class="error">Please enter valide data.</p>
			{/if}
			{#if form?.result}
				<p class="success">Startswith user removed.</p>
			{/if}
			<button class="btn" id="btnevent" type="submit">Remove</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
	</div>
		<a href="#top" class="flower grid event4-to-position"
			>&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
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

	.z {
    color: rgb(144, 132, 132);
    font-size: medium;
    font-weight: 400;
    font-style: italic;
  }

	.y {
    color: #32bea6;
    font-size: medium;
    font-weight: 400;
    font-style: italic;
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

	.lc {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -6%;
		line-height: normal;
		font-size: 22px;
	}

	.ld {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -5%;
		line-height: 1.4;
		padding-bottom: 1%;
		font-size: 22px;
	}

	.btn {
		margin-bottom: 0;
		background-color: #32bea6;
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

	.event2-to-position {
		transform: translateY(420vh);
	}

	.event3-to-position {
		transform: translateY(620vh);
	}

	.event4-to-position {
		transform: translateY(650vh);
		padding-bottom: 80px;
	}

	.uni {
		color: #444f4d;
		font-weight: 500;
		line-height: normal;
		font-size: 24px;
	}

	label {
		padding: 6px;
	}

	.h41 {
		color: #83918f;
	}

	.h42 {
		color: #32bea6;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}

	.flower {
		font-size: 140%;
		color: #a0a9a8;
		text-decoration: none; /* Remove underline */
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
		text-decoration: none; /* Remove underline */
	}

	.error {
		color: tomato;
		padding: 2%;
		text-align: center;
		font-style: italic;
		line-height: 95%;
		font-weight: 500;
	}

	.error1 {
		color: tomato;
		text-align: center;
		font-style: italic;
		line-height: 95%;
		font-weight: 500;
	}

	.success {
		color: #32bea6;
		padding: 2%;
		text-align: center;
		font-style: italic;
		line-height: 95%;
		font-weight: 500;
	}
</style>

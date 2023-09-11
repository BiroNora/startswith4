<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	import { dutyMap3, eventMap, formatDate } from '../../../stores/dataStore.js'

	let pageName = 'School Details'

	let yesA = false
	let yesB = false
	let yesC = false
	let yesD = false
	let yesE = false
	let yesF = false
	let yesG = false
	let yesH = false
	let yesI = false
	let yesJ = false
	let yesK = false
	let yesL = false
	let yesM = false
	let yesN = false
	let yesO = false
	let yesCOOP = true
	let yesACT = true
	let yesBAS = false
	let yesMED = false
	let yesHIG = false

	function scrollToConnect() {
		window.scrollTo({
			top: 0
		})
	}

	export let data
	export let form: ActionData

	if (data.school.active == false) {
		yesACT = false
	}

	if (data.school.coop == false) {
		yesCOOP = false
	}

	data.school.school_type.forEach(function (item) {
		switch (item) {
			case '1': {
				yesA = true
				break
			}
			case '2': {
				yesB = true
				break
			}
			case '3': {
				yesC = true
				break
			}
			case '4': {
				yesD = true
				break
			}
			case '5': {
				yesE = true
				break
			}
			case '6': {
				yesF = true
				break
			}
			case '7': {
				yesG = true
				break
			}
			case '8': {
				yesH = true
				break
			}
			case '9': {
				yesI = true
				break
			}
			case '10': {
				yesJ = true
				break
			}
			case '11': {
				yesK = true
				break
			}
			case '12': {
				yesL = true
				break
			}
			case '13': {
				yesM = true
				break
			}
			case '14': {
				yesN = true
				break
			}
			case '15': {
				yesO = true
				break
			}
		}
	})

	data.school.duty.forEach(function (item) {
		switch (item) {
			case '1': {
				yesBAS = true
				break
			}
			case '2': {
				yesMED = true
				break
			}
			case '3': {
				yesHIG = true
				break
			}
		}
	})
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
	<h1>School Details</h1>
	<hgroup>
		{#if !data.school.active || !data.school.coop}
			<h3>{data.school.name} {' ⚠️ '}</h3>
		{:else if data.school.active}
			<h3>{data.school.name}</h3>
		{/if}
		<hgroup>
			<h6>{data.school.zip_code} {data.city?.city_name} {data.school.address}</h6>
			<p>
				{data.country?.country_name} / {data.region?.region_name} régió / {data.county?.county_name}
				megye
			</p>
			<a href="#section_event" class="aa"> &#9758; Esemény hozzáadása </a> &nbsp; &nbsp;
			<a href="#section_contact" class="aa"> &#9758; Kapcsolat hozzáadása </a> &nbsp; &nbsp;
		</hgroup>
		<br />
		<h4 class="h41">Adatok</h4>
		<a href="#section_school" class="ad"> &#9758; Iskola adatainak módosítása </a>
		<ul class="ab">
			<li class="lb">OM szám: {data.school.om_id}</li>
			<li class="lb">Igazgató: {data.school.dir_name}</li>
			<li class="lb">Iskola telefon: {data.school.dir_phone}</li>
			<li class="lb">Iskola email: {data.school.school_email}</li>
			<li class="lb">Website: {data.school.website}</li>
			<li class="lb">Iskola típusa: {data.resS}</li>
			<li class="lb">Felelős: {data.resD}</li>
			<li class="lb">Feljegyzés: {data.school.note}</li>
			<li class="lb">Kapcsolat:</li>
			<hgroup>
				{#each data.contact as con}
					<ul class="ac">
						<hgroup>
							<li class="lb">
								<a href="../../lists/contacts/{con.contact_id}" class="aa"
									>Név: {con.contact_name}
								</a>
							</li>
							<li class="lb">Telefon: {con.contact_phone}</li>
							<li class="lb">Email: {con.contact_email}</li>
							<li class="lb">Feljegyzés: {con.contact_note}</li>
						</hgroup>
					</ul>
				{/each}
			</hgroup>
		</ul>
		<h4 class="h42">Események</h4>
		<br />
		<ul class="aa">
			{#each data.event as e}
				<li class="la">
					<a href="../../lists/events/{e.event_id}" class="aa">
						{formatDate(e.closing_date)} &#9753 {e.event_name} &#10086 {e.on_duty} &#10087 {e.event_type}
					</a>
				</li>
			{/each}
		</ul>
	</hgroup>
	<br />
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>

	<!-- Event form -->

	<div class="grid element-to-position" id="section_event" >
		<div class="rei">
			<p>Event Register</p>
		</div>
		<form action="?/event" method="post" use:enhance>
			<div>
				<label for="fantasy">
					Event Name *
				</label>
				<input
					type="text"
					name="fantasy"
					id="fantasy"
					minlength="10"
					placeholder="ANY LONGER"
					required
				/>
				<p><i class="iii">* event name must be unique and at least 10 characters long</i></p>
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
				<label for="estimate">Estimated Number of Participants</label>
				<input type="number" name="estimate" id="estimate" required />
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

	<!-- Contact form -->

	<div class="grid element-to-even-position" id="section_contact">
		<div class="rei">
			<p class="h43">Contact Register</p>
		</div>
  	<br>
		<form action="?/contact" method="post" use:enhance>
			<div>
				<label for="name">Name</label>
				<input type="text" name="contactname" id="contactname" required />
			</div>
			<div>
				<label for="email">Email</label>
				<input type="email" name="contactemail" id="contactemail" required />
			</div>
			<div>
				<label for="phone">Phone</label>
				<input type="text" name="contactphone" id="contactphone" required />
			</div>
			<br>
				<label for="message">Note</label>
				<textarea id="message" name="contactmessage" rows="2" cols="50"></textarea>

			{#if form?.contact}
				<p class="error">Contact already exists.</p>
			{/if}

			{#if form?.uslug}
				<p class="error">Event already exists.</p>
			{/if}

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

	<!-- School update form -->

	<div class="grid school-to-position" id="section_school">
		<div class="rei">
			<p>School Update</p>
		</div>
		<br>
		<form action="?/school" method="post" use:enhance>
			<div>
				<label for="name">School Name</label>
				<input type="text" value={data.school.name} name="name" id="name" required />
			</div>
			<div>
				<label for="zip">ZIP Code</label>
				<input type="text" value={data.school.zip_code} name="zip" id="zip" required />
			</div>
			<div>
				<label for="address">Address</label>
				<input type="text" value={data.school.address} name="address" id="address" required />
			</div>
			<div>
				<label for="dirname">Head of School</label>
				<input type="text" value={data.school.dir_name} name="dirname" id="dirname" required />
			</div>
			<div>
				<label for="dirphone">School Phone</label>
				<input type="text" value={data.school.dir_phone} name="dirphone" id="dirphone" required />
			</div>
			<div>
				<label for="email">School Email</label>
				<input type="email" value={data.school.school_email} name="email" id="email" required />
			</div>
			<div>
				<label for="website">Website</label>
				<input type="text" value={data.school.website} name="website" id="website" required />
			</div>
			<br />
			<!-- SCOOL TYPE -->
			<div>
				<input type="checkbox" name="iskA" bind:checked={yesA} />
				ÁLTALÁNOS ISKOLA
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskB" bind:checked={yesB} />
				GIMNÁZIUM
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskC" bind:checked={yesC} />
				SZAKGIMNÁZIUM
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskD" bind:checked={yesD} />
				SZAKKÖZÉPISKOLA
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskE" bind:checked={yesE} />
				SZAKISKOLA
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskF" bind:checked={yesF} />
				TECHNIKUM
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskG" bind:checked={yesG} />
				SZAKKÉPZŐ ISKOLA
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskH" bind:checked={yesH} />
				ALAPFOKÚ MŰVÉSZETOKTATÁS
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskI" bind:checked={yesI} />
				MŰVÉSZETI OKTATÁS
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskJ" bind:checked={yesJ} />
				KÉSZSÉGFEJLESZTÉS
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskK" bind:checked={yesK} />
				FEJLESZTŐ NEVELÉS-OKTATÁS
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskL" bind:checked={yesL} />
				KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskM" bind:checked={yesM} />
				KOLLÉGIUM
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskN" bind:checked={yesN} />
				HÍDPROGRAMOK
			</div>
			<br />
			<div>
				<input type="checkbox" name="iskO" bind:checked={yesO} />
				NEM BESOROLT *
			</div>
			<p><i class="iii">* please leave a comment</i></p>
			<br />
			<div>
				<input type="checkbox" name="bas" bind:checked={yesBAS} />
				BASIC &nbsp;&nbsp;&nbsp;&nbsp;
				<input type="checkbox" name="med" bind:checked={yesMED} />
				MEDIOR &nbsp;&nbsp;&nbsp;&nbsp;
				<input type="checkbox" name="hig" bind:checked={yesHIG} />
				HIGH
			</div>
			<br />
			<div class="second">
				COOPERATION
				<input type="checkbox" name="coop" bind:checked={yesCOOP} />
			</div>
			<br />
			<div class="second">
				ACTIVE
				<input type="checkbox" name="active" bind:checked={yesACT} />
			</div>
			<br />
			<br />
			<textarea id="message" value={data.school.note} name="note" rows="4" cols="50" />
			{#if form?.local}
				<p class="error">Incorrect location.</p>
			{/if}

			{#if form?.omnum}
				<p class="error">OM ID already exists.</p>
			{/if}

			{#if form?.omval || form?.omid}
				<p class="error">OM ID is inadequate.</p>
			{/if}

			{#if form?.sch || form?.user}
				<p class="error">Please enter correct data.</p>
			{/if}

			{#if yesA == false && yesB == false && yesC == false && yesD == false && yesE == false && yesF == false && yesG == false && yesH == false && yesI == false && yesJ == false && yesK == false && yesL == false && yesM == false && yesN == false && yesO == false}
				<p class="error">One school type must be choosen.</p>
			{/if}

			{#if yesBAS == false && yesMED == false && yesHIG == false}
				<p class="error">One duty must be choosen.</p>
			{/if}

			<button class="btn" id="btn" type="submit">Update</button>
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
		transform: translateY(120vh); /* Move the element down one viewport height (vh) */
	}

	.element-to-even-position {
		transform: translateY(260vh); /* Move the element down one viewport height (vh) */
	}

	.school-to-position {
		transform: translateY(420vh);
	}

	.flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}

	.iii {
		display: flex;
		text-align: left;
		padding-left: 5px;
		color: rgb(146, 136, 136);
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

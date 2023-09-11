<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'
	import { dutyMap3, eventMap, formatDate, my_id } from '../../../stores/dataStore.js'
	let pageName = 'SCHOOL UPDATE'

	// Event "2023-10-26 15:00:00+02" "2023-10-26 15:00"
	function dateCutter(closing_date: String) {
		return closing_date.slice(0, -6)
	}
	let myEvent = {
			name: 'Én eseményem',
      closing_date: "2023-10-26 15:00:00+02",
      on_duty: '2',
      event_type: '7',
      estimated_student: 70,
      note: 'Nincs note',
      slug: "2023-12-06-budapest-ix-mikulas-part-9-keruleti-",
			user_id: "30ae1ec1-7fea-43fc-8b76-8895b1ccf433",
			school_id:  1,
	}



	function scrollToConnect() {
		window.scrollTo({
			top: 0,
		});
	}

	export let data
	export let form: ActionData


</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>



<div id="top" class="main">
	<h1>SCHOOL UPDATE</h1>
	<hgroup>
		<h3>{data.school.name}</h3>
		<hgroup>
			<h6>{data.school.zip_code} {data.city?.city_name} {data.school.address}</h6>
			<p>{data.country?.country_name} / {data.region?.region_name} régió / {data.county?.county_name} megye </p>
			<a href="#section_school" class="aa"> &#9758; SCHOOL UPDATE </a> &nbsp; &nbsp;
			<a href="#section_event" class="aa"> &#9758; EVENT UPDATE </a> &nbsp; &nbsp;
			<a href="#section_contact" class="aa"> &#9758; CONTACT UPDATE </a>
		</hgroup>
		<br />
		<h4 class="h41">Adatok</h4>
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
    <br>
		<ul class="aa">
			{#each data.event as e}
				<li class="la">
          <a href="../../lists/events/{e.event_id}" class="aa" >
						{formatDate(e.closing_date)} &#9753 {e.event_name} &#10086 {e.on_duty} &#10087 {e.event_type}
					</a>
				</li>
			{/each}
		</ul>
	</hgroup>
	<br>
	<br>
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>


	<!-- School update form -->

	<div class="grid" id="section_school">
		<div class="rei">
			<p>School Update</p>
		</div>
		<br>
		<form action="?/school" method="post" use:enhance>
			<div>
				<label for="name">School Name</label>
				<input type="text" value="{data.school.name}" name="name" id="name" required />
			</div>
			<div>
				<label for="user
				">User email</label>
				<input type="text" name="user
				" id="user
				" required />
			</div>

			<button class="btn" id="btn" type="submit">Update</button>
			<br>
			<button type="button" on:click={scrollToConnect} id="backToTop" class="contrast outline cgb" >Cancel / Jump to the Top</button>
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
    background-color: #32BEA6;
  }

  .btn {
    margin-bottom: 0;
    background-color: #32bea6;
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

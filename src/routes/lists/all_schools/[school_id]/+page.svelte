<script lang="ts">
	import { formatDate } from '../../../stores/dataStore.js'

	let pageName = 'School Details'

	export let data
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
      <li class="lb">Startswidth kapcsolat:</li>
      <hgroup>
				{#each data.user as u}
					<ul class="ac">
						<hgroup>
							<li class="lb">
								Név: {u.name}
							</li>
						</hgroup>
					</ul>
				{/each}
			</hgroup>
			<li class="lb">Kapcsolat:</li>
			<hgroup>
				{#each data.contact as con}
					<ul class="ac">
						<hgroup>
							<li class="lb">
								Név: {con.contact_name}
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
					<a href="../../lists/all_events/{e.event_id}" class="aa">
						{formatDate(e.closing_date)} &#9753 {e.event_name} &#10086 {e.on_duty} &#10087 {e.event_type}
					</a>
				</li>
			{/each}
		</ul>
	</hgroup>
	<br />
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
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

	.flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}
</style>

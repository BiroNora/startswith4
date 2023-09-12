<script lang="ts">
	import {
		formatDate,
		timeSlugify
	} from '../../../stores/dataStore.js'

	let pageName = 'Event Details'

	export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
	<h1>Event Details</h1>
	<hgroup>
			<h3>{data.event.event_name}</h3>
		<br />
		<h4 class="h41">Adatok</h4>
		<ul class="ab">
			<li class="lb">
				Időpont: {formatDate(data.event.closing_date)}, {timeSlugify(data.event.closing_date)}
			</li>
			<li class="lb">Szervező: {data.event.on_duty}</li>
			<li class="lb">Startswith kapcsolat: {data.user}</li>
			<li class="lb">Esemény formája: {data.event.event_type}</li>
			<li class="lb">Becsült résztvevők száma: {data.event.estimated_student}</li>
			<li class="lb">Iskola:</li>
			<hgroup>
				<ul class="ac">
					<li class="la">
						<a href="../../lists/all_schools/{data.school?.school_id}" class="aa">
							{data.school?.name}
							{' 🏠 '}
							{data.cityname}
						</a>
					</li>
				</ul>
			</hgroup>
			<li class="lb">Feljegyzés: {data.event.note}</li>
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
</style>

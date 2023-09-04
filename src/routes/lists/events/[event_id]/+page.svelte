<script lang="ts">
	import { formatDate, timeSlugify } from '../../../stores/dataStore.js'

	let pageName = 'Event Details'

	export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<h1>Event Details</h1>
	<hgroup>
		<hgroup class="title">
			<h3>{data.event.event_name} </h3>
			<a href="" class="aa"> &#9758; Érdeklődő diákok hozzáadása</a>
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

	.lc {
		list-style-position: inside;
		list-style-type: circle;
		line-height: 1.3;
	}
</style>

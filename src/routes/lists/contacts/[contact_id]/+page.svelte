<script lang="ts">
	let pageName = 'Contact Details'

	export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<h1>Contact Details</h1>
	<hgroup>
		<h3>{data.contact.contact_name}</h3>
		<br>
		<h4 class="h41">Adatok</h4>
		<a href="#section_school" class="ad"> &#9758; Kapcsolattartó adatainak módosítása </a>
		<ul class="ab">
			<li class="lb">Név: {data.contact.contact_name}</li>
			<li class="lb">Telefon: {data.contact.contact_phone}</li>
			<li class="lb">Email: {data.contact.contact_email}</li>
			<li class="lb">Feljegyzés: {data.contact.contact_note}</li>
			<li class="lb">Iskola:</li>
			<hgroup>
				{#each data.schools as sch}
					<ul class="ac">
						<hgroup>
							<li class="ld">
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
		</ul>
		<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
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

	.lb {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.4;
		font-size: 22px;
	}

	.ld {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -5%;
		line-height: 1.3;
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

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
		<ul class="ab">
			<li class="lb">Név: {data.contact.contact_name}</li>
			<li class="lb">Telefon: {data.contact.contact_phone}</li>
			<li class="lb">Email: {data.contact.contact_email}</li>
			<li class="lb">Feljegyzés: {data.contact.contact_note}</li>
			<hgroup>
				{#each data.schools as sch}
					<ul class="ac">
						<hgroup>
							<li class="lc">Iskola:</li>
							<li class="ld">
              <a href="../../lists/schools/{sch.school_id}" class="aa">Név: {sch.name}   </a></li>
							<li class="ld">Telefon: {sch.dir_phone}</li>
							<li class="ld">Email: {sch.school_email}</li>
							<li class="ld">Feljegyzés: {sch.note}</li>
						</hgroup>
					</ul>
				{/each}
			</hgroup>
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
		padding-left: 5%;
		text-indent: -6%;
		font-size: 22px;
	}

	.la {
		list-style-position: inside;
		list-style-type: disc;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.8;
	}

	.lb {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -6%;
		line-height: 1.3;
	}

	.lc {
		list-style-position: inside;
		list-style-type: circle;
		line-height: 1.3;
	}

	.ld {
		list-style-position: inside;
		list-style-type: circle;
		padding-left: 5%;
		text-indent: -5%;
		line-height: 1.3;
		font-size: 22px;
	}

	.h41 {
		color: #83918f;
	}

	.h42 {
		color: #32bea6;
	}
</style>

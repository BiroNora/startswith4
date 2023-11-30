<script lang="ts">
	import { enhance } from '$app/forms'

	let pageName = 'Contact Details'
	let yesACT = true

	function scrollToConnect() {
		window.scrollTo({
			top: 0
		})
	}

	export let data

	if (data.contact.active === false) {
		yesACT = false
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
	<div id="base">
		<h1>Contact Details</h1>
			<hgroup>
				{#if data.contact.active}
					<h3>{data.contact.contact_name}</h3>
				{:else if !data.contact.active}
					<h3>{data.contact.contact_name} {' ⚠️ '}</h3>
				{/if}
				<br>
				<h4 class="h41">Adatok</h4>
				<a href="#section_contact" class="ad"> &#9758; Kapcsolattartó adatainak módosítása </a>
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
											Név: {sch.school_name}
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


	<!-- Contact update form -->

	<div class="grid element-to-position" id="section_contact">
		<div class="rei">
			<p>Contact Update</p>
		</div>
  	<br>
		<form action="?/contact" method="post" use:enhance>
			<div>
				<label for="name">Name</label>
				<input type="text" value="{data.contact.contact_name}" name="contactname" id="contactname" required />
			</div>
			<div>
				<label for="email">Email</label>
				<input type="email" value="{data.contact.contact_email}" name="contactemail" id="contactemail" required />
			</div>
			<div>
				<label for="phone">Phone</label>
				<input type="text" value="{data.contact.contact_phone}" name="contactphone" id="contactphone" required />
			</div>
			<br>
			<div>
				<label for="message">Note</label>
				<textarea id="message" value="{data.contact.contact_note}" name="contactmessage" rows="2" cols="50"></textarea>
			</div>
			<br>
			<div class="second">
				ACTIVE
				<input type="checkbox" name="active" bind:checked={yesACT} />
			</div>
			<br>
			<br>
			<button class="btn" id="btn" type="submit" >Update</button>
			<br>
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44" >Cancel &#10070; Jump to the Top</button>
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
		text-decoration: none; /* Remove underline */
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}

	.h41 {
		color: #83918f;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}
</style>

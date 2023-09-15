<script lang="ts">
	import { my_id } from '../../stores/dataStore'
	import Modal from './Modal.svelte'

	let showModal = false

	export let myEvent = {
			name: 'Én eseményem',
      closing_date: "2023-10-26 15:00:00+02",
      on_duty: '2',
      event_type: '7',
      estimated_student: 70,
      note: 'Nincs note',
      slug: "2023-12-06-budapest-ix-mikulas-part-9-keruleti-",
			user_id: my_id,
			school_id:  1,
	}

	let pageName: "School_update"

	function scrollToConnect() {
		window.scrollTo({
			top: 0,
		});
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>



<div id="top" class="main">
	<h1>SCHOOL UPDATE</h1>
	<hgroup class="title">
		<h3>{myEvent.name} &nbsp;&nbsp;&nbsp;&nbsp;
			<a href="#section4_event" role="button" class="secondary outline ag h44"
				on:click={() => (showModal = true)}>
				<strong class="error1">&#10008;</strong> Esemény törlése* &nbsp;
			</a> <strong class="g">&nbsp;*csak abban az esetben törölhető egy esemény, ha nincs hozzárendelt érdeklődő diák </strong>
		</h3>
		<a href="#section_interested" class="aa"> &#9758; Érdeklődő diákok hozzáadása </a>
	</hgroup>

	<br>
	<br>
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>

<Modal bind:showModal>
</Modal>
</div>

<style>
	.g {
		color: #576b67;
		font-weight: 100;
		line-height: normal;
		font-size: 20px;
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

  .flower {
		font-size: 140%;
		color: #a0a9a8;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
	}
</style>

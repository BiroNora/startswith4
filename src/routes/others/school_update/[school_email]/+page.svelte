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
			user_id: my_id,
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
	<hgroup class="title">
		<h3>{myEvent.name} &nbsp;&nbsp;&nbsp;&nbsp;<a href="#section4_event" role="button" class="secondary outline ag h44" > <strong class="error1">&#10008;</strong> Esemény törlése* &nbsp; </a></h3>
		<a href="#section_interested" class="aa"> &#9758; Érdeklődő diákok hozzáadása </a>
	</hgroup>

	<br>
	<br>
	<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>



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
</style>

<script lang="ts">
	import { enhance } from '$app/forms'
	import { dateSlugify } from '../../../stores/dataStore.js'

	let pageName = 'Activity Delete Page'
	let showModal = false


	export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
  <hgroup>
    <h1> Activity Delete Page </h1>
    <a href="../activities" class="ab"> &#9758; Vissza a programok oldalra </a>
  </hgroup>
  <hgroup class="title">
    <a
      href="#top"
      class="aa"
      on:click={() => (showModal = true)}
      >
      <strong	class="error1">
      &#10008;&nbsp;&nbsp;
      &nbsp;
      </strong>
      {dateSlugify(String(data.activity?.end_date))}
					&#9753
					{data.activity?.act_name}
					&#10087
					{data.activity?.act_note}
					{' 🏠 '}
					{data.region}
    </a>
  </hgroup>
	<!-- Delete modal -->

	{#if showModal}
		<form action="?/delAct" method="post" use:enhance>
      <article>
      <h3>Az esemény adatai véglegesen törlődnek.</h3>
      <footer>
        <button
          type="submit"
          class="secondary w z cc"
          data-target="modal-example">
        Confirm
        </button>
        <button
          type="button"
          class="secondary outline h44 w z"
          data-target="modal-example"
          on:click={() => (showModal = false)}>
          Cancel
        </button>
      </footer>
			</article>
		</form>
	{/if}
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
		font-size: 23px;
	}

  .ab {
		color: #32bea6;
		font-weight: 400;
		line-height: normal;
		font-size: 22px;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}

	.w {
		width: auto;
	}

	.z {
    display: inline-flex;
		flex-direction: row-reverse;
	}

	.error1 {
    color: tomato;
    text-align: center;
    font-style: italic;
    line-height: 95%;
    font-weight: 500;
  }

	.title {
    padding-top: 4%;
  }

	.cc {
    background-color: #32bea6;
    border: 1em solide #32bea6;
  }

  .cc:hover {
    background-color: #0ba38a;
  }
	article::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
</style>

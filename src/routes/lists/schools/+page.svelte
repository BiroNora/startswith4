<script lang="ts">
  $: ({ schools, cities } = data)
  let pageName="My School List"

  export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>My School List</h1>
  <ul>
    {#each schools as { school_id, school_name, school_email, address, active, coop, city_id }}
      {#each cities as c}
        {#if city_id === c.city_id}
          {#if active && !coop}
          <li class="li">
          <a href="../lists/schools/{school_id}" class="aa">{ school_name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NO COOPERATION</strong></a>
          </li>
          {:else if active && coop}
          <li class="li">
            <a href="../lists/schools/{school_id}" class="aa">{ school_name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } </a>
          </li>
          {:else if !active && coop}
          <li class="li">
            <a href="../lists/schools/{school_id}" class="aa">{ school_name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NOT ACTIVE</a>
          </li>
          {:else if !active && !coop}
          <li class="li">
            <a href="../lists/schools/{school_id}" class="aa">{ school_name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NOT ACTIVE</strong></a>
          </li>
          {/if}
        {/if}
      {/each}
    {/each}
  </ul>
  <br>
  <a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
</div>

<style>
  .main {
    padding-left: 5%;
    padding-top: 2%;
    padding-right: 5%;
  }

  .aa {
    color: #32BEA6;
    padding: 2%;
    font-weight: 400;
    line-height: normal;
    font-size: 23px;
  }

  .li {
    list-style-position: inside;
    list-style-type: disc;
    color: rgb(144, 132, 132);
    padding-left: 5%;
    text-indent: -6%;
    line-height: 2;
  }

  strong {
    font-size: 18px;
    font-weight: 500;
    color: tomato;
  }

  .flower {
		font-size: 140%;
		color: #a0a9a8;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
	}
</style>

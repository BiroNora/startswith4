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
    {#each schools as { school_id, name, school_email, address, city_id }}
      {#each cities as c}
        {#if city_id == c.city_id}
          <li class="li">
          <a href="../lists/schools/{school_id}" class="aa">{ name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } </a>
          </li>
        {/if}
      {/each}
    {/each}
  </ul>
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
</style>

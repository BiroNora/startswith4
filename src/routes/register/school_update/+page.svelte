<script lang="ts">
  $: ({ schools, cities } = data)
  let pageName="SCHOOL UPDATE"

  export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>SCHOOL UPDATE</h1>
  <ul>
    {#each schools as school}
      {#each cities as c}
        {#if school.city_id == c.city_id}
          <li class="li"> 
          <a href="../register/school_update/{school.school_email}" class="aa">{ school.name } {' 🏠 '} { c.city_name } {', '} { school.address } {' 📝 '} { school.school_email } </a>
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

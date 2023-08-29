<script lang="ts">
    export let data

    const my_id = "35190e9d-c80a-477e-97e3-499c5df7edfd"

    $: ({ school, city } = data)
</script>


<div class="main">
<h1>My School List</h1>

<ul>
  {#each school as { name, school_email, address, city_id, user_id}}
    {#if user_id == my_id}
      {#each city as c}
        {#if city_id == c.city_id}
          <li>
          <a href="/schools/{school_email}" class="aa">{ name } {' - '} { c.city_name } {', '} { address } {' ↪️ '} { school_email } </a>
          </li>
        {/if}
      {/each}
      {/if}
  {/each}
</ul>
</div>


<style>
  .main {
    padding-left: 5%;
    padding-top: 2%;
  }
  .aa {
    color: #32BEA6;
    padding: 2%;
    text-align: center;
    font-weight: 400;
    line-height: normal;
    font-size: 22px;
  }
</style>

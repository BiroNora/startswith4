<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    // Define a function to handle the search
    function handleSearch() {
      const input = document.getElementById("searchInput") as HTMLInputElement
      const list = document.getElementById("list") as HTMLUListElement
      const filter = input.value.toLowerCase()
      const items = list.getElementsByTagName("li")

      // Loop through all list items
      for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent?.toLowerCase() || ""
        if (text.indexOf(filter) > -1) {
          items[i].style.display = ""
        } else {
          items[i].style.display = "none"
        }
      }
    }

    // Add an event listener to the input element
    const input = document.getElementById("searchInput") as HTMLInputElement
    input.addEventListener("input", handleSearch)
  })

  $: ({ schools, cities } = data)
  let pageName="School List"

  export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>School List</h1>
  <input type="text" id="searchInput" placeholder="Search for items...">
  <br>
  <br>
  <ul id="list">
    {#each schools as { school_id, name, school_email, address, active, coop, city_id }}
      {#each cities as c}
        {#if city_id == c.city_id}
          {#if active && !coop}
          <li class="li">
          <a href="../lists/all_schools/{school_id}" class="aa">{ name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NO COOPERATION</strong></a>
          </li>
          {:else if active && coop}
          <li class="li">
            <a href="../lists/all_schools/{school_id}" class="aa">{ name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } </a>
          </li>
          {:else if !active && coop}
          <li class="li">
            <a href="../lists/all_schools/{school_id}" class="aa">{ name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NOT ACTIVE</a>
          </li>
          {:else if !active && !coop}
          <li class="li">
            <a href="../lists/all_schools/{school_id}" class="aa">{ name } {' 🏠 '} { c.city_name } {', '} { address } {' 📝 '} { school_email } {' ⚠️ '} <strong>NOT ACTIVE</strong></a>
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

  .flower {
		font-size: 140%;
		color: #a0a9a8;
    padding-bottom: 3%;
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
    padding-bottom: 3%;
	}

  strong {
  font-weight: 500;
  color: tomato;
  }
</style>

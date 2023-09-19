<script lang="ts">
  import { onMount } from 'svelte'

  $: ({ schools, cities, regions } = data)

  onMount(() => {
    // Define a function to handle the search
    function handleSearch() {
      const input = document.getElementById("searchInput") as HTMLInputElement
      const list = document.getElementById("list") as HTMLUListElement
      const filter = input.value.toLowerCase()
      const items = list.getElementsByTagName("li")
      const lengthElement = document.getElementById("length")
      const itemCountElement = document.getElementById("itemCount") // Get the itemCount element

      let matchingItemCount = 0

      // Loop through all list items
      for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent?.toLowerCase() || ""
        if (text.indexOf(filter) > -1 || filter == "") {
          items[i].style.display = ""
          matchingItemCount++
        } else {
          items[i].style.display = "none"
        }
      }
      // Update the length element with the matching item count
      lengthElement!.textContent = matchingItemCount.toString()

      if (filter == "") {
        itemCountElement!.style.display = "none" // Hide the itemCount element
      } else {
        itemCountElement!.style.display = "block" // Show the itemCount element
      }
    }

    // Add an event listener to the input element
    const input = document.getElementById("searchInput") as HTMLInputElement
    input.addEventListener("input", handleSearch)
  })

  let pageName="School List"

  export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
    <h1>School List<h4 class="z">Number of schools:&nbsp;{schools.length}</h4></h1>
  <input type="text" id="searchInput" placeholder="Search for items...">
  <br>
  <div id="itemCount" class="y" style="display: none;" >Number of items: &nbsp;<span id="length"></span></div>
  <br>
  <ul id="list">
    {#each schools as { school_id, name, active, coop, city_id, region_id, basic, medior, high }}
      {#each cities as c}
        {#if city_id == c.city_id}
          {#each regions as r}
            {#if region_id == r.region_id}
              {#if active && !coop}
                <li class="li">
                  <a href="../lists/all_schools/{school_id}" class="aa">
                    { name } &#10148; { r.region_name } {' 🏠 '} { c.city_name } &#10045;
                    <strong
                      class="s1">{#if (basic)} BASIC {/if} {#if (medior)} MEDIOR {/if} {#if (high)} HIGH {/if}
                    </strong>
                      {' ⚠️ '}
                    <strong class="s">
                      NO COOPERATION
                    </strong>
                  </a>
                </li>
                {:else if active && coop}
                <li class="li">
                  <a href="../lists/all_schools/{school_id}" class="aa">
                    { name } &#10148; { r.region_name } {' 🏠 '} { c.city_name } &#10045;
                    <strong
                      class="s1">{#if (basic)} BASIC {/if} {#if (medior)} MEDIOR {/if} {#if (high)} HIGH {/if}
                    </strong>
                  </a>
                </li>
                {:else if !active && coop}
                <li class="li">
                  <a href="../lists/all_schools/{school_id}" class="aa">
                    { name } &#10148; { r.region_name } {' 🏠 '} { c.city_name } &#10045;
                    <strong
                      class="s1">{#if (basic)} BASIC {/if} {#if (medior)} MEDIOR {/if} {#if (high)} HIGH {/if}
                    </strong>
                    {' ⚠️ '}
                    <strong class="s">
                      NOT ACTIVE
                    </strong>
                    </a>
                </li>
                {:else if !active && !coop}
                <li class="li">
                  <a href="../lists/all_schools/{school_id}" class="aa">
                    { name } &#10148; { r.region_name } {' 🏠 '} { c.city_name } &#10045;
                    <strong
                      class="s1">{#if (basic)} BASIC {/if} {#if (medior)} MEDIOR {/if} {#if (high)} HIGH {/if}
                    </strong>
                    {' ⚠️ '}
                    <strong class="s">
                      NOT ACTIVE
                    </strong>
                  </a>
                </li>
              {/if}
            {/if}
          {/each}
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
    font-size: 20px;
  }

  .li {
    list-style-position: inside;
    list-style-type: disc;
    color: rgb(144, 132, 132);
    padding-left: 5%;
    text-indent: -6%;
    line-height: 1.6;
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

  .s {
    font-size: 18px;
    font-weight: 500;
    color: tomato;
  }

  .s1 {
    font-size: 18px;
    font-weight: 500;
    color: rgb(144, 132, 132);
  }

  .z {
    color: rgb(144, 132, 132);
  }

  .y {
    color: rgb(144, 132, 132);
    font-weight: 500;
  }
</style>

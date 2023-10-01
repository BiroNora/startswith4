<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageServerData } from './$types'

  export let data: PageServerData

  const { schools, cities, regions, counties } = data

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
        console.log(text)
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
        console.log(itemCountElement?.childElementCount)
      }
    }

    function clearInput() {
      let input = document.getElementById("searchInput") as HTMLInputElement
      input.value = ''
      handleSearch()
    }

    // Add an event listener to the input element
    const input = document.getElementById("searchInput") as HTMLInputElement
    input.addEventListener("input", handleSearch)

    // Attach the clearInput function to the delete button
    const deleteButton = document.querySelector(".clear-button")
    deleteButton!.addEventListener("click", clearInput)
  })

  let pageName="School List"
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <hgroup>
    <h1>School List*<i>&emsp;*Grey colored schools have no Startswith connection</i></h1>
    <h4 class="z">Number of schools:&nbsp;{schools.length}</h4>
  </hgroup>
  <br>

  <div class="input-container">
    <input
      type="search"
      id="searchInput"
      placeholder="Search for items..."
    >
    <button
      type="button"
      class="clear-button secondary outline"
    >
      &#10007;
    </button>
  </div>

  <div id="itemCount" class="z" style="display: none;" >Number of items: &nbsp;<span id="length"></span></div>
  <br>
  <ul id="list">
    {#each schools as s }
      {#each cities as c}
        {#if s.city_id == c.city_id}
          {#each regions as r}
            {#if s.region_id == r.region_id}
              {#each counties as coun}
                {#if (s.county_id == coun.county_id)}
                  {#if s.active && !s.coop}
                    <li class="li">
                      <a href="../lists/all_schools/{s.school_id}" class={s.User.length > 0 ? "aa" : "bb"}>
                        { s.name } {' 🏠 '} { r.region_name } &#10148; {coun.county_name} &#10148; { c.city_name } &#10045;
                        <strong
                          class="s1">{#if (s.basic)} BASIC {/if} {#if (s.medior)} MEDIOR {/if} {#if (s.high)} HIGH {/if}
                        </strong>
                          {' ⚠️ '}
                        <strong class="s">
                          NO COOPERATION
                        </strong>
                      </a>
                    </li>
                  {:else if s.active && s.coop}
                    <li class="li">
                      <a href="../lists/all_schools/{s.school_id}" class={s.User.length > 0 ? "aa" : "bb"}>
                        { s.name } {' 🏠 '} { r.region_name } &#10148; {coun.county_name} &#10148; { c.city_name } &#10045;
                        <strong
                          class="s1">{#if (s.basic)} BASIC {/if} {#if (s.medior)} MEDIOR {/if} {#if (s.high)} HIGH {/if}
                        </strong>
                      </a>
                    </li>
                  {:else if !s.active && s.coop}
                    <li class="li">
                      <a href="../lists/all_schools/{s.school_id}" class={s.User.length > 0 ? "aa" : "bb"}>
                        { s.name } {' 🏠 '} { r.region_name } &#10148; {coun.county_name} &#10148; { c.city_name } &#10045;
                        <strong
                          class="s1">{#if (s.basic)} BASIC {/if} {#if (s.medior)} MEDIOR {/if} {#if (s.high)} HIGH {/if}
                        </strong>
                        {' ⚠️ '}
                        <strong class="s">
                          NOT ACTIVE
                        </strong>
                        </a>
                    </li>
                  {:else if !s.active && !s.coop}
                    <li class="li">
                      <a href="../lists/all_schools/{s.school_id}" class={s.User.length > 0 ? "aa" : "bb"}>
                        { s.name } {' 🏠 '} { r.region_name } &#10148; {coun.county_name} &#10148; { c.city_name } &#10045;
                        <strong
                          class="s1">{#if (s.basic)} BASIC {/if} {#if (s.medior)} MEDIOR {/if} {#if (s.high)} HIGH {/if}
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
    font-weight: 480;
    font-size: 20px;
  }

  .bb {
    color: rgb(144, 132, 132);
    padding: 2%;
    font-weight: 400;
    font-size: 20px;
    font-style: italic;
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
		text-decoration: none; /* Remove underline */
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
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
    color: #32bea6;
    font-size: medium;
    font-weight: 400;
  }

  .input-container {
  position: relative;
  }

  .clear-button {
    position: absolute;
    width: auto;
    top: 35%;
    right: 38px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 1.2rem;
    color: #32bea6;
  }

  i {
    font-size: medium;
		font-weight: 300;
	}
</style>

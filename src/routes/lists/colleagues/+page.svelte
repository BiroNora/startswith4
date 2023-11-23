<script lang="ts">
	import { onMount } from 'svelte'
	import { dutyMap, dutyType } from '../../stores/dataStore.js'

	let pageName = 'Colleagues'
  let region: string | undefined
  let matchingItemCount: number

	export let data

	function filterDuty(arr: number[]): string[] {
		const result: any = []
		const array = arr
			.filter((number) => number % 10 !== 0)
  		.map((number) => number.toString())

		for (let i = 0; i < array.length; i++) {
			const char1 = array[i].charAt(0)
			const duty = dutyType.find((item) => item[0] === char1)
			const char2 = array[i].charAt(1)

      if (char1 == '5') {
        const onDuty = dutyMap.find((item) => item.id === char2)
        region = onDuty ? onDuty.name : 'Unknown'
      } else {
        region = data.regs.find((reg) => reg.region_id === Number(char2))?.region_name
      }

			if (duty && region) {
				result.push(`${duty[1]}: ${region}`)
			}
		}

  	return result.join(', ')
	}

	onMount(() => {
    // Define a function to handle the search
    function handleSearch() {
      const input = document.getElementById("searchInput") as HTMLInputElement
      const list = document.getElementById("list") as HTMLUListElement
      const filter = input.value.toLowerCase()
      const items = list.getElementsByTagName("li")
      const lengthElement = document.getElementById("length")
      const itemCountElement = document.getElementById("itemCount") // Get the itemCount element

      matchingItemCount = 0

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
      if (lengthElement) {
        lengthElement.textContent = matchingItemCount.toString()
      }

      if (filter == "") {
        itemCountElement!.style.display = "none" // Hide the itemCount element
      } else {
        itemCountElement!.style.display = "block" // Show the itemCount element
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
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div id="top" class="main">
  <h1>StartsWith Colleagues</h1>

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

  <div id="itemCount" class="z" style="display: none;" >
    {#if matchingItemCount === 0}
      &nbsp; No Result
    {/if}
    {#if matchingItemCount === 1}
		  <span id="length" >{matchingItemCount}</span>
      &nbsp; Colleague
    {/if}
    {#if matchingItemCount > 1}
      <span id="length" >{matchingItemCount}</span>
		  &nbsp; Colleagues
    {/if}
	</div>
	<br>
  <ul id="list">
    {#each data.users as user}
			<li class="li aa">
				{user.user_name}
				{' 🏠 '}
				{filterDuty(user.on_duty)}
				{' ☎️ '}
				{user.user_phone}
				{' 📝 '}
				{user.user_email}
      </li>
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
    font-weight: 400;
    line-height: normal;
    font-size: 23px;
  }

	.z {
    color: rgb(144, 132, 132);
    font-size: medium;
    font-weight: 400;
    font-style: italic;
  }

	.li {
    list-style-position: inside;
    list-style-type: disc;
    padding-left: 5%;
    text-indent: -6%;
    line-height: 2;
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

	.flower {
		font-size: 140%;
		color: #a0a9a8;
		padding-top: 1%;
		text-decoration: none; /* Remove underline */
	}

	.flower:hover {
		font-size: 140%;
		color: #32bea6;
		padding-top: 1%;
		text-decoration: none; /* Remove underline */
	}
</style>

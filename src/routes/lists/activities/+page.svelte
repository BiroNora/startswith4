<script lang="ts">
	import { onMount } from 'svelte'
	import { dateSlugify, dutyMap } from '../../stores/dataStore.js'
	import type { ActionData } from './$types'

	let pageName = 'Activity List'
	let matchingItemCount: number

	export let data
	export let form: ActionData

	const user_duty_array = data.user_duty
		.filter((number: any) => number % 10 !== 0)

	const user_duties_only = user_duty_array.map((number: any) => parseInt(String(number)[0], 10))

	// If user === director
	const dda = data.dir_duty

	function scrollToConnect() {
		window.scrollTo({
			top: 0
		})
	}

	// Search
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
        if (text.indexOf(filter) > -1 || filter === "") {
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

      if (filter === "") {
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
	<div id="base">
    <hgroup>
		<h1>Activities</h1>
		<a
      href="#section_event"
      class="aa"
    >
      &#9758; Program hozzáadása
    </a>
		{#if data.dir_flag}
			&nbsp; &nbsp;
			<a
			href="#section_dir"
			class="aa"
			>
			&#9758; Központi üzenet hozzáadása
			</a>
		{/if}
			&nbsp; &nbsp;
    </hgroup>
    <br />

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
				&nbsp; Activity
			{/if}
			{#if matchingItemCount > 1}
				<span id="length" >{matchingItemCount}</span>
				&nbsp; Activities
			{/if}
		</div>
		<br>

    <ul id="list">
		{#each data.activities as act}
			{#if data.is_director}
				<!-- User === director && only own messages -->
				{#if act.dir_flag && act.on_duty.charAt(0) === dda}
					<li class="li">
						<a href="../lists/activities/{act.act_id}" class="ab">
							{dateSlugify(String(act.end_date))}
							&#9753
							<strong>{act.act_name}</strong>
							&#10087
							{#if act.act_note !== null}
								{act.act_note}
							{/if}
							{' 🏠 '}
							{#each dutyMap as item, index (item.id)}
								{#if act.on_duty.charAt(0) === item.id}
									{item.name}:
								{/if}
							{/each}
							{#if (act.on_duty).charAt(1) === '0'}
								every regions
							{:else}
								{#each data.regio as reg}
									{#if Number((act.on_duty).charAt(1)) === reg.region_id}
										{reg.region_name}
									{/if}
								{/each}
							{/if}
						</a>
					</li>
				{/if}
				<!-- User === director && only concerning messages -->
				{#if !act.dir_flag && act.on_duty.charAt(0) === dda}
					<li class="lib">
						{dateSlugify(String(act.end_date))}
						&#9753
						<strong>{act.act_name}</strong>
						&#10087
						{#if act.act_note !== null}
							{act.act_note}
						{/if}
						{' 🏠 '}
						{#each dutyMap as item, index (item.id)}
							{#if act.on_duty.charAt(0) === item.id}
								{item.name}:
							{/if}
						{/each}
						{#if (act.on_duty).charAt(1) === '0'}
							every regions
						{:else}
							{#each data.regio as reg}
								{#if Number((act.on_duty).charAt(1)) === reg.region_id}
									{reg.region_name}
								{/if}
							{/each}
						{/if}
					</li>
				{/if}

			{:else}
			<!-- User !== director && (own (director's || director's all_region)) messages -->
				{#if
					(act.dir_flag &&
					((user_duty_array.includes(Number(act.on_duty))) ||
					(user_duties_only.includes(Number((act.on_duty).charAt(0))) && act.all_region)))
				}
					<li class="lia">
							{dateSlugify(String(act.end_date))}
							&#9753
							<strong>{act.act_name}</strong>
							&#10087
							{#if act.act_note !== null}
								{act.act_note}
							{/if}
							{' 🏠 '}
							{#each dutyMap as item, index (item.id)}
								{#if act.on_duty.charAt(0) === item.id}
									{item.name}:
								{/if}
							{/each}
							{#if (act.on_duty).charAt(1) === '0'}
								every regions
							{:else}
								{#each data.regio as reg}
									{#if Number((act.on_duty).charAt(1)) === reg.region_id}
										{reg.region_name}
									{/if}
								{/each}
							{/if}
						</li>
					{/if}
				<!-- User !== director, any others -->
				{#if !act.dir_flag }
					<li class="li">
						<a href="../lists/activities/{act.act_id}" class="ac">
							{dateSlugify(String(act.end_date))}
							&#9753
							<strong>{act.act_name}</strong>
							&#10087
							{#if act.act_note !== null}
								{act.act_note}
							{/if}
							{' 🏠 '}
							{#each dutyMap as item, index (item.id)}
								{#if act.on_duty.charAt(0) === item.id}
									{item.name}:
								{/if}
							{/each}
							{#each data.regio as reg}
								{#if Number((act.on_duty).charAt(1)) === reg.region_id}
									{reg.region_name}
								{/if}
							{/each}
						</a>
					</li>
				{/if}
			{/if}
    {/each}
    </ul>
    <br>
		<a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
	</div>

	<!-- Dir message form -->

	{#if data.dir_flag}
		<div class="rei grid element-to-position" id="section_dir" >
			<p>Central Message Register</p>
			<form action="?/dir_message" method="post" >
				<div>
					<label for="meeting-time">Show Message till this Date</label>
					<input
						type="datetime-local"
						id="meeting-time"
						name="meeting-time"
						value="YYYY-MM-DDT00:00"
						min="2021-06-07T00:00"
						max="2060-06-14T00:00"
					/>
				</div>
				<div >
					<label for="region"><i>Select Region</label>
					<select name="region" id="region" class="hidden-textbox">
						<option value="ALL">ALL</option>
						{#each data.regio as reg}
							<option value={reg.region_id}>{reg.region_name} </option>
						{/each}
					</select>
				</div>
				<label for="dir_message">Message</label>
					<textarea id="dir_message" name="dir_message" rows="4" cols="50"></textarea>
				<button class="btn" id="btn" type="submit">Send Message</button>
				<br />
				<button
					type="button"
					on:click={scrollToConnect}
					id="backToTop"
					class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
				>
			</form>
		</div>
	{/if}

	<!-- Activity form -->

	<div class="grid element-to-position1" id="section_event" >
		<div class="rei">
			<p>Activity Register</p>
		</div>
		<form action="?/activity" method="post" >
			<div>
				<label for="fantasy">
					Event Name
				</label>
				<input
					type="text"
					name="fantasy"
					id="fantasy"
					placeholder="Activity"
					required
				/>
			</div>
			<div>
				<label for="meeting-time">Activity Date</label>
				<input
					type="datetime-local"
					id="meeting-time"
					name="meeting-time"
					value="YYYY-MM-DDT00:00"
					min="2021-06-07T00:00"
					max="2060-06-14T00:00"
				/>
			</div>
      <div>
        <label for="duty">Duty</label>
        <select name="duty" id="duty" >
          {#each dutyMap as item, index (item.id)}
						<option value={item.id}>{item.name}</option>
					{/each}
        </select>
      </div>
			<div>
        <label for="region">Region</label>
        <select name="region" id="region" >
          {#each data.regio as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
			<label for="message">Note</label>
				<textarea id="message" name="message" rows="2" cols="50" />

			{#if form?.inactsu}
				<p class="error">Something went wrong.</p>
			{/if}

			{#if form?.user || form?.school}
				<p class="error">Please enter correct data.</p>
			{/if}

			{#if form?.title}
				<p class="error">Event name is too short.</p>
			{/if}

			{#if form?.uslug}
				<p class="error">Event already exists.</p>
			{/if}

			<button class="btn" id="btnevent" type="submit">Register</button>
			<br />
			<button
				type="button"
				on:click={scrollToConnect}
				id="backToTop"
				class="contrast outline cgb h44">Cancel &#10070; Jump to the Top</button
			>
		</form>
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
		color: #282f2e;
		font-weight: 500;
		line-height: normal;
		font-size: 25px;
	}

	.ac {
		color: #32bea6;
		font-weight: 400;
		line-height: normal;
		font-size: 23px;
	}

	.lia {
    list-style-position: inside;
    list-style-type: none;
    padding-left: 5%;
    text-indent: -6%;
    color: #282f2e;
		line-height: 1.35;
		font-size: 25px;
	}

	.lia::before {
    content: "•"; /* Use a disc bullet character */
    color: rgb(144, 132, 132); /* Set the bullet color to grey */
    margin-right: 45px; /* Adjust spacing between bullet and text */
		font-size: 30px;
	}

	.lib {
    list-style-position: inside;
    list-style-type: none;
    padding-left: 5%;
    text-indent: -6%;
    color: #32BEA6;
		line-height: 1.35;
		font-size: 25px;
	}

	.lib::before {
    content: "•"; /* Use a disc bullet character */
    color: rgb(144, 132, 132); /* Set the bullet color to grey */
    margin-right: 45px; /* Adjust spacing between bullet and text */
		font-size: 30px;
	}

	.li {
    list-style-position: inside;
    list-style-type: none; /* Remove default bullet */
    padding-left: 5%;
    text-indent: -6%;
    color: #32bea6; /* Set font color to #32bea6 */
		line-height: 1.35;
	}

	.li::before {
    content: "•"; /* Use a disc bullet character */
    color: rgb(144, 132, 132); /* Set the bullet color to grey */
    margin-right: 45px; /* Adjust spacing between bullet and text */
		font-size: 30px;
	}

	.h44 {
		color: #83918f;
		border-color: #83918f;
	}

	.z {
    color: rgb(144, 132, 132);
    font-size: medium;
    font-weight: 400;
    font-style: italic;
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
		background-color: #32bea6;
	}

	.btn {
		margin-bottom: 0;
		background-color: #32bea6;
	}

	.element-to-position {
		transform: translateY(420vh); /* Move the element down one viewport height (vh) */
	}

	.element-to-position1 {
		transform: translateY(520vh); /* Move the element down one viewport height (vh) */
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

	.h44 {
		color: #83918f;
		border-color: #83918f;
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

	.error {
		color: tomato;
		padding: 2%;
		text-align: center;
		font-style: italic;
		line-height: 95%;
		font-weight: 500;
	}
</style>

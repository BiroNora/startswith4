<script lang="ts">
  import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import type { ActionData, PageServerData } from './$types'

  export let data: PageServerData
  const { countries, regions, counties, cities } = data

  export let form: ActionData

  let yesA = true
  let yesB = false
  let yesC = false
  let yesD = false
  let yesE = false
  let yesF = false
  let yesG = false
  let yesH = false
  let yesI = false
  let yesJ = false
  let yesK = false
  let yesL = false
  let yesM = false
  let yesN = false
  let yesO = false
  let yesCOOP = true
  let yesBAS = true
  let yesMED = false
  let yesHIG = false
  let omi = ''
  let pageName="School Register"

  let selectedCountry: number | null = null
  let selectedRegion: number | null = null
  let selectedCounty: number | null = null
  let selectedCity: number | null = null
  let filteredRegions: typeof regions = []
  let filteredCounties: typeof counties = []
  let filteredCities: typeof cities = []

  // Function to filter regions based on the selected country
  function filterRegions() {
    filteredRegions = regions.filter((region) => region.country_id == selectedCountry)
    selectedRegion = null // Reset selected region
    filterCounties()
  }

  // Function to filter counties based on the selected region
  function filterCounties() {
    filteredCounties = counties.filter((county) => county.region_id == selectedRegion)
    selectedCounty = null // Reset selected county
    filterCities()
  }

  // Function to filter cities based on the selected county
  function filterCities() {
    filteredCities = cities.filter((city) => city.county_id == selectedCounty)
    selectedCity = null // Reset selected city
  }

  // Initialize the filtered lists when the component mounts
  onMount(filterRegions)

</script>
<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>School Register</p>
  </div>
  <br>
  <form action="?/school" method="post" use:enhance>
    <fieldset>
      <legend class="n">Location</legend>
      <p class="notice">Please note: if country / region / county /city <i>does not exist</i>  in the list, <a class="aa" href="/register/location">use this link</a>  before the registration. </p>

      <div>
        <label for="countr">Country</label>
        <select name="countr" id="country" bind:value={selectedCountry} on:change={filterRegions}>
          {#each countries as country}
            <option value="{country.country_id}">{country.country_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="region">Region</label>
        <select name="region" id="region" bind:value={selectedRegion} on:change={filterCounties}>
          {#each filteredRegions as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="county">County</label>
        <select name="county" id="county" bind:value={selectedCounty} on:change={filterCities}>
          {#each filteredCounties as coun}
            <option value="{coun.county_id}">{coun.county_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="city">City</label>
        <select name="city" id="city" bind:value={selectedCity}>
          {#each filteredCities as cit}
            <option value="{cit.city_id}">{cit.city_name}</option>
          {/each}
        </select>
      </div>

    </fieldset>
    <br>
    <div>
      <label for="om">OM ID *</label>
      <p><i class="iiii">* for Schools in Hungary only</i></p>
      <input type="text" name="om" id="om" bind:value={omi}/>
    </div>
    <div>
      <label for="name">School Name</label>
      <input type="text" name="name" id="name" required />
    </div>
    <div>
      <label for="zip">ZIP Code</label>
      <input type="text" name="zip" id="zip" required />
    </div>
    <div>
      <label for="address">Address</label>
      <input type="text" name="address" id="address" required />
    </div>
    <div>
      <label for="dirname">Head of School</label>
      <input type="text" name="dirname" id="dirname" required />
    </div>
    <div>
      <label for="dirphone">School Phone Number</label>
      <input type="text" name="dirphone" id="dirphone" required />
    </div>
    <div>
      <label for="email">School Email</label>
      <input type="email" name="email" id="email" required />
    </div>
    <div>
      <label for="useremail">User Email</label>
      <input type="uemail" name="useremail" id="useremail" required />
    </div>
    <div>
      <label for="website">Website</label>
      <input type="text" name="website" id="website" required />
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskA" bind:checked={yesA} />
      ÁLTALÁNOS ISKOLA
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskB" bind:checked={yesB} />
      GIMNÁZIUM
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskC" bind:checked={yesC} />
      SZAKGIMNÁZIUM
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskD" bind:checked={yesD} />
      SZAKKÖZÉPISKOLA
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskE" bind:checked={yesE} />
      SZAKISKOLA
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskF" bind:checked={yesF} />
      TECHNIKUM
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskG" bind:checked={yesG} />
      SZAKKÉPZŐ ISKOLA
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskH" bind:checked={yesH} />
      ALAPFOKÚ MŰVÉSZETOKTATÁS
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskI" bind:checked={yesI} />
      MŰVÉSZETI OKTATÁS
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskJ" bind:checked={yesJ} />
      KÉSZSÉGFEJLESZTÉS
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskK" bind:checked={yesK} />
      FEJLESZTŐ NEVELÉS-OKTATÁS
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskL" bind:checked={yesL} />
      KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskM" bind:checked={yesM} />
      KOLLÉGIUM
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskN" bind:checked={yesN} />
      HÍDPROGRAMOK
    </div>
    <br>
    <div >
      <input type="checkbox" name="iskO" bind:checked={yesO} />
      NEM BESOROLT *
    </div>
    <p><i class="iii">* please leave a comment</i></p>
    <div class="first">
      <div>
        <input type="checkbox" name="bas" bind:checked={yesBAS} />
        BASIC
      </div>
      <div>
        <input type="checkbox" name="med" bind:checked={yesMED} />
        MEDIOR
      </div>
      <div>
        <input type="checkbox" name="hig" bind:checked={yesHIG} />
        HIGH
      </div>
    </div>
    <fieldset>
      <legend class="n">Note on School</legend>
      <br>
        <div class="second">
          <input type="checkbox" name="coop" bind:checked={yesCOOP} />
          COOPERATION
        </div>
        <br>
        <textarea id="message" name="note" rows="4" cols="50"></textarea>
    </fieldset>
    {#if form?.local }
      <p class="error">Incorrect location.</p>
    {/if}

    {#if form?.omnum}
      <p class="error">OM ID already exists.</p>
    {/if}

    {#if form?.omval || form?.omid}
      <p class="error">OM ID is inadequate.</p>
    {/if}

    {#if form?.sch || form?.user}
      <p class="error">Please enter correct data.</p>
    {/if}

    {#if (yesA == false && yesB == false && yesC == false && yesD == false && yesE == false && yesF == false && yesG == false && yesH == false && yesI == false && yesJ == false && yesK == false && yesL == false && yesM == false && yesN == false && yesO == false)}
      <p class="error">One school type must be choosen.</p>
    {/if}

    {#if yesBAS == false && yesMED == false && yesHIG == false}
      <p class="error">One duty must be choosen.</p>
    {/if}

    <div>
      <p class="noticea">Please note: contact can be added on Shool Details page.</p>
    </div>

    <button class="btn" id="btn" type="submit">Register</button>
  </form>
</div>

<style>
  i {
    color: #32BEA6;
  }

  .iii {
    display: flex;
    text-align: left;
    padding-left: 40px;
    color: rgb(146, 136, 136);
  }

  .iiii {
    color: rgb(146, 136, 136);
    padding-left: 10px;
  }

  .n {
    font-weight: 500;
  }

  .notice {
    color: tomato;
    padding: 2%;
    text-align: center;
    font-weight: bolder;
    line-height: normal;
  }

  .noticea {
    color: #32BEA6;
    padding: 2%;
    text-align: center;
    font-weight: 500;
    line-height: normal;
  }

  .aa {
    color: #32BEA6;
    font-style: italic;
  }

  .first {
    justify-content:space-between;
    padding: 0 5% 5%;
    line-height: 1.9;
  }

  fieldset {
    position: relative;
    padding: 6px;
    border: 2px solid #32BEA6;
    border-radius: 5px;
    border-spacing: 2px;
  }

  label {
    padding: 6px;
  }

  legend {
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
    width: 35%;
    line-height: 85%;
    grid-row: minmax(5px, auto);
    margin: 10px auto 10px auto;
    border: 2px solid #32BEA6;
    border-radius: 5px;
    border-spacing: 2px;
    flex: 10 auto;
  }

  .grid input:checked {
  background-color: #32BEA6;
  }

  .btn {
    margin-bottom: 0;
    background-color: #32BEA6;
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

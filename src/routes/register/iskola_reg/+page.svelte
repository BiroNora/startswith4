<script lang="ts">
  import { enhance } from '$app/forms'
	import { onMount } from 'svelte'
	import type { PageServerData } from './$types'

  export let data: PageServerData
  const { countries, regions, counties, cities } = data


  let pageName="Iskola Register"

  let selectedCountry: number | null = null
  let selectedRegion: number | null = null
  let selectedCounty: number | null = null
  let selectedCity: number | null = null
  let filteredRegions: typeof regions = []
  let filteredCounties: typeof counties = []
  let filteredCities: typeof cities = []

  let isCountrySelected = false
  let isRegionSelected = false
  let isCountySelected = false

  // Function to filter regions based on the selected country
  function filterRegions() {
    filteredRegions = regions.filter((region) => region.country_id == selectedCountry);
    selectedRegion = null // Reset selected region
    isCountrySelected = true // Enable the region select
    filterCounties()
  }

  // Function to filter counties based on the selected region
  function filterCounties() {
    filteredCounties = counties.filter((county) => county.region_id == selectedRegion)
    selectedCounty = null // Reset selected county
    isRegionSelected = true // Enable the county select
    filterCities()
  }

  // Function to filter cities based on the selected county
  function filterCities() {
    filteredCities = cities.filter((city) => city.county_id == selectedCounty)
    selectedCity = null // Reset selected city
    isCountySelected = true // Enable the city select
  }

  // Initialize the filtered lists when the component mounts
  onMount(() => {
    filterRegions
  })

</script>
<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>Iskola Register</p>
  </div>
  <br>
  <form action="?/school" method="post" use:enhance>
    <fieldset>
      <legend class="n">Location</legend>
      <p class="notice">Please note: if country / region / county /city <i>does not exist</i>  in the list, <a class="aa" href="/register/location">use this link</a>  before the registration. </p>
      <div>
        <label for="countr">Country</label>
        <select
          name="countr"
          id="country"
          bind:value={selectedCountry}
          on:change={filterRegions} >
          {#each countries as country}
            <option value="{country.country_id}">{country.country_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="region">Region</label>
        <select
          name="region"
          id="region"
          bind:value={selectedRegion}
          on:change={filterCounties}
          disabled={!isCountrySelected} >
          {#each filteredRegions as reg}
            <option value="{reg.region_id}">{reg.region_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="county">County</label>
        <select
          name="county"
          id="county"
          bind:value={selectedCounty}
          on:change={filterCities}
          disabled={!isRegionSelected} >
          {#each filteredCounties as coun}
            <option value="{coun.county_id}">{coun.county_name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="city">City</label>
        <select
          name="city"
          id="city"
          bind:value={selectedCity}
          disabled={!isCountySelected} >
          {#each filteredCities as cit}
            <option value="{cit.city_id}">{cit.city_name}</option>
          {/each}
        </select>
      </div>
    </fieldset>
    <br>

    <button class="btn" id="btn" type="submit">Register</button>
  </form>
</div>

<style>
  i {
    color: #32BEA6;
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

  .aa {
    color: #32BEA6;
    font-style: italic;
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
    width: 45%;
    line-height: 85%;
    grid-row: minmax(5px, auto);
    margin: 10px auto 10px auto;
    border: 2px solid #32BEA6;
    border-radius: 5px;
    border-spacing: 2px;
    flex: 10 auto;
  }
  .btn {
    margin-bottom: 0;
    background-color: #32BEA6;
  }
  </style>

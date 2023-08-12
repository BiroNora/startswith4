<script lang="ts">
	import { enhance } from '$app/forms'
	import type { PageServerData } from './$types'

  export let data: PageServerData
  const { country, regio, county, city } = data

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
  let yesO = true
  let omi = ''
  let pageName="School Register"

</script>
<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>School Register</p>
  </div>

<form action="?/school" method="post" use:enhance>
  <fieldset>
    <legend>Location</legend>
    <p class="notice">Please note: if country / region / county /city <i>does not exist</i>  in the list, <a class="aa" href="/register/location">use this link</a>  before the registration. </p>
    <div>
      <label for="countr">Country</label>
      <select name="countr" id="countr" >
        {#each country as countr}
          <option value="{countr.country_id}">{countr.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="region">Region</label>
      <select name="region" id="region" >
        {#each regio as reg}
          <option value="{reg.region_id}">{reg.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="county">County</label>
      <select name="county" id="county" >
        {#each county as coun}
          <option value="{coun.county_id}">{coun.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="city">City</label>
      <select name="city" id="city" >
        {#each city as cit}
          <option value="{cit.city_id}">{cit.name}</option>
        {/each}
      </select>
    </div>
  </fieldset>
  <br>
    <div>
      <label for="om">OM id (for Hungary <strong><i>required</i></strong>)</label>
      <input type="text" name="om" id="om" bind:value={omi}/>
    </div>
    <div>
      <label for="name">School name</label>
      <input type="text" name="name" id="name" required />
    </div>
    <div>
      <label for="zip">ZIP code</label>
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
      <label for="dirphone">School's phone number</label>
      <input type="text" name="dirphone" id="dirphone" required />
    </div>
    <div>
      <label for="email">School's email</label>
      <input type="text" name="email" id="email" required />
    </div>
    <div>
      <label for="website">Website</label>
      <input type="text" name="website" id="website" required />
    </div>
    <div class="second">
      <input type="checkbox" name="iskA" bind:checked={yesA} />
      ÁLTALÁNOS ISKOLA
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskB" bind:checked={yesB} />
      GIMNÁZIUM
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskC" bind:checked={yesC} />
      SZAKGIMNÁZIUM
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskD" bind:checked={yesD} />
      SZAKKÖZÉPISKOLA
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskE" bind:checked={yesE} />
      SZAKISKOLA
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskF" bind:checked={yesF} />
      TECHNIKUM
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskG" bind:checked={yesG} />
      SZAKKÉPZŐ ISKOLA
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskH" bind:checked={yesH} />
      ALAPFOKÚ MŰVÉSZETOKTATÁS
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskI" bind:checked={yesI} />
      MŰVÉSZETI OKTATÁS
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskJ" bind:checked={yesJ} />
      KÉSZSÉGFEJLESZTÉS
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskK" bind:checked={yesK} />
      FEJLESZTŐ NEVELÉS-OKTATÁS
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskL" bind:checked={yesL} />
      KIEGÉSZÍTŐ NEMZETISÉGI NYELVOKTATÁS
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskM" bind:checked={yesM} />
      KOLLÉGIUM
    </div>
    <br>
    <div class="second">
      <input type="checkbox" name="iskN" bind:checked={yesN} />
      HÍDPROGRAMOK
    </div>
    <br>
    <fieldset>
      <legend>Memo</legend>
      <br>
        <div class="second">
          <input type="checkbox" name="coop" bind:checked={yesO} />
          COOPERATION
        </div>
        <label for="message">Note:</label>
        <textarea id="message"
          name="message"
          rows="4"
          cols="50" >
          </textarea>
    </fieldset>

  {#if (omi != '' && omi.length != 6)}
    <p>Please enter the correct OM Id</p>
  {/if}

  {#if (yesA == false && yesB == false && yesC == false && yesD == false && yesE == false && yesF == false && yesG == false && yesH == false && yesI == false && yesJ == false && yesK == false && yesL == false && yesM == false && yesN == false)}
    <p class="error">One school type must be choosen.</p>
  {/if}

  <button class="btn" id="btn" type="submit">Register</button>
</form>
</div>

<style>
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
  </style>

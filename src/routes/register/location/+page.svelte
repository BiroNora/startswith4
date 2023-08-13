<script lang="ts">
	import { enhance } from '$app/forms'

  let pageName="Location Register"
</script>

<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>Location Register</p>
  </div>
  <form action="?/location" method="post" use:enhance>
  <fieldset>
    <legend>New Location</legend>
    <div>
      <label for="country">Country</label>
      <input type="text" name="country" id="country" required />
    </div>
    <div>
      <label for="region">Region</label>
      <input type="text" name="region" id="region" required />
    </div>
    <div>
      <label for="county">County</label>
      <input type="text" name="county" id="county" required />
    </div>
    <div>
      <label for="city">City</label>
      <input type="text" name="city" id="city" required />
    </div>
  </fieldset>
  <br>
  <button class="btn" id="btn" type="submit">Register</button>
</form>
</div>


<style>
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

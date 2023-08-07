<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

  let yesB = true
  let yesM = false
  let yesH = false
  let yesS = false
  let yesD = false

  export let form: ActionData

</script>

<h1>Register</h1>

<form action="?/register" method="post" use:enhance>
	<div>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" required />
	</div>
	<div>
		<label for="nationality">Nationality</label>
		<input type="text" name="nationality" id="nationality" required />
	</div>
	<div>
		<label for="phone">Phone</label>
		<input type="text" name="phone" id="phone" required />
	</div>
	<div>
		<label for="email">Email</label>
		<input type="text" name="email" id="email" required />
	</div>
	<div>
		<input type="checkbox" name="basic" bind:checked={yesB} />
			BASIC
    <select name="regB" id="basic-select" class="hidden-textbox" >
      <option value="" placeholder="Please enter the region(s)" >Please choose a region</option>
      <option value="Dél-Alföld">Dél-Alföld</option>
      <option value="Dél-Dunántúl">Dél-Dunántúl</option>
      <option value="Észak-Magyarország">Észak-Magyarország</option>
      <option value="Budapest">Budapest</option>
      <option value="Közép-Dunántúl">Közép-Dunántúl</option>
      <option value="Nyugat-Dunántúl">Nyugat-Dunántúl</option>
      <option value="Észak-Alföld">Észak-Alföld</option>
      <option value="Közép-Magyarország">Közép-Magyarország</option>
    </select>
  </div>
  <div>
    <input type="checkbox" name="medior" bind:checked={yesM} />
      MEDIOR
      <select name="regM" id="basic-select" class="hidden-textbox" >
        <option value="" placeholder="Please enter the region(s)" >Please choose a region</option>
        <option value="Dél-Alföld">Dél-Alföld</option>
        <option value="Dél-Dunántúl">Dél-Dunántúl</option>
        <option value="Észak-Magyarország">Észak-Magyarország</option>
        <option value="Budapest">Budapest</option>
        <option value="Közép-Dunántúl">Közép-Dunántúl</option>
        <option value="Nyugat-Dunántúl">Nyugat-Dunántúl</option>
        <option value="Észak-Alföld">Észak-Alföld</option>
        <option value="Közép-Magyarország">Közép-Magyarország</option>
      </select>
    </div>
  <div>
    <input type="checkbox" name="high" bind:checked={yesH} />
      HIGH
    <select name="regH" id="basic-select" class="hidden-textbox" >
      <option value="" placeholder="Please enter the region(s)" >Please choose a region</option>
      <option value="Dél-Alföld">Dél-Alföld</option>
      <option value="Dél-Dunántúl">Dél-Dunántúl</option>
      <option value="Észak-Magyarország">Észak-Magyarország</option>
      <option value="Budapest">Budapest</option>
      <option value="Közép-Dunántúl">Közép-Dunántúl</option>
      <option value="Nyugat-Dunántúl">Nyugat-Dunántúl</option>
      <option value="Észak-Alföld">Észak-Alföld</option>
      <option value="Közép-Magyarország">Közép-Magyarország</option>
    </select>
    </div>
  <div>
    <input type="checkbox" name="superior" bind:checked={yesS} />
      SUPERIOR
    <select name="regS" id="basic-select" class="hidden-textbox" >
      <option value="" placeholder="Please enter the region(s)" >Please choose a region</option>
      <option value="Dél-Alföld">Dél-Alföld</option>
      <option value="Dél-Dunántúl">Dél-Dunántúl</option>
      <option value="Észak-Magyarország">Észak-Magyarország</option>
      <option value="Budapest">Budapest</option>
      <option value="Közép-Dunántúl">Közép-Dunántúl</option>
      <option value="Nyugat-Dunántúl">Nyugat-Dunántúl</option>
      <option value="Észak-Alföld">Észak-Alföld</option>
      <option value="Közép-Magyarország">Közép-Magyarország</option>
    </select>
    </div>
  <div>
    <input type="checkbox" name="director" bind:checked={yesD} />
      DIRECTOR
  </div>
	<div>
		<label for="password1">Password</label>
		<input type="password" name="password1" id="password1" required />
	</div>
  <div>
		<label for="password2">Confirm Password</label>
		<input type="password" name="password2" id="password2" required />
	</div>

	{#if form?.user}
		<p class="error">Username is taken.</p>
	{/if}

  {#if (yesB == false && yesM == false && yesH == false && yesS == false && yesD == false)}
    <p class="error">One duty must be choosen.</p>
  {/if}

	<button id="btn" type="submit">Register</button>
</form>

<style>
  .hidden-textbox {
      visibility: hidden;
  }

  input[type='checkbox']:checked~.hidden-textbox {
  visibility: visible;
}
  </style>

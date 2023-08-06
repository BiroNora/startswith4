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
    
    <input type="text" name="regB" class="hidden-textbox" placeholder="Please enter the region(s)" required={yesB}/>
  </div>
  <div>
    <input type="checkbox" name="medior" bind:checked={yesM} />
      MEDIOR
    <input type="text" name="regM" class="hidden-textbox" placeholder="Please enter the region(s)" required={yesM}/>
  </div>
  <div>
    <input type="checkbox" name="high" bind:checked={yesH} />
      HIGH
    <input type="text" name="regH" class="hidden-textbox" placeholder="Please enter the region(s)" required={yesH} />
  </div>
  <div>
    <input type="checkbox" name="superior" bind:checked={yesS} />
      SUPERIOR
    <input type="text" name="regS" class="hidden-textbox" placeholder="Please enter the region(s)" required={yesS} />
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
	<button type="submit">Register</button>
</form>

<style>
  .hidden-textbox {
      visibility: hidden;
  }

  input[type='checkbox']:checked~.hidden-textbox {
  visibility: visible;
}
  </style>

<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageServerData } from './$types'

  export let data: PageServerData
  const { regio } = data

  let yesB = true
  let yesM = false
  let yesH = false
  let yesS = false
  let yesD = false
  let pageName="Register to Startswidth";

  export let form: ActionData

</script>
<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div>
    <h1>Register to Startswidth    <img src="../../256.png" alt="icon" width="55" height="55"/></h1>
  </div>

<form action="?/user" method="post" use:enhance>
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
    <div class="second">
      <input type="checkbox" name="basic" bind:checked={yesB} />
        BASIC
      <select name="regB" id="sel-B" class="hidden-textbox" >
        {#each regio as reg}
          <option value="{reg.region_id}">{reg.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <input type="checkbox" name="medior" bind:checked={yesM} />
        MEDIOR
        <select name="regM" id="sel-M" class="hidden-textbox" >
          {#each regio as reg}
            <option value="{reg.region_id}">{reg.name}</option>
          {/each}
        </select>
      </div>
    <div>
      <input type="checkbox" name="high" bind:checked={yesH} />
        HIGH
        <select name="regH" id="sel-H" class="hidden-textbox" >
          {#each regio as reg}
            <option value="{reg.region_id}">{reg.name}</option>
          {/each}
        </select>
      </div>
    <div >
      <input type="checkbox" name="superior" bind:checked={yesS} />
        SUPERIOR
        <select name="regS" id="sel-S" class="hidden-textbox" >
          {#each regio as reg}
            <option value="{reg.region_id}">{reg.name}</option>
          {/each}
        </select>
      </div>
    <div class="dir">
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
		<p class="error">Email is taken.</p>
	{/if}

  {#if (yesB == false && yesM == false && yesH == false && yesS == false && yesD == false)}
    <p class="error">One duty must be choosen.</p>
  {/if}

  <button class="btn" id="btn" type="submit">Register</button>
</form>
</div>

<style>
  .hidden-textbox {
      visibility: hidden;
  }

  input[type='checkbox']:checked~.hidden-textbox {
    visibility: visible;
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

  .dir {
    padding-bottom: 15px;
  }

  .btn {
    margin-bottom: 0;
    background-color: #32BEA6;
  }
  </style>

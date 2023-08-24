<script lang="ts">
	import { enhance } from '$app/forms'
  import type { ActionData } from './$types'

  let pageName="Contact Register"

  export let form: ActionData
</script>

<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>Contact Register</p>
  </div>
  <form action="?/contact" method="post" use:enhance>
    <div>
      <label for="name">Name</label>
      <input type="text" name="contactname" id="contactname" required />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="text" name="contactemail" id="contactemail" required />
    </div>
    <div>
      <label for="phone">Phone</label>
      <input type="text" name="contactphone" id="contactphone" required />
    </div>
    <div>
      <label for="uemail">User Email</label>
      <input type="text" name="useremail" id="useremail" required />
    </div>
    <div>
      <label for="schemail">School Email</label>
      <input type="text" name="schoolemail" id="schoolemail" required />
    </div>
  <br>
    <fieldset>
      <legend class="n">Note</legend>
      <br>
        <textarea id="message"
          name="contactmessage"
          rows="4"
          cols="50" >
          </textarea>
    </fieldset>

  {#if form?.contact}
      <p class="error">Contact already exists.</p>
  {/if}

  {#if form?.local}
      <p class="error">Something went wrong. Please try it later.</p>
  {/if}

  {#if form?.contacts}
      <p class="error">Please enter correct data.</p>
  {/if}

  {#if form?.real}
      <p class="error">This contact is already added to this shool and this user.</p>
  {/if}
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

  .n {
    font-weight: 500;
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
    line-height: normal;
    line-height: 95%;
  }
</style>

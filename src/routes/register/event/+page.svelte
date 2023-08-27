<script lang="ts">
	import { enhance } from '$app/forms'
  import type { ActionData } from './$types'
  import { dutyMap3 } from '../../stores/dataStore'
  import { eventType } from '../../stores/dataStore'

  let pageName="Event Register"

  export let form: ActionData
</script>

<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>Event Register</p>
  </div>
  <form action="?/event" method="post" use:enhance>
    <div>
      <label for="fantasy"><p class="noticea">Please note: event name must be unique and at least 10 characters long.</p>Event Name</label>
      <input type="text" name="fantasy" id="fantasy" minlength="10" placeholder="ANY LONGER" required />
    </div>
    <div>
      <label for="meeting-time">Event Date</label>
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
      <label for="duty">On Duty</label>
      <select name="duty" id="duty" class="hidden-textbox" >
        {#each dutyMap3 as item, index (item.id)}
          <option value="{item.id}">{item.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="type">Event Type</label>
      <select name="type" id="type" class="hidden-textbox" >
        {#each eventType as item, index (item.id)}
          <option value="{item.id}">{item.name}</option>
        {/each}
      </select>
      <p><i class="iii">in case of * please leave a comment</i></p>
    </div>
    <div>
      <label for="estimate">Estimated Number of Participants</label>
      <input type="text" name="estimate" id="estimate" required />
    </div>
    <div>
      <label for="schemail">School Email</label>
      <input type="email" name="schoolemail" id="schoolemail" required />
    </div>
    <div>
      <label for="uemail">User Email</label>
      <input type="email" name="uemail" id="uemail" required />
    </div>
  <br>
    <fieldset>
      <legend class="n">Note</legend>
      <br>
        <textarea id="message" name="message" rows="4" cols="50"></textarea>
    </fieldset>

  {#if form?.user}
      <p class="error">User does not exist.</p>
  {/if}

  {#if form?.school}
      <p class="error">School does not exist.</p>
  {/if}

  {#if form?.title}
      <p class="error">Event name is shorter than 10 chars long.</p>
  {/if}

  {#if form?.uslug}
      <p class="error">Event with same data is already exists.</p>
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

  .iii {
    display: flex;
    text-align: left;
    padding-left: 5px;
    color: rgb(146, 136, 136);
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

  .noticea {
    color: #32BEA6;
    padding: 2%;
    text-align: center;
    font-weight: 500;
    line-height: normal;
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

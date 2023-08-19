<script lang="ts">
	import type { ActionData } from "../lists/contacts/$types"
  import { enhance } from '$app/forms'
  export let isOpen: boolean
  export let onClose: () => void

  export let form: ActionData

  let c_name = ''
  let c_email = ''
  let c_phone = ''
  let u_email = ''
  let s_email = ''
  let c_note = ''

  function handleSubmit() {
    // You can perform any necessary actions here, like sending the data to an API
    onClose();
  }

</script>


{#if isOpen}
  <div class="modal-background">
    <div class="modal-overlay">
      <div class="modal card">
        <div class="card-body">
          <br>
          <form action="?/school" method="post" use:enhance>
            <br>
            <p class="a">Contact Register</p>
            <br>
            <input type="text" class="input" bind:value={c_name} name="contactname" placeholder="Name" />
            <input type="email" class="input" bind:value={c_email} name="contactemail" placeholder="Email" />
            <input type="text" class="input" bind:value={c_phone} name="contactphone" placeholder="Phone" />
            <input type="email" class="input" bind:value={u_email} name="useremail" placeholder="User Email" />
            <input type="email" class="input" bind:value={s_email} name="schoolemail" placeholder="School Email" />
            <textarea rows="4" cols="50" bind:value={c_note} name="contactmessage" placeholder="Note" />
            {#if form?.contact}
              <p class="error">Please enter correct data.</p>
            {/if}
            <button class="btn primary" on:click|stopPropagation={handleSubmit}>Submit</button>
            <button class="contrast outline cbb" on:click={onClose}>Cancel</button>
          </form>
          <br>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .a {
    font-size: 140%;
    font-weight: bold;
  }
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(231, 217, 217, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    height: auto;
    width: 38%;
    background-color: rgba(155, 147, 147, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    max-height: 640px;
    min-width: 38%;
    padding: 10px;
    overflow-y: auto;
  }

  .btn {
    background-color: #32BEA6;
  }

  .cbb {
    border: 2px solid #32BEA6;
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

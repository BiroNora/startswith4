<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData

  let pageName="FORGOT_PASSWORD"
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>Forgot Password</h1>

  <form action="?/forgot" method="POST">
    {#if !form?.sent}
    <div class="w">
      <label for="email">Enter your email</label>
      <input id="email" name="email" type="email" required />
    </div>

    <button
      class="btn"
      id="btn"
      type="submit"
      >
      Send Request
    </button>
    {/if}

    {#if form?.credentials}
      <p class="error">Wrong credential.</p>
    {/if}

    {#if form?.sent}
      <h1 >Please, check your emailbox.</h1>
    {/if}
  </form>
</div>

<style>
  .main {
    padding-left: 0.5%;
    padding-top: 2%;
    padding-right: 0.5%;
    width: 100%;
  }

  .w {
    width: 25%;
  }

  input {
		border-top-left-radius: 100px;
    border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
	}

  label {
		padding-left: 1%;
		font-size: 22px;
		font-weight: 400;
		color: rgb(144, 132, 132);
	}

  .btn {
		border-top-left-radius: 100px;
    border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
		width: 25%;
		background-color: #32bea6;
	}

	.btn:hover {
		background-color: #11a58c;
	}

  .error {
    color: tomato;
    text-align: center;
    font-style: italic;
    font-weight: 500;
    width: 25%;
  }
</style>

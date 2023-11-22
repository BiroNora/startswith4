<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData

  let pageName="RESET PASSWORD"
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>Reset Password</h1>

  <form action="?/reset" method="POST">
    <div class="w">
      <label for="password">New Password</label>
      <input id="password" name="password" type="password" required />
    </div>

    <div class="w">
      <label for="password1">Confirm Password</label>
      <input id="password1" name="password1" type="password" required />
    </div>

    {#if form?.credentials}
      <p class="error">Wrong credentials.</p>
    {/if}

    <button
      class="btn"
      id="btn"
      type="submit"
      >
      Go to Login
    </button>
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

  .h44 {
		color: #83918f;
		border-color: #83918f;
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

  .btn-outline {
		border-top-left-radius: 100px;
    border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
		width: 25%;
    border-color: #32bea6;
	}

	.btn-outline:hover {
		border-color: #6c7776;
	}

  .error {
    color: tomato;
    text-align: center;
    font-style: italic;
    font-weight: 500;
    width: 25%;
  }
</style>

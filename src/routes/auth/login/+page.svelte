<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData

  let pageName="LOGIN"
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>Login</h1>

  <form action="?/login" method="POST">
    <div class="w">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
    </div>

    <div class="w">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
    </div>

    {#if form?.invalid}
      <p class="error">Email address and password are required.</p>
    {/if}

    {#if form?.credentials}
      <p class="error">Wrong credentials.</p>
    {/if}

    <button
      class="btn"
      id="btn"
      type="submit"
      >
      Login
    </button>
  </form>
  <form action="?/forgot" method="POST">
    <button
      class="contrast outline cgb h44 btn-outline"
      id="btn"
      type="submit"
      >
      Forgot Password?
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

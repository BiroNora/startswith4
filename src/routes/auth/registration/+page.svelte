<script lang="ts">
	import { enhance } from '$app/forms'
	import { dutyMap } from '../../stores/dataStore'
	import type { ActionData, PageServerData } from './$types'
	export let data: PageServerData
	const { regions } = data

	let yesB = true
	let yesM = false
	let yesH = false
	let yesS = false
	let yesD = false
	const regionsArray = regions || []

	let pageName = 'Register to Startswith'

	export let form: ActionData
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="grid">
	<div class="rei">
		<p>Register to Startswith</p>
	</div>
	<br />
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
			<select name="regB" id="sel-B" class="hidden-textbox">
				{#each regionsArray as regio}
					<option value={regio.region_id}>{regio.region_name}</option>
				{/each}
			</select>
		</div>
		<div>
			<input type="checkbox" name="medior" bind:checked={yesM} />
			MEDIOR
			<select name="regM" id="sel-M" class="hidden-textbox">
				{#each regionsArray as regio}
					<option value={regio.region_id}>{regio.region_name}</option>
				{/each}
			</select>
		</div>
		<div>
			<input type="checkbox" name="high" bind:checked={yesH} />
			HIGH
			<select name="regH" id="sel-H" class="hidden-textbox">
				{#each regionsArray as regio}
					<option value={regio.region_id}>{regio.region_name}</option>
				{/each}
			</select>
		</div>
		<div>
			<input type="checkbox" name="superior" bind:checked={yesS} />
			SUPERIOR
			<select name="regS" id="sel-S" class="hidden-textbox">
				{#each regionsArray as regio}
					<option value={regio.region_id}>{regio.region_name}</option>
				{/each}
			</select>
		</div>
		<div class="dir">
			<input type="checkbox" name="director" bind:checked={yesD} />
			DIRECTOR
			<select name="regD" id="sel-D" class="hidden-textbox">
				{#each dutyMap as item, index (item.id)}
					<option value={item.id}>{item.name}</option>
				{/each}
			</select>
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

		{#if form?.invalid}
			<p class="error">Confirm password.</p>
		{/if}

		{#if form?.passw}
			<p class="error">The password must be at least 8 characters long,
				and must include at least one lowercase and uppercase letter,
				at least one numeric digit and at least one special character
				(such as !, @, #, $, %, ^, &, *).</p>
		{/if}

		{#if form?.regions}
			<p class="error">One duty must be choosen.</p>
		{/if}

		<button class="btn" id="btn" type="submit">Register</button>
	</form>
</div>

<style>
	.rei p {
		position: relative;
		line-height: normal;
		font-size: 140%;
		font-weight: bold;
	}

	.hidden-textbox {
		visibility: hidden;
	}

	input[type='checkbox']:checked ~ .hidden-textbox {
		visibility: visible;
	}

	.grid {
		padding: 35px 15px 0px 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-content: space-around;
		width: 45%;
		line-height: 85%;
		grid-row: minmax(5px, auto);
		margin: 10px auto 10px auto;
		border: 2px solid #32bea6;
		border-radius: 5px;
		border-spacing: 2px;
		flex: 10 auto;
	}

	.grid input:checked {
		background-color: #32bea6;
	}

	label {
		padding: 6px;
	}

	.dir {
		padding-bottom: 15px;
	}

	.btn {
		margin-bottom: 0;
		background-color: #32bea6;
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

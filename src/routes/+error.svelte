<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="rei">
	<p class="font-extrabold">{$page.status}</p>
	<div class="pt-8">
		<p>Sorry, looks like something went wrong.</p>
		<div class="pt-5 font-extrabold text-xl text-red-500">
			<a href="/lists/activities">Click here to return to the Activities Page</a>
		</div>
	</div>
</div>

<style>
  .rei {
    margin-top: 5%;
    position: relative;
    text-align: center;
		line-height: normal;
		font-size: 140%;
		font-weight: bold;
	}
</style>

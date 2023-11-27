<script lang="ts">
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';

	const initialView: LatLngExpression = [47.4979, 19.0402]; // Dortmund, Germany
	const markerLocations: Array<LatLngExpression> = [
		[47.4979, 19.0402]
	];
</script>

<div class="m">
	<Leaflet view={initialView} zoom={14}>
		{#each markerLocations as latLng}
			<Marker {latLng} width={5} height={5}>
				<!-- ShipBit Icon -->


				<Popup
					>Like & Subscribe! This is a very loooooooooooong title and it has many characters.</Popup
				>
			</Marker>
		{/each}
	</Leaflet>
</div>

<style>
  .m {
    width: 100%;
    height: 800;
  }
</style>

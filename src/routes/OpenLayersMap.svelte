<script>
  import { onMount } from 'svelte';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import Zoom from 'ol/control/Zoom';

  let map;

  onMount(() => {
    // Create a new map instance
    map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    });
  });
</script>

<style>
  /* Ensure the map container has a fixed size */
  #map {
    width: 100%;
    height: 700px; /* Set the desired height of the map container */
  }
</style>

<div id="map"></div>

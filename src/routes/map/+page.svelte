<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  let map: any

  onMount(() => {
    // Define a custom marker icon without a shadow
    const customIcon = L.icon({
      iconUrl: 'path/to/custom-marker.png', // Replace with the path to your custom marker image
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })
    // Create a new map instance
    map = L.map('map').setView([47.4979, 19.0402], 8);

    // Add an OpenStreetMap tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '',
    }).addTo(map);

    L.marker([47.4979, 19.0402])
      .addTo(map)
      .bindPopup('Budapest, Hungary'); // Add a popup with information

    // Add the country GeoJSON layer
    fetch('./country.geojson') // Path to your GeoJSON file
      .then(response => response.json())
      .then(geojson => {
        L.geoJSON(geojson).addTo(map);
      });
  });
</script>

<div id="map"></div>

<style>
  /* Ensure the map container has a fixed size */
  #map {
    width: 100%;
    height: 700px; /* Set the desired height of the map container */
  }
</style>

<script lang="ts">
  import '@picocss/pico'
  import { page } from '$app/stores'
	import { enhance } from '$app/forms'
</script>

<nav aria-label="breadcrumb" class="a">

  {#if $page.data.user}
    <ul>
      <li>
        <a href="/register/school" target="_blank">School_R</a>
      </li>
      <li>
        <a href="/register/location" target="_blank">Location_R</a>
      </li>
      <li>
        <a href="/tables/chart_table" target="_blank">Chart_Table</a>
      </li>
      <li>
        <a href="/tables/school_event" target="_blank">School_Event</a>
      </li>
      <li>
        <a href="/lists/colleagues" target="_blank">Colleagues</a>
      </li>
      <li>
        <a href="/lists/all_schools" target="_blank">All Schools List</a>
      </li>
      <li>
        <a href="/lists/all_events" target="_blank">All Events List</a>
      </li>
      <li>
        <a href="/lists/activities" target="_blank">Activity List</a>
      </li>
      <li>
        <a href="/lists/schools" target="_blank">My School List</a>
      </li>
      <li>
        <a href="/lists/events" target="_blank">My Event List</a>
      </li>
      <li>
        <a href="/lists/contacts" target="_blank">My Contact List</a>
      </li>
      <li>
        <form class="logout" action="/auth/logout" method="POST" use:enhance>
          <button type="submit">Log out</button>
        </form>
      </li>
    </ul>
	{/if}
</nav>

<main>
  <slot />
</main>

<style>
  .a {
    padding-left: 1%;
    padding-right: 1%;
    color: #32bea6;
  }
</style>

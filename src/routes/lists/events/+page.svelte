<script lang="ts">
    $: ({ events } = data)
    let pageName="My Event List"
    import { dateSlugify } from '../../stores/dataStore'

    export let data
  </script>

  <svelte:head>
      <title>{pageName}</title>
  </svelte:head>

  <div class="main">
    <h1>My Event List</h1>
    <ul>
      {#each events as ev}
        <li class="li">
          <a href="../lists/events/{ev.event_id}" class="aa">
            {dateSlugify(String(ev.closing_date))}
            &#9753
            {ev.event_name}
            {' 🏠 '}
            {ev.slug}
            &#10087
            {ev.on_duty}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <style>
    .main {
      padding-left: 5%;
      padding-top: 2%;
      padding-right: 5%;
    }

    .aa {
      color: #32BEA6;
      padding: 2%;
      font-weight: 400;
      line-height: normal;
      font-size: 23px;
    }

    .li {
      list-style-position: inside;
      list-style-type: disc;
      color: rgb(144, 132, 132);
      padding-left: 5%;
      text-indent: -6%;
      line-height: 2;
    }
  </style>

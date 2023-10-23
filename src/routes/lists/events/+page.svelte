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
  <hgroup>
    <h1>My Event List<i></h1>
    <h4 class="z">Number of events:&nbsp;{events.length}</h4>
  </hgroup>
  <br>
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
  <br>
  <a href="#top" class="flower">&#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046 &nbsp &#10046</a>
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

  .z {
    color: rgb(144, 132, 132);
    font-size: medium;
    font-weight: 400;
    font-style: italic;
  }

  .flower {
    font-size: 140%;
    color: #a0a9a8;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
  }

  .flower:hover {
    font-size: 140%;
    color: #32bea6;
    padding-bottom: 3%;
		text-decoration: none; /* Remove underline */
  }
</style>

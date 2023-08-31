<script lang="ts">
  export let data

  function formatDate(date: Date) {
    const formatter = new Intl.DateTimeFormat('hu', { dateStyle: 'full' })
    return formatter.format(date)
  }

  let pageName="Event Register"
</script>

<div class="main">
  <h1>School Details</h1>
  <hgroup>
    <h3>{data.school.name} </h3>
    <br>
    <ul class="aa">
      {#each data.event as e}
        <li class="li" >
          {formatDate(e.closing_date)} / {e.on_duty} / {e.event_type}
        </li>
    {/each}
    </ul>

  </hgroup>

  <div class="content">
    {@html data.school.user_id}
  </div>
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
    font-size: 22px;
  }

  .li {
    list-style-position: inside;
    list-style-type: disc;
    padding-left: 5%;
    text-indent: -6%;
    line-height: 1.8;
  }
</style>

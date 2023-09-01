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
    <ul class="ab">
      <li class="lb" >OM szám: {data.school.om_id}</li>
      <li class="lb" >Igazgató: {data.school.dir_name}</li>
      <li class="lb" >Iskola telefonszám: {data.school.dir_phone}</li>
      <li class="lb" >Iskola email: {data.school.school_email}</li>
      <li class="lb" >Website: {data.school.website}</li>
      <li class="lb" >Iskola típusa: {data.res}</li>
      <li class="lb" >Feljegyzés: {data.school.note}</li>
      <li class="lb" >Kapcsolat: {data.school.dir_name}</li>

    </ul><br>
    <ul class="aa" >
      {#each data.event as e}
        <li class="la" >
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

  .ab {
    color: #83918f;
    padding: 2%;
    font-weight: 400;
    line-height: normal;
    font-size: 22px;
  }

  .la {
    list-style-position: inside;
    list-style-type: disc;
    padding-left: 5%;
    text-indent: -6%;
    line-height: 1.8;
  }

  .lb {
    list-style-position: inside;
    list-style-type: circle;
    padding-left: 5%;
    text-indent: -6%;
    line-height: 1.3;
  }
</style>

<script lang="ts">
  export let data

  function formatDate(date: Date) {
    const formatter = new Intl.DateTimeFormat('hu', { dateStyle: 'full' })
    return formatter.format(date)
  }

  let pageName="School Details"
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>School Details</h1>
  <hgroup>
    <h3>{data.school.name} </h3>
    <hgroup>
      <h6>{data.school.zip_code} {data.city?.city_name} {data.school.address}</h6>
    <p>{data.county?.county_name} megye / {data.region?.region_name} régió</p>
    </hgroup>
    <br>
    <h4 class="h41">Adatok</h4>
    <ul class="ab">
      <li class="lb">OM szám: {data.school.om_id}</li>
      <li class="lb">Igazgató: {data.school.dir_name}</li>
      <li class="lb">Iskola telefon: {data.school.dir_phone}</li>
      <li class="lb">Iskola email: {data.school.school_email}</li>
      <li class="lb">Website: {data.school.website}</li>
      <li class="lb">Iskola típusa: {data.res}</li>
      <li class="lb">Feljegyzés: {data.school.note}</li>
      <hgroup>
        {#each data.contact as con}
          <ul class="ac">
            <hgroup>
              <li class="lc">Kapcsolat:</li>
              <li class="ld">Név: {con.contact_name}</li>
              <li class="ld">Telefon: {con.contact_phone}</li>
              <li class="ld">Email: {con.contact_email}</li>
              <li class="ld">Feljegyzés: {con.contact_note}</li>
            </hgroup>
          </ul>
        {/each}
      </hgroup>
    </ul>
    <h4 class="h42">Események</h4>
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

  .ac {
    color: #83918f;
    font-weight: 400;
    line-height: normal;
    padding-left: 5%;
    text-indent: -6%;
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

  .lc {
    list-style-position: inside;
    list-style-type: circle;
    line-height: 1.3;
  }

  .ld {
    list-style-position: inside;
    list-style-type: circle;
    padding-left: 5%;
    text-indent: -5%;
    line-height: 1.3;
    font-size: 22px;
  }

  .h41 {
    color: #83918f;
  }

  .h42 {
    color: #32BEA6;
  }
</style>

<script lang="ts">
  $: ({ contacts } = data)
  let pageName = "My Contact List"
  export let data
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="main">
  <h1>My Contact List</h1>
  <ul>
    {#each contacts as { contact_id, contact_name, contact_phone, contact_email, active }}
      {#if !active}
        <li class="li">
          <a href="../lists/contacts/{contact_id}" class="aa">{ contact_name } {' ☎️ '} { contact_phone } {' 📝 '} { contact_email } {' ⚠️ '} <strong>NOT ACTIVE</strong></a>
        </li>
      {:else if active}
        <li class="li">
          <a href="../lists/contacts/{contact_id}" class="aa">{ contact_name } {' ☎️ '} { contact_phone } {' 📝 '} { contact_email } </a>
        </li>
      {/if}
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

strong {
  font-weight: 500;
  color: tomato;
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

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
  {#each contacts as { contact_id, contact_name, contact_phone, contact_email }}
    <li class="li">
      <a href="../lists/contacts/{contact_id}" class="aa">{ contact_name } {' ☎️ '} { contact_phone } {' 📝 '} { contact_email } </a>
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

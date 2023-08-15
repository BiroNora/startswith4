<script lang="ts">
	import { enhance } from '$app/forms'
  import type { PageServerData } from './$types'


  export let data: PageServerData
  const { contact } = data

  let pageName="Contacts"
</script>

  <svelte:head>
    <title> {pageName} </title>
</svelte:head>
<div class="rounded-table">
  <div class="bb">
    <p class="rei">Contacts <a class="aa" href="../register/contact" target=”_blank” style="color: #32BEA6"><strong>Add a new Contact</strong></a></p>
  </div>
  <br>
  <div class="table">
    <form class="scoob" action="?/contacts" method="post" use:enhance >
      <table role="grid">
        <thead>
          <tr>
            <th class="first fonty">Select</th>
            <th class="cent fonty">Name</th>
            <th class="cent fonty">Email</th>
            <th class="cent fonty">Phone</th>
            <th class="cent fonty">Note</th>
          </tr>
        </thead>
          <tbody >
            {#each contact as con}
            <tr >
              <td>
                <div>
                  <input type="checkbox" name="coop" />
                </div>
              </td>
              <td class="cent fonts">{con.contact_name}</td>
              <td class="cent fonts">{con.contact_email}</td>
              <td class="cent fonts">{con.contact_phone}</td>
              <td class="cent fonts">{con.note}</td>
              <td class="cent fonts"><button class="dbc">
                Update
              </button></td>
              <td ><button class="contrast outline cgb">
                Delete
              </button></td>
            </tr>
            {/each}
        </tbody>
      </table>
    </form>
    <button class="btn" id="btn" type="submit">Add to school</button>
  </div>
</div>

<style>
.table {
  display: grid;
  grid-template-columns:  auto;
  margin: 0px 10px 10px 10px;
  padding: 10px;
  justify-content: stretch;
  align-items: stretch;
  border: 2px solid #32BEA6;
  border-radius: 10px;
  font-size: 140%;
  column-gap: 5px;

}

.rounded-table {
  margin: 5px;
  border: 2px solid #32BEA6;
  border-radius: 10px;
}

.rei {
  display: inline-flexbox;
  padding-top: 40px;
  padding-left: 20px;
  padding-bottom: -5px;
  line-height: normal;
  font-size: 150%;
  font-weight: bold;
}

.aa {
  position: absolute;
  right: 0;
  display: inline-flexbox;
  padding-right: 20px;
  margin-right: 20px;
  line-height: normal;
  font-size: 80%;
  font-weight: bold;
}

.btn {
  background-color: #32BEA6;
}

.dbc {
  background-color: #32BEA6;
}

.cgb {
  border: 2px solid tomato;
}

.first {
  text-align: left;
}

.cent {
  text-align: center;
}

.fonty {
  color: #32BEA6;
  font-weight: bolder;
  font-style: italic;
}

.fonts {
  font-weight: 500;
  font-size: 100%;
}

.scoob {
  max-height: 340px;
  overflow-y: scroll;
}

.rounded-table input:checked {
  background-color: #32BEA6;
}
</style>

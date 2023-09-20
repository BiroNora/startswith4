<script lang="ts">
  let regio = '';
  let city = '';
  let schooltype = '';
  let duties = '';

  function handleSubmit(event: Event) {
    event.preventDefault();

    // Store the input values in the page store
    //$page.update((pageData) => ({
    //  ...pageData,
    //  regio,
    //  city,
    //  schooltype,
    //  duties,
    //  // Add more parameters as needed
    //}));

    // Navigate to a results page
    //goto('/results'); // Use the `goto` function for navigation
  }
	let pageName = "Working On It"
</script>

<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<div class="grid">
  <div class="rei">
    <p>School Register</p>
  </div>
  <br>

<form on:submit={handleSubmit}>
  <label for="regio">Region:</label>
  <input type="text" id="regio" bind:value={regio} />

  <label for="city">City:</label>
  <input type="text" id="city" bind:value={city} />

  <label for="schooltype">School Type:</label>
  <input type="text" id="schooltype" bind:value={schooltype} />

  <label for="duties">Duties:</label>
  <input type="text" id="duties" bind:value={duties} />

  <!-- Add more input fields as needed -->

  <button type="submit">Search</button>
</form>
</div>

<style>
	.rei p {
    position: relative;
    line-height: normal;
    font-size: 140%;
    font-weight: bold;
  }

  .grid {
    padding: 35px 15px 0px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: space-around;
    width: 45%;
    line-height: 85%;
    grid-row: minmax(5px, auto);
    margin: 10px auto 10px auto;
    border: 2px solid #32BEA6;
    border-radius: 5px;
    border-spacing: 2px;
    flex: 10 auto;
  }

  .grid input:checked {
  background-color: #32BEA6;
  }

  .btn {
    margin-bottom: 0;
    background-color: #32BEA6;
  }

</style>

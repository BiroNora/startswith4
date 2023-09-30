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

  // Define types for input fields
interface InputFields {
    nameInput: HTMLInputElement;
    ageInput: HTMLInputElement;
    cityInput: HTMLInputElement;
}

// Function to perform the multi-task table search
function searchTable() {
    const { nameInput, ageInput, cityInput }: InputFields = {
        nameInput: document.getElementById("nameInput") as HTMLInputElement,
        ageInput: document.getElementById("ageInput") as HTMLInputElement,
        cityInput: document.getElementById("cityInput") as HTMLInputElement,
    };

    const table = document.getElementById("myTable") as HTMLTableElement;
    const trs = table.getElementsByTagName("tr");

    // Loop through all table rows and hide those that don't match the search criteria
    for (const tr of Array.from(trs)) {
        const tds = tr.getElementsByTagName("td");
        if (tds.length === 3) {
            const nameText = tds[0].textContent || tds[0].innerText;
            const ageText = tds[1].textContent || tds[1].innerText;
            const cityText = tds[2].textContent || tds[2].innerText;

            // Check if each input field has a value and matches the corresponding criteria
            const nameMatch = nameInput.value === "" || nameText.toLowerCase().includes(nameInput.value.toLowerCase());
            const ageMatch = ageInput.value === "" || ageText.toLowerCase() === ageInput.value.toLowerCase();
            const cityMatch = cityInput.value === "" || cityText.toLowerCase().includes(cityInput.value.toLowerCase());

            if (nameMatch && ageMatch && cityMatch) {
                tr.style.display = "";
            } else {
                tr.style.display = "none";
            }
        }
    }
}

// Attach the search function to the input fields' onkeyup events
document.getElementById("nameInput")?.addEventListener("keyup", searchTable);
document.getElementById("ageInput")?.addEventListener("keyup", searchTable);
document.getElementById("cityInput")?.addEventListener("keyup", searchTable);

</script>

<svelte:head>
    <title> {pageName} </title>
</svelte:head>

<head>
  <title>Table Multi-Task Search Example (TypeScript)</title>
</head>
<body>
  <h1>Table Multi-Task Search</h1>

  <input type="text" id="nameInput" placeholder="Name">
  <input type="number" id="ageInput" placeholder="Age">
  <input type="text" id="cityInput" placeholder="City">

  <table id="myTable">
      <thead>
          <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>John</td>
              <td>30</td>
              <td>New York</td>
          </tr>
          <tr>
              <td>Jane</td>
              <td>25</td>
              <td>Los Angeles</td>
          </tr>
          <tr>
              <td>Bob</td>
              <td>30</td>
              <td>Los Angeles</td>
          </tr>
      </tbody>
    </table>
</body>


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

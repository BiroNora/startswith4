<script lang="ts">
  import Chart from 'chart.js/auto'
	import { onMount } from 'svelte'

  let pageName = 'Try'
	let chartValues = [20, 10, 5, 2, 20, 30, 45]
	let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
	let ctx
	let chartCanvas: any
  const chartData = [
  {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 15, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.6', // Background color for bars
        borderColor: 'rgba(255, 99, 132, 1)', // Border color for bars
      },
      {
        label: 'Dataset 2',
        data: [25, 10, 20, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  },
];

// You can define multiple datasets in the chartData array


	onMount(async () => {
    createChart()
  })

  function createChart() {
    ctx = chartCanvas.getContext('2d')
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
            label: 'Revenue',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: chartValues
        }]
      }
    })
	}
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<div class="c">
  <canvas bind:this={chartCanvas} id="myChart"></canvas>
</div>


<style>
.c {
  width: 40%;
}
</style>

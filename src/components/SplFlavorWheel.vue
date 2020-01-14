<template>
  <div class="spl-flavor-wheel">
    <canvas id="radar" height="200px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "SplFlavorWheel",
  props: {
    data: { type: Object, default: () => {} }
  },
  methods: {
    getLabels() {
      return this.data ? Object.keys(this.data) : [];
    },
    getData() {
      return this.data ? this.getLabels().map(key => this.data[key]) : [];
    }
  },
  mounted() {
    var ctx = document.getElementById("radar");
    new Chart(ctx, {
      type: "radar",
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: "beer",
            data: this.getData(),
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      },
      options: {
        legend: false,
        tooltips: false,
        scale: {
          ticks: {
            display: false,
            min: 0,
            max: 5,
            stepSize: 1
          }
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
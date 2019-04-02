import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        legend: {
          display: false
        },
        title: {
          display: false
        },
        tooltips: {enabled: false},
        hover: {mode: null},
        responsive: true,
        cutoutPercentage: 90,
        maintainAspectRatio: true,
        elements: {
          arc: {
            borderWidth: 0,
            borderColor: '#1b2024',
          },
        },
      }
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
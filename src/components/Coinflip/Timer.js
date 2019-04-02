import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        tooltips: {enabled: false},
        hover: {mode: null},
        responsive: true,
        cutoutPercentage: 97,
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 0,
            borderColor: '#333',
          },
        },
      }
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
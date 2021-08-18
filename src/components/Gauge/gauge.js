import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import solidGauge from "highcharts/modules/solid-gauge.js";
import highchartsMore from "highcharts/highcharts-more.js";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const options = {
  chart: {
    type: "solidgauge",
    height: "200px"
  },

  title: {
    text: "Health",
    style: {
      fontSize: "24px"
    }
  },

  tooltip: {
    borderWidth: 0,
    backgroundColor: "none",
    shadow: false,
    style: {
      fontSize: "16px"
    },
    valueSuffix: "%",
    pointFormat:
      '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
    positioner: function(labelWidth) {
      return {
        x: (this.chart.chartWidth - labelWidth) / 2,
        y: this.chart.plotHeight / 2 + 15
      };
    }
  },

  pane: {
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        // Track for Move
        outerRadius: "112%",
        innerRadius: "40%",
        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
          .setOpacity(0.3)
          .get(),
        borderWidth: 0
      }
    ]
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: []
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: true
      },
      linecap: "round",
      stickyTracking: false,
      rounded: false
    }
  },

  series: [
    {
      name: "Health",
      type: "solidgauge",
      data: [
        {
          color: "#e6cb50",
          radius: "112%",
          innerRadius: "48%",
          y: 10
        }
      ]
    }
  ]
};

function Gauge(health) {
console.log(health.health);
const [ chartData, setChartData ] = useState(options);

// function increaseChart() {
//     setChartData({...chartData,  series: [
//       { data: [{ y: health.health }]}
//     ]
//   });
// }

useEffect(() => {
  setChartData({...chartData,  series: [
    { data: [{ y: Number(health.health) }]}
  ]
});
},[])

return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartData}
            />
        </div>
    )
}

export default Gauge;

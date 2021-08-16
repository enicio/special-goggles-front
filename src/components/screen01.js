import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 5, 7, 7, 3, 7, 2]
    },
    {
      data: [7, 8, 2, 4, 9, 1]
    }],
      hoverData: null
  }
function ScreenOne(params) {
const [ chartData, setChartData ] = useState(options);

function increaseChart() {
    setChartData({...chartData,  series: [
      { data: [Math.random() * 4,Math.random() * 5, Math.random() * 3, Math.random() * 2 ]},
      { data: [Math.random() * 4,Math.random() * 5, Math.random() * 3, Math.random() * 2 ]},
      { data: [Math.random() * 4,Math.random() * 5, Math.random() * 3, Math.random() * 2 ]}
    ]
  });
}

return(
        <div>
            <h1>Screen One</h1>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartData}
            />
            <button onClick={ increaseChart }>Increment</button>
        </div>
    )
}

export default ScreenOne;

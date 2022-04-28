import './App.css';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';

const config = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 40, 34],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
  },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};




const App = () => {
  let [chartConfig, setChartConfig] = useState(config);

  const setChartType = (value) => {
    chartConfig = {
      ...chartConfig,
      type: value,
    }

    setChartConfig(chartConfig);
  }

  useEffect(() => {
    
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, 
      chartConfig,
    );

    console.log(chartConfig);

    return (() => {
      myChart.destroy();
    })
  }, [chartConfig])


 
  return (
    <div className="App">
      CHART-DRAW
      <div className='App-content'>   
        <label className='X-axis-lable'> 
          X axis labels 
          <input 
            className='X-axis'
            // value={query}
            // onChange={(event) => changetQuery(event.target.value) } 
          >
          </input>
        </label>
        <label className='X-axis-lable'>  
          Y axis values
          <input 
            className='Y-axis'

          >

          </input>
        </label>
          <canvas id="myChart" width="400" height="200"></canvas>
          <label className='type-switcher'> 
            <input 
              type={'radio'} 
              name={'chartType'} 
              value={'bar'} 
              className={'input-switcher'}
              onClick={(event) => setChartType(event.target.value)}
            >

            </input>
            Bar chart
          </label>
          <label className='type-switcher'>  
            <input
              type={'radio'} 
              name={'chartType'} 
              className={'input-switcher'}
              value={'line'} 
              onClick={(event) => setChartType(event.target.value)}
            >

            </input>
            Line chart
          </label>
      </div>
    </div>
  );
};

export default App;

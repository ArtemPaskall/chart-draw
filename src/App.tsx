import './style/App.scss';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import triangle_icon  from './images/triangle_icon.png';

const config: Configuration = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Months',
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
  let [finalArray, setFinalArray] = useState<any>(config);
  let [chartConfig, setChartConfig] = useState<Configuration>(config);
  
  const [xLabels, setXLabels] = useState('');
  const [yData, setYData] = useState('');

  const [xEmptyError, setXEmptyError] = useState(false);
  const [yEmptyError, setYEmptyError] = useState(false);
  const [matchNumberError, setMatchNumberError] = useState(false);

  const [labelInputShow, setLabelInputShow] = useState(false);
  const [trianglIconShow, setTrianglIconShow] = useState(true);
  const [newLabel, setNewLabel] = useState('');

  const [chartTypeToggle, setChartTypeToggle] = useState('bar');


  const setChartType = (value) => {
    chartConfig = {
      ...chartConfig,
      type: value,
    };

    setChartTypeToggle(value)
    setFinalArray(chartConfig);
  };

  const xAxisHandler = (xLabels: string) => {
    if (xLabels === '') {
      setXEmptyError(true);
      return;
    } else {
      const labelsArray = xLabels.split(',').map(i => i.trim()).filter(item => (item !== ''));

      chartConfig = {
        ...chartConfig,
        data: {
          ...chartConfig.data,
          labels: labelsArray,
      }}
    
      setChartConfig(chartConfig);
      
      if (yData === '') {
        setYEmptyError(true);
        return;
      } else {
          if (labelsArray.length !== chartConfig.data.datasets[0].data.length) {
          setMatchNumberError(true);
          return;
        }
      }
      
      setMatchNumberError(false);
      setFinalArray(chartConfig)
      setXEmptyError(false);
    }
  }

  const yAxisHandler = (yData: string) => {
    if (yData === '') {
      setYEmptyError(true);
    } else {
      const datasArray = yData.split(',').map(i => i.trim()).filter(item => (item !== '')).map(i => +i);

      chartConfig = {
        ...chartConfig,
        data: {
          ...chartConfig.data,
          datasets: [{
            ...chartConfig.data.datasets[0],
            data: datasArray,
          }],
      }}

      setChartConfig(chartConfig);

      if (chartConfig.data.labels.length !== datasArray.length) {
        setMatchNumberError(true);
        return;
      } 

      setMatchNumberError(false);
      setFinalArray(chartConfig)
      setYEmptyError(false);
    }
  }

  const labelSetHandler = (newLabel: string) => {
    chartConfig = {
      ...chartConfig,
      data: {
        ...chartConfig.data,
        datasets: [{
          ...chartConfig.data.datasets[0],
          label: newLabel,
        }],
    }}

    setFinalArray(chartConfig);
  }

  useEffect(() => {
    
 
    const ctx: any = document.getElementById('myChart');
    const myChart = new Chart(ctx, 
      finalArray,
    );

    return (() => {
      myChart.destroy();
    });
  }, [finalArray]);
 
  return (
    <div className="App">
      CHART-DRAW
      <div className='App-content'>   
        <div className='axis-wrap'>
          <label className='X-axis-lable'> 
            X axis labels 
            <input 
              placeholder='January, February --- enter the labels as in the example'
              className={classNames(
                'X-axis',
                {'axis-error': xEmptyError,}
                )}
              value={xLabels}
              onChange={(event) => {
                setXEmptyError(false);
                setXLabels(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {  
                  xAxisHandler(event.currentTarget.value)
                }}}
              onBlur={(event) => {
                  xAxisHandler(event.target.value)
              }}
            >
            </input>
            {xEmptyError && <p className='emptyLabelsError'>Enter some labels, please</p>}
          </label>
          <label className='X-axis-lable'>  
            Y axis values
            <input 
              placeholder='33, 22 --- enter the values as in the example'
              className={classNames(
              'Y-axis',
              {'axis-error': yEmptyError,}
              )}
              value={yData}
              onChange={(event) => {
                setYEmptyError(false)
                setYData(event.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  yAxisHandler(e.currentTarget.value)
                }}}
              onBlur={(e) => {
                yAxisHandler(e.target.value)
              }}
            >
            </input>
            {yEmptyError && <p className='emptyLabelsError'>Enter some values, please</p>}
            {matchNumberError && 
              <>
                <p className='matchNumberError'>The numbers of labels doesn't mutch the numbers of values</p>
                <p className='matchNumberError'>Either add something or remove something</p>
              </>
            }
          </label>
        </div>
        <div
          className='chart-label-wrap'
          onClick={() => {
            setLabelInputShow(true);
            setTrianglIconShow(false)
          }}
        >
          <p className='chart-label'>You can change the label</p>
          {trianglIconShow &&
            <>
              <div 
                className='triangle_icon-wrap'
              >
                <img  src={triangle_icon} alt="my-img" className='triangle_icon' />
              </div>
            </>
          }
          {labelInputShow && 
            <input
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setLabelInputShow(false);
                  setTrianglIconShow(true);
                  labelSetHandler(e.currentTarget.value)
                }}}
            >
            </input>
          }
        </div>
        <canvas id="myChart"></canvas>
        <button
          className={classNames(
            'chart-type-button',
            {'chart-type-button--active': chartTypeToggle === 'bar'}
            )}
          value={'bar'} 
          onClick={(event) => setChartType(event.currentTarget.value)}
        >
          Bar chart
        </button>
        <button
           className={classNames(
            'chart-type-button',
            {'chart-type-button--active': chartTypeToggle === 'line'}
            )}
          value={'line'} 
          onClick={(event) => 
            setChartType(event.currentTarget.value)

          }
        >
          Line chart
        </button>
      </div>
    </div>
  );
};

export default App;

import React, {useEffect,useState} from 'react';
import Chart from "react-apexcharts";
import {fetchDailyData} from '../../api/index';
import classes from './Charts.module.scss';

interface ChartData {
    confirmed:number,
    deaths:number,
    date:string
};

const Charts:React.FC = () => {
    const [dailyData, setDailyData] =  useState<Array<ChartData>>();

    useEffect(()=> {
        const fetchAPI = async () => {
           setDailyData(await fetchDailyData());
        }
        fetchAPI();
        
    }, [setDailyData])

    const prepareData = info => {

      if (info) {
        const confirmed:number[] = info.map(item => item.confirmed);
        const deaths:number[]  =  info.map(item => item.deaths)
        const date:string[]  = info.map(item => item.date)
        console.log(date);
        return {
          confirmed,
          deaths,
          date
        }
      }
    }

   const chartData = prepareData(dailyData);

    const data = {series: [{
        name: "Confirmed",
        data: chartData?.confirmed,
        align:'left',
      }],
      
      options: {
        colors:['#002097'],
        chart: {
          type: 'area',
          height: 350,
          background:'#f2f4fa',
          fontFamily:['Nunito Sans','sans-serif'],
          foreColor:'#444444',
          stacked: true,
          style : {
              backgroundColor:['#ddd']
          },
          
          zoom: {
            enabled: false
          }
        },
        tooltip : {
            enabled:true,
            y: {
                formatter: function (value:number) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
        },
       
        fill: {
            colors: [ '#002097','#fff']
          },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: 'straight',
          lineCap: 'butt',
          colors: undefined,
          width: 2,
          dashArray: 0,      
      },      
        
        title: {
          text: 'Confirmed',
          align: 'left',
            offsetX:20,
            offsetY:10,
        },
        xaxis: {
          type: 'datetime',
          categories:chartData?.date,
          labels: {
            format : 'MMM/dd'
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
            labels: {
                formatter: function (value:number) {
                    
                    return value.toString()[0]+' M'
                }
            },
        },
        legend: {
            show:true,
          horizontalAlign: 'left',
          
        }
      },
    
    }

    const deathsData = {
      ...data, 
      series : [{
          name: "Deaths",
          data: chartData?.deaths,
          align:'left'
        }],
        options: {
          ...data.options,
          fill: {
            colors: ['#F40555', '#fff']
          },
          colors:['#F40555'],
          title: {
            ...data.options.title,
          text: 'Deaths',
          },
          yaxis: {
            labels: {
                formatter: function (value:number) {          
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
        },
        }
      }
    
    if (chartData) {
      return (
        <>
          <div className={classes['chart']}>
              <Chart  options={data.options} series={data.series} type="area" height={350}  />
          </div>
          <div className={classes['chart']}>
              <Chart  options={deathsData.options} series={deathsData.series} type="area" height={350}  />
          </div>
      </>) 
    }else {
       return <div>Loading</div>
    }
      
}
export default Charts;
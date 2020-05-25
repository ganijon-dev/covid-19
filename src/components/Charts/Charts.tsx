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
    const [dailyData, setDailyData] =  useState<Array<ChartData>>([]);

    useEffect(()=> {
        const fetchAPI = async () => {
           setDailyData(await fetchDailyData());
        }
        fetchAPI();
        
    }, [setDailyData])
    let info,date;
    if (dailyData) {
        info = dailyData.map(item => {
            if (item.confirmed) {
                return item.confirmed 
            }
           
        })
        date = dailyData.map(item => {
            if (item.date) {
                return item.date
            }
           
        })
        
    }
    
    
    const data = {series: [{
        name: "Confirmed",
        data: info,
        align:'left'
      }],
      
    
      options: {
          colors:['#002097'],

        chart: {
          type: 'area',
          height: 350,
            background:'#f2f4fa',
          fontFamily:['Nunito Sans','sans-serif'],
          foreColor:'#444444',
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
            colors: ['#fff', '#002097']
          },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        
        title: {
          text: 'Confirmed',
          align: 'left',
            offsetX:20,
            offsetY:10,
        },
       
        labels: date,
        xaxis: {
          type: 'datetime',
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
    

      return (
          <>
            <div className={classes['chart']}>
                <Chart  options={data.options} series={data.series} type="area" height={350}  />
            </div>
            <div className={classes['chart']}>
                <Chart  options={data.options} series={data.series} type="area" height={350}  />
            </div>
            <div className={classes['chart']}>
                <Chart  options={data.options} series={data.series} type="area" height={350}  />
            </div>
        </>) 
}
export default Charts;
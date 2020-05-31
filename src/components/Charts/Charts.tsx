import React, {PureComponent} from 'react';
import Chart from "react-apexcharts";
import {cx} from '../../commonFiles/functions/'
import moment from 'moment';
import {fetchDailyData} from '../../api/index';
import classes from './Charts.module.scss';

interface Data {
  confirmed:number, deaths:number, date:string
}
interface State {
    data:Array<Data>|[],
    period:number,
    activeBtn: string
};

class Charts extends PureComponent<State> {
  state: Readonly<State> = {
    data:[],
    period:31,
    activeBtn: 'month'
  }
  handleClick (period:number) {  
    this.setState({
      period:period, 
    })
  }

  async componentDidMount  () {
    const data = await fetchDailyData();
   
    this.setState({
        data:data
    }
    )
  }
  

  render() {
    const fetchedData = this.state.data;
    const {activeBtn} = this.state;
    
    if (fetchedData.length) {
      let confirmed:number[]= [], deaths:number[]=[], dates:string[]=[];
    const {period} = this.state;

    if (period) {
      for (let index =(fetchedData.length - period ); index< fetchedData.length; index ++) {
      
        confirmed.push(fetchedData[index].confirmed);
        deaths.push(fetchedData[index].deaths);
        dates.push(fetchedData[index].date);
  
      }
    }else {
      for (let index =0; index< fetchedData.length; index ++) {
      
        confirmed.push(fetchedData[index].confirmed);
        deaths.push(fetchedData[index].deaths);
        dates.push(fetchedData[index].date);
  
      }
    }

    const getActiveBtn = btn => {
      if (btn === activeBtn ) {
        return cx([classes['report-type'],classes['report-type__active']])
      }else {
        return classes['report-type']
      }
    }
    const data = {series: [{
      name: "Confirmed",
      data: confirmed,
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
          style: {
            color:'#002097'
          }
      },
      xaxis: {
        type: 'category',
        categories:dates,
        labels: {
          formatter: function(value, timestamp, index) {
            return moment(new Date(value)).format("DD MMM")
          }
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
        data: deaths,
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
          style: {
            color:'#F40555'
          },
        text: 'Deaths',
        },
        xaxis: {
          type: 'category',
        categories:dates,
        labels: {
          formatter: function(value) {
            return moment(new Date(value)).format("DD MMM")
          }
        },
        tooltip: {
          enabled: false
        },

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
    return (
      <> 
        <div className={classes['container']}> 
         <div className={classes['report-type__wrapper']}>
                    <button className={getActiveBtn('3D')} onClick={()=> {
                      this.setState({
                        activeBtn:'3D'
                      })
                      this.handleClick(3)
                      
                    }} >3D </button>
                    <button className={getActiveBtn('week')} onClick={()=> {
                      this.setState({
                        activeBtn:'week'
                      })
                      this.handleClick(7)
                    }}>W </button>
                    <button className={getActiveBtn('month')} onClick={()=> {
                      this.setState({
                        activeBtn:'month'
                      })
                      this.handleClick(31)
                    }}>M </button>
                    <button className={getActiveBtn('all')} onClick={()=> {
                      this.setState({
                        activeBtn:'all'
                      })
                      this.handleClick(0) 
                    }}>All </button>
          </div>
          </div>
        <div className={classes['confirmed-chart']}>
            <Chart  options={data.options} series={data.series} type="area" height={350}  />
        </div>
        <div className={classes['deaths-chart']}>
            <Chart  options={deathsData.options} series={deathsData.series} type="area" height={350}  />
        </div>
    </>) 
  }
  else {
    return <div>Loading</div>
  }
    }
    
}

export default Charts;

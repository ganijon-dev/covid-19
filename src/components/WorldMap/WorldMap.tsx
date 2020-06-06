import React , { useEffect, useState }from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import {fetchCountriesData} from '../../api/index'
import classes from './WorldMap.module.scss'
import virus from '../../commonFiles/images/virus.svg'



interface CountryList {
  TotalConfirmed:number,
  TotalDeaths: number,
  TotalRecovered:number, 
  sortedCountries:any
};


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const WorldMap:React.FC = () => {
    const [countryList,setCountryList] = useState <CountryList>();
   
    useEffect(()=> {
        const fetchAPI = async () => {
            setCountryList( await fetchCountriesData());
        }
        fetchAPI();
    }, [])
    let colorScale;
    if (countryList) {
       colorScale = scaleQuantile<string>()
      .domain(countryList?.sortedCountries?.map(d=> d.TotalConfirmed))
      .range([
      "#CCDFFC",
      "#7FABF7",
      "#3A7AF2",
      "#185CCC",
      "#17459C"
      ]);
    }
 
    if (colorScale) {
      return (
        <>
          <ComposableMap >
            <ZoomableGroup className={classes['map-positon']} minZoom={1} center={[15,-10]} maxZoom={5}>
              <Geographies geography={geoUrl}  >
                {({ geographies }) =>
                  geographies.map(geo => {
                    const cur = countryList?.sortedCountries?.find(s => {
                      
                      return s.CountryCode === geo.properties.ISO_A2 }
                      );
                    return (
                      <Geography key={geo.rsmKey} geography={geo}  fill={cur? colorScale(cur.TotalConfirmed) : "#EEE"} />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
  
          <div className={classes['world-stats']}>
                <img src={virus} alt="Virus"/>
                <div className={classes['total']}>
                  <div className={classes['total-type']}>
                      <span className={classes['total-type__title']}>Confirmed</span>
                      <span className={classes['total-type__stats']}>1,605,544</span>
                  </div>
                  <div className={classes['total-type']}>
                      <span className={classes['total-type__title']}>Recovered</span>
                      <span className={classes['total-type__stats']}>605,544</span>
                  </div>
                  <div className={classes['total-type']}>
                      <span className={classes['total-type__title']}>Deaths</span>
                      <span className={classes['total-type__stats']}>544</span>
                  </div>
              </div>
          </div>
        </>
      )
    }else {
      return <div>Loading</div>
    }
    
}

export default WorldMap;


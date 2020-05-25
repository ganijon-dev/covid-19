
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import classes from './WorldMap.module.scss'
import virus from '../../commonFiles/images/virus.svg'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const WorldMap:React.FC = () => {
    return (
        <div>
        <ComposableMap>
          <ZoomableGroup zoom={1} className={classes['map-positon']}>
            <Geographies geography={geoUrl} >
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo}  style={{
                    default: {
                      fill: "#7fabf7",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}/>
                ))
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
      </div>
    )
}

export default WorldMap;


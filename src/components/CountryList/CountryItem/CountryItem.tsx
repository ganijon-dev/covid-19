import React from 'react'
import {numberFormatter} from '../../../commonFiles/functions/index';
import ReactCountryFlag from 'react-country-flag';
import classes from './CountryItem.module.scss';

interface CountryItem  {
    countryCode:string,
    country: string,
    totalConfirmed:number,
    totalDeaths: number,
    totalRecovered: number,
    newConfirmed:number,
    newRecovered:number,
    newDeaths:number
}
const CountryItem:React.FC <CountryItem> = (props) => {

    const updateCountryName = (name:string):string => {
        if (name === 'United States of America') return 'USA';
        else if ( name.match(/.+?(?=,)/)) return name.match(/.+?(?=,)/)![0]; 
        else return name ;
    }
    return (
        <div className={classes['country-item']}>
                    <div className={classes['country-name']}>
                <ReactCountryFlag countryCode={props.countryCode} svg style={{
                    fontSize: '20px',
                    lineHeight: '10em',
                }} />
                    <span>{updateCountryName(props.country) }</span>
                    </div>
                    <div className={classes['country-stats']}>
                        <span className={classes['cases']}> {numberFormatter(props.totalConfirmed)} </span>
                        {props.newConfirmed ? <span className={classes['new_confirmed']}>+{props.newConfirmed}</span>: null}
                    </div>
                    <div className={classes['country-stats']}> 
                        <span className={classes['cases']}>{numberFormatter(props.totalRecovered)} </span>
                        {props.newRecovered ?  <span className={classes['new_recovered']}>+{props.newRecovered}</span>:null}
                    </div>
                    <div className={classes['country-stats']}> 
                        <span className={classes['cases']}>{numberFormatter(props.totalDeaths)}</span>
                        {props.newDeaths ?  <span className={classes['new_deaths']}>+{props.newDeaths}</span>: null}
                    </div>
                </div>
    )
}

export default CountryItem

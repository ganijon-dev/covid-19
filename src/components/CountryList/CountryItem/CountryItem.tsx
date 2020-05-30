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
}
const CountryItem = (props) => {

    const {countryCode,  country, totalConfirmed, totalDeaths,totalRecovered} = props;
    return (
        <div className={classes['cases-country']}>
                    <div className={classes['country-name']}>
                <ReactCountryFlag countryCode={countryCode} svg style={{
                    fontSize: '20px',
                    lineHeight: '10em',
                }} />
                    <span>{country}</span>
                    </div>
                    <div className={classes['country-stats']}> {numberFormatter(totalConfirmed)}</div>
                    <div className={classes['country-stats']}> {numberFormatter(totalRecovered)}</div>
                    <div className={classes['country-stats']}> {numberFormatter(totalDeaths)}</div>
                </div>
    )
}

export default CountryItem

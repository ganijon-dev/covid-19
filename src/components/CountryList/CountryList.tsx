import React from 'react'
import classes from './CountryList.module.scss'
// eslint-disable-next-line
import {cx} from '../../commonFiles/functions/index'
import CountryItem from './CountryItem/CountryItem'

const CountryList = () => {
    return (
        <div className={classes['wrapper']}>
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
            <div className={classes['country-cases']}>
                <div className={classes['cases-header']}>
                    <div>Countries </div>
                    <div> Total Cases</div>
                    <div> Recovered </div>
                    <div> Deaths</div>
                </div>
                <CountryItem />
                <CountryItem/>
                <CountryItem/>
                <CountryItem/>
                <CountryItem/>
                
            </div>
        </div>
    )
}

export default CountryList

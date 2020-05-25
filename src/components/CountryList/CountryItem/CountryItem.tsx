import React from 'react'
import ReactCountryFlag from "react-country-flag"
import classes from './CountryItem.module.scss'

const CountryItem = () => {
    return (
        <div className={classes['cases-country']}>
                    <div className={classes['country-name']}>
                <ReactCountryFlag countryCode="US" svg style={{
                    fontSize: '20px',
                    lineHeight: '2em',
                }} />
                    <span>United States</span>
                    </div>
                    <div className={classes['country-stats']}> 1,300,333</div>
                    <div className={classes['country-stats']}> 1,300,333</div>
                    <div className={classes['country-stats']}> 300,333</div>
                </div>
    )
}

export default CountryItem

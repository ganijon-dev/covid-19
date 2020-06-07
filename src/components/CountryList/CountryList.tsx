import React, {useEffect, useState} from 'react'
import classes from './CountryList.module.scss'
// eslint-disable-next-line
import {cx, numberFormatter} from '../../commonFiles/functions/index'
import CountryItem from './CountryItem/CountryItem'

import { fetchCountriesData} from '../../api/index';
import SortIcons from '../../iconComponents/SortIcons/SortIcons';

interface CountryList {
    TotalConfirmed:number,
    TotalDeaths: number,
    TotalRecovered:number, 
    sortedCountries:any
};


const CountryList = () => {
    const [countryList,setCountryList] = useState <CountryList> ();
   
    useEffect(()=> {

        const fetchAPI = async () => {
            setCountryList( await fetchCountriesData());
        }
        fetchAPI();
    }, [])

    return (
      
        <div className={classes['wrapper']}>
            <div className={classes['total']}>
                <div className={classes['total-type']}>
                    <span className={classes['total-type__title']}>Confirmed</span>
                    <span className={classes['total-type__stats']}>{numberFormatter(countryList?.TotalConfirmed)}</span>
                </div>
                <div className={classes['total-type']}>
                    <span className={classes['total-type__title']}>Recovered</span>
                    <span className={classes['total-type__stats']}>{numberFormatter(countryList?.TotalRecovered)}</span>
                </div>
                <div className={classes['total-type']}>
                    <span className={classes['total-type__title']}>Deaths</span>
                    <span className={classes['total-type__stats']}>{numberFormatter(countryList?.TotalDeaths)}</span>
                </div>
            </div>
            <div className={classes['country-cases']}>
                <div className={classes['cases-header']}>
                    <button className={classes['cases-header__btn']}>Countries <SortIcons asc={false} sortId={'Countries'} appear={true}/> </button>
                    <button className={classes['cases-header__btn']}> Total Cases <SortIcons asc={false} sortId={'Countries'} appear={true}/></button>
                    <button className={classes['cases-header__btn']}> Recovered <SortIcons asc={false} sortId={'Countries'} appear={true}/> </button>
                    <button className={classes['cases-header__btn']}> Deaths <SortIcons asc={false} sortId={'Countries'} appear={true}/></button>
                </div>
                {countryList?.sortedCountries.map(({Country, CountryCode, TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewRecovered,NewDeaths }) => {
                   return <CountryItem 
                    countryCode= {CountryCode} 
                    country= {Country}
                    totalConfirmed= {TotalConfirmed}
                    totalDeaths = {TotalDeaths}
                    totalRecovered = {TotalRecovered}
                    newConfirmed = {NewConfirmed} 
                    newRecovered = {NewRecovered}
                    newDeaths = {NewDeaths}
                    key={CountryCode}
                    />
                })}
                   
            </div>
        </div>
    )
}

export default CountryList;

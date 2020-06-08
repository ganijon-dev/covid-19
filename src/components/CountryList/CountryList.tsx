import React, {useEffect, useState} from 'react'
import classes from './CountryList.module.scss'
import {Link} from 'react-router-dom';
// eslint-disable-next-line
import {numberFormatter} from '../../commonFiles/functions/index'
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
    const [sorting, setSorting] = useState({sortedBy:'Confirmed', asc:true})
   
    useEffect(()=> {

        const fetchAPI = async () => {
            setCountryList( await fetchCountriesData());
        }
        fetchAPI();
    }, [])

    // const compareBy = (key:number|string) => { 
    //     return function(a, b) { 
    //         let compA, compB ;
    //         if (typeof a[key]==='number' && typeof b[key] ==='number') {
    //             compA = a[key];
    //             compB = b[key];
    //         }
    //         else {
    //             compA = a[key].toLowerCase();
    //             compB = b[key].toLowerCase();
    //         }  
    //         if (sorting.asc) {
    //             if (compA > compB) return -1;
    //             if (compA < compB) return 1;
    //             return 0;
    //         }
    //         else {
    //             if (compA < compB) return -1;
    //             if (compA > compB) return 1;
    //             return 0;
    //         }
    //       };
    //   };
    //   const sortList = (event) => {
    //     let arrayCopy = countryList?.sortedCountries;
    //     arrayCopy?.sort(compareBy(event.target.id));
    //     setSorting(!sorting.asc, sorting.sortedBy:event.target.id)
    //   }
    
        // this.setState({ tools: arrayCopy, asc: !sorting.asc, sorting.sortedBy: event.target.id});
    

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
                    <button className={classes['cases-header__btn']} >Countries
                     <SortIcons asc={sorting.asc} sortId={'Country'} appear={true}/> </button>
                    <button className={classes['cases-header__btn']} > Total Cases 
                    <SortIcons asc={sorting.asc} sortId={'Countries'} appear={true}/></button>
                    <button className={classes['cases-header__btn']}> Recovered 
                    <SortIcons asc={sorting.asc} sortId={'Countries'} appear={true} /> </button>
                    <button className={classes['cases-header__btn']} > Deaths 
                    <SortIcons asc={sorting.asc} sortId={'Countries'} appear={true}/></button>
                </div>
                {countryList?.sortedCountries.map(({Country, CountryCode, TotalConfirmed,TotalDeaths,TotalRecovered,NewConfirmed,NewRecovered,NewDeaths,Slug }) => {
                
                   return <Link to={'/countries/' + Slug}  key={CountryCode}><CountryItem 
                    countryCode= {CountryCode} 
                    country= {Country}
                    totalConfirmed= {TotalConfirmed}
                    totalDeaths = {TotalDeaths}
                    totalRecovered = {TotalRecovered}
                    newConfirmed = {NewConfirmed} 
                    newRecovered = {NewRecovered}
                    newDeaths = {NewDeaths}
                    /> </Link>
                })}
                   
            </div>
        </div>
    )
}

export default CountryList;

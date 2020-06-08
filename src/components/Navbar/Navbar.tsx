import React from 'react'
import {NavLink} from 'react-router-dom'
import 'react-flags-select/scss/react-flags-select.scss';
import ReactFlagsSelect from 'react-flags-select';
import classes from './Navbar.module.scss';
import {ChartIcon, ListIcon, MapIcon} from '../../iconComponents/Icons';
import {cx} from '../../commonFiles/functions/'
const Navbar:React.FC = () => {

    const handleSelect = (countryCode:string) => {
        localStorage.setItem('default', countryCode)
    }
    const defaultValue = localStorage.default ? localStorage.default: 'RU';
    return (
        <div className={classes['header']}>
        <h1 className={classes['header-title']}>Covid-19</h1>
        <nav className={classes['nav']}>
            
            <NavLink to='/countries/list' >
                <button className={cx([classes['btn'],classes['btn-primary']])}>Worldwide</button>
            </NavLink>
            <ReactFlagsSelect
                searchable={true} placeholder='Countries' countries={['TJ','RU','US', 'AG'] } defaultCountry={defaultValue} className={cx([classes['btn'],classes['select']])} onSelect={(code)=> handleSelect(code)} />
            <NavLink to='/world/statistics' style={{marginLeft:'auto'}} activeClassName={classes['stats-active']}>  
            <ChartIcon/>
            </NavLink>
        </nav>
        <nav className={cx([classes['nav'],classes['secondary-nav']])}>
            <NavLink to='/countries/list' activeClassName={classes['secondary-active']}>
        <div className={classes['nav-item']}> 
            <ListIcon/ >
            <span >List</span>
         </div> 
         </NavLink>
         <NavLink to='/world-map' style={{marginLeft:'auto'}} activeClassName={classes['secondary-active']}>
         <div className={classes['nav-item']}> 
            <MapIcon/>
            <span>Map</span>
         </div> 
         </NavLink>
        
         </nav>
        
         </div>
    )
}

export default Navbar

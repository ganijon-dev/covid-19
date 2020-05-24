import React from 'react'
import {Link} from 'react-router-dom'
import 'react-flags-select/scss/react-flags-select.scss';
import ReactFlagsSelect from 'react-flags-select';
import classes from './Navbar.module.scss';
import {ChartIcon, ListIcon, MapIcon} from '../../iconComponents/Icons';
import {cx} from '../../commonFiles/functions/'
const Navbar:React.FC = () => {
    return (
        <div className={classes['header']}>
        <h1 className={classes['header-title']}>Covid-19</h1>
        <nav className={classes['nav']}>
           
            <Link to='/' >
                <button className={cx([classes['btn'],classes['btn-primary']])}>Worldwide</button>
            </Link>
            <ReactFlagsSelect
                searchable={true} placeholder='Countries' countries={['TJ','RU','US'] }  className={cx([classes['btn'],classes['select']])} />
                
            <ChartIcon/>
        </nav>

        <nav className={cx([classes['nav'],classes['secondary-nav']])}>
        <div className={classes['nav-item']}> 
            <ListIcon/>
            <span>List</span>
         </div> 
         <div className={classes['nav-item']}> 
            <MapIcon/>
            <span>Map</span>
         </div> 
         
         </nav>
         </div>
    )
}

export default Navbar

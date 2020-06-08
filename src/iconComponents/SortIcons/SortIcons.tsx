import React from 'react'
import classes from './SortIcons.module.scss';

interface SortIconsProps  {
    asc:Boolean,
    sortId:string,
    appear:Boolean

}
const SortIcons:React.FC <SortIconsProps> = (props) => {
    
    const {asc,sortId, appear } = props;
    
    return (
        <div className={classes['sort-icons']} id={sortId}>
            <svg className={(asc && appear) ? classes['sort-active']: '' } viewBox="0 0 20 20"  >
                <path d="M0.042,15.719l9.959-11.438l9.958,11.438H0.042z"  ></path>
            </svg>
            {/* className={(!asc && appear) ? classes['sort-active']: '' } */}
            <svg  viewBox="0 0 20 20" className={classes['sort-active']}  >
                <path d="M19.958,4.281L9.999,15.719L0.042,4.281H19.958z" ></path>
            </svg>
            
        </div>
    )
}

export default SortIcons;
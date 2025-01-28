import React, { useEffect, useState } from 'react';
import '../css/filter.css'
import { FilterStore } from '../stores/FilterStore';


export const Filter = ({lineinfo}:any) => {
    const {handleItem} = FilterStore();
return(
    <>
        {
            lineinfo.map((obj:any, index:number)=>(
                <li className='filterblock'>
                    <input type="checkbox" value={obj?.LINE_NUM?.[0].replace('0','')}
                        onChange={(e)=>handleItem(e)} />
                    <span>{obj?.LINE_NUM?.[0].replace('0','')}</span>
                </li>
            ))
        }
    </>
  );
}
export default Filter;
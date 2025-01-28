import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NoticeComponents = ({ information }: { information: any }) => {
    const navigate = useNavigate()
return(
    <>
    <ul className='a_notice' onClick={()=>navigate(`/notice/detail/${information.number}`)}>
        <li className='content_border content_number'>
            <p>{information.number}</p>
        </li>
        <li className='content_border content_title'>
            <p className='notice_title'>{information.title}</p>
        </li>
        <li className='content_border content_date'>
            <p className='notice_date'>{information.created_at}</p>
        </li>
    </ul>
    </>
  );
}
export default NoticeComponents;
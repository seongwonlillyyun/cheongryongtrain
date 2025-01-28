import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false
library.add(fas)


export const NoticeModifyComponents = ({ information }: { information: any }) => {
    const navigate = useNavigate()
return(
    <>
    <ul className='a_notice'>
        <li className='content_border content_number'>
            <p>{information.number}</p>
           
        </li>
        <li className='content_border content_title_modify'>
            <p className='notice_title_modify'>{information.title}</p>
            <div className='content_title_modify_list'>
                <button>
                    <FontAwesomeIcon icon={faPencil}
                        onClick={()=>navigate(`/notice/modify/write/${information.number}`)} />
                </button>
                <button><FontAwesomeIcon icon={faTrash} 
                            onClick={()=>navigate(`/notice/modify/delete/${information.number}`)}/></button>
            </div>
        </li>
        <li className='content_border content_date'>
            <p className='notice_date'>{information.created_at}</p>
        </li>
    </ul>
    </>
  );
}
export default NoticeModifyComponents;
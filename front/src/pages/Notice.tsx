import React, { useEffect, useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../css/notice.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoticeComponents from '../components/NoticeComponents';

config.autoAddCss = false
library.add(fas)

const Notice = () => {
  const [noticeList, setNoticeList] = useState([])
  const navigator = useNavigate()
  useEffect(()=>{
    axios.get('http://127.0.0.1:8080/notice/noticelist')
      .then((res)=>{
        setNoticeList(res.data)
      })
      .catch()
  },[])
return(
    <>
      <div id='notice' className='notice'>
        <ul className='notice_header'>
          <li>
            <h1 className='notice_header_title'>공지사항</h1>
          </li>
          <li>
            <button className='notice_header_login'><FontAwesomeIcon icon={faGear} 
            onClick={()=>navigator('/adminlogin')}/></button>
          </li>
        </ul>
          
          <ul className='notice_list'>
            <li className='notice_list_header'>
              <p className='notice_list_number'>번호</p>
              <div className='notice_list_etc'>
                <p>제목</p>
                <p>등록일</p>
              </div>
            </li>
              {noticeList.map((list,index)=>{
                 return( 
                  <li className='notice_content' key={index}>
                    <NoticeComponents information={list}/> 
                  </li>)
              })}
          </ul>
      </div>
    </>
  );
}
export default Notice;
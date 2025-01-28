import React, { useEffect, useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../css/notice.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoticeModifyComponents from '../components/NoticeModifyComponents';
config.autoAddCss = false
library.add(fas)

export const Noticemodify = () => {
  const [noticeList, setNoticeList] = useState([])
  const navigator = useNavigate()
  useEffect(()=>{
    axios.get('http://127.0.0.1:8080/notice/noticelist')
      .then((res)=>{
        setNoticeList(res.data)
      })
      .catch()
  },[])
  console.log(noticeList)
return(
    <>
      <div id='notice' className='notice'>
        <div className='notice_header'>
          <h1 className='notice_header_title'>공지사항 수정 및 삭제</h1>
        </div>
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
                    <NoticeModifyComponents information={list}/> 
                  </li>)
              })}
          </ul>
          <ul>
                <li style={{textAlign:'center'}}>
                <button className='backbtn_admin'
                       onClick={()=>navigator('/admin')} >뒤로가기</button>
                </li>
            </ul>
      </div>
    </>
  );
}
export default Noticemodify;
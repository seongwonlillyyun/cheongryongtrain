import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Notice } from '../components/interface';
import '../css/notice.css'

const NoticeDetail = () => {
    const [content, setContent] = useState<Notice[]|null>(null)
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{
        axios({
            url:`http://127.0.0.1:8080/notice/noticedetail/${id}`,
            method:'get'
        })
        .then((res)=>setContent(res.data))
        .catch((error)=>console.log(error))
    },[])
return(
    <>
        <div id='notice_detail' className='notice_detail'>
            <div className='notice_detail_header'>
                <h1 className='notice_detail_title'>공지사항</h1>
            </div>
            <div className='notice_detail_content'>
                <h1 className='notice_detail_content_title'>{content?.[0].title}</h1>
                <p className='notice_detail_content_date'>{content?.[0].created_at}</p>
                <div dangerouslySetInnerHTML={{ __html: `<div class='custom_content'> ${content?.[0]?.content || '' }</div>`}} />
                <button className='noticelistbtn'
                    onClick={()=>navigate('/notice')}>목록</button>
            </div>
        </div>
        
    </>
  );
}
export default NoticeDetail;
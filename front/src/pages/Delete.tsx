import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const Delete = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const postdelete = () =>{
        axios({
            url:`http://127.0.0.1:8080/notice/delete/${id}`,
            method:'post'
        })
        .then((res)=>{
            if(res.data.cnt === 1){
                alert('삭제되었습니다!')
                navigate('/notice/modify')
            }
        })
        .catch((error)=>console.log(error))
    }
return(
    <>
        <div id='notice_delete'>
            <div className='notice_delete_header'>
                <h1 className='notice_delete_title'>공지사항 삭제</h1>
            </div>
            <div>
                <img className='delete_img'
                    style={{margin:'20px auto', width:'500px'}} 
                src="https://i.imgflip.com/32dzjq.jpg?a482520" alt="" />
                <p className='delete_msg'>정말 이 공지사항을 삭제 하시겠습니까?</p>
                <div className='notice_btn_list'>
                    <button className='cancle_notice_btn'
                        onClick={()=>navigate('/notice/modify')}>뒤로가기</button>
                    <button className='delete_notice_btn'
                        onClick={()=>postdelete()}>삭제하기</button>
                </div>
            </div>
        </div>
    </>
  );
}
export default Delete;
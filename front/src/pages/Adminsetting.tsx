import React, { useEffect, useState } from 'react';
import '../css/adminsetting.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { Loginstore } from '../stores/Loginstore';
import { getUser, removeUser } from '../util/localstroage';
import axios from 'axios';
import {AllAdminaccList, WaitingAdminaccList} from '../components/AdminaccList';

config.autoAddCss = false
library.add(fas)

const Adminsetting = () => {
    const navigate = useNavigate()
    const {adminid,setadminid, admintype,setadmintype} = Loginstore()
    const [adminacc, setAdminacc] = useState<string[]>()
    const [waitingacc, setwaitingacc] = useState<string[]>()
    const { id } = getUser();
    useEffect(()=>{
        setadminid(id)
    },[setadminid])
       const logout = ()=>{
        removeUser()
        navigate('/')
      }
      
      useEffect(() => {
        const gettingadminaccurl = "http://127.0.0.1:8080/admininfo/member";
        const gettingwaitingaccurl = 'http://127.0.0.1:8080/admininfo/adminset';
   
    
        Promise.all([
            axios({
                url: gettingadminaccurl,
                method: 'post',
                data: { id }
            }),
            axios({
                url: gettingwaitingaccurl,
                method: 'post',
                data: { id }
            })
        ])
        .then(([adminRes, waitingRes]) => {
            setwaitingacc(waitingRes.data);
            setAdminacc(adminRes.data); // 상태 업데이트
        })
        .catch(error => {
            console.log('One or more requests failed:', error);
        });
    }, [waitingacc, adminacc]); 
return(
    <>
        <div id='adminsetting' className='adminsetting'>
            <div className='adminsetting_header'>
                <h1 className='adminsetting_title'>슈퍼 관리자 페이지</h1>
                <p className='adminsetting_infotitle'> {adminid}님의 슈퍼 관리자 페이지 입니다.</p>
                <button className='logout_btn_settingheader'
                    onClick={()=>logout()}>로그아웃</button>
            </div>
            <ul className='adminsetting_content'>
                <li>
                    <h3 className='accepttitle'>관리자 계정 가입 승인</h3>
                    <ul className='accountlist'>
                        {waitingacc?.length ===0 ? (<p>승인 대기 중인 계정이 없습니다.</p>):
                            (waitingacc?.map((list,index)=>{
                                return <li key={index}>
                                    <WaitingAdminaccList information={list}/>
                                </li>
                            }))
                        }
                    </ul>
                </li>
                <li>
                    <h3 className='deletetitle'>관리자 계정 삭제하기</h3>
                    <li>
                        <ul className='adminaccountlist'>
                            {adminacc?.map((list,index)=>{
                                return( <li key={index}>
                                    <AllAdminaccList information={list}/> </li>)
                            })} 
                        </ul>
                    </li>
                </li>
                <li>
                    <button className='backbtn'
                        onClick={()=>navigate('/admin')}>뒤로 가기</button>
                </li>
            </ul>
        </div>
    </>
  );
}
export default Adminsetting;
import React, { useEffect, useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { acceptacc } from './interface';
import axios from 'axios';
config.autoAddCss = false
library.add(fas)

export const AllAdminaccList = ({ information }: { information: any }) => {
    const [admininfo, setadmininfo] = useState<object>({
        id:information.id,
    })
    const [btnvalue, setBtnvalue] = useState<boolean>(false)
   
    useEffect(()=>{
        if(btnvalue){
            axios({
                url:'http://127.0.0.1:8080/admininfo/delete',
                method:'post',
                data:admininfo
            })
            .then((res)=>{
                if(res.data.cnt===1){
                    alert('해당 계정이 삭제 되었습니다')
                }
            })
            .catch()
        }
    },[btnvalue])
return(
    <>
        <div className='adminaccount'>
            <p>({information.number})</p>
            <p>이름 : {information.name} </p>
            <p>아이디 : {information.id} </p>
            <button><FontAwesomeIcon icon={faUserSlash}
                className='deletebtn'
                onClick={()=>setBtnvalue(true)} /></button>
        </div>
    </>
  );
}

export const WaitingAdminaccList = ({information}:{information:any})=>{
    const [btnvalue, setbtnValue] = useState<Boolean|null>(null)
    const [waitingadmininfo, setwaitingadmininfo] = useState<acceptacc>({
        adminid:information.id,
        admintype:'admin',
        type : null
    })
  
    const selectvalue = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        setwaitingadmininfo((waitingadmininfo)=>({...waitingadmininfo, admintype:event.target.value}))
    }
    const handleApprove = ()=>{
        setbtnValue(true)
        setwaitingadmininfo((waitingadmininfo)=>({...waitingadmininfo, type:true}))
    };
    const handleReject = ()=>{
        setbtnValue(false)
        setwaitingadmininfo((waitingadmininfo)=>({...waitingadmininfo, type:false}))
    };
    useEffect(()=>{
        if(btnvalue !== null){
            const url="http://127.0.0.1:8080/admininfo/accept";
            axios({
                url:url,
                method:'post',
                data:waitingadmininfo
            })
            .then((res)=>{if(res.data.cnt === 1){
                alert('변경이 완료 되었습니다!')
            }})
            .catch(error=>console.log(error))
        } 
    },[btnvalue, waitingadmininfo])
    console.log('btn=>', btnvalue, 'waitinginfo=>', waitingadmininfo)
    return (
        <> 
            <div className='accept_account'>
                <p>({information.number})</p>
                <p>이름 : {information.name}</p>
                <p>아이디 : {information.id}</p>
                <select name="admin_type" onChange={(e)=>selectvalue(e)}>
                    <option value="admin">일반관리자</option>
                    <option value="superadmin">슈퍼관리자</option>
                </select>
                <div>
                    <button className='acceptbtn' 
                        onClick={handleApprove}>승인</button>
                    <button className='rejectbtn' 
                         onClick={handleReject}>거절</button>
                </div>
            </div>
        </>
    );
}

import React, { useState } from 'react';
import '../css/admin.css'
import axios from 'axios';
import { removeUser } from '../util/localstroage';
import { useNavigate } from 'react-router-dom';
import { Loginstore } from '../stores/Loginstore';

const Adminpwset = () => {
    const {adminid} = Loginstore()
    const [changepw, setChangepw] = useState({
        newpw:'',
        repw:''
    })
    const navigate = useNavigate()
    const handlepw = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target
        setChangepw({...changepw,[name]:value})
    }
    const changebtn = () =>{
        if(changepw.newpw === '' || changepw.repw === ''){
            alert('변경 하실 비밀번호를 입력 해 주세요')
        } else if(changepw.newpw !== changepw.repw){
            alert('비밀번호가 서로 일치하지 않습니다. 처음부터 다시 입력 해 주세요')
            setChangepw({newpw:'', repw:''})
        } else{
            axios({
                url:'http://127.0.0.1:8080/admininfo/setpw',
                method:'post',
                data:{id:adminid, pw:changepw.newpw}
            })
            .then((res)=>{
                if(res.data.cnt === 1){
                    alert('비밀번호가 정상적으로 변경되었습니다. 다시 로그인 해주세요')
                    removeUser()
                    navigate('/adminlogin')
                }
            })
            .catch((error)=>console.log(error))
        }
    }
return(
    <>
        <div id='settingpw' className='settingpw'>
            <div className='settingpw_header'>
                 <h2 className='settingpwtitle'>비밀번호 변경하기</h2>
            </div>
            <ul className='pw_box'>
                <li className='pw_list'>
                    <input type="password" placeholder='새로운 비밀번호를 입력 해 주세요' 
                        name='newpw' onChange={(e)=>{handlepw(e)}}/>
                </li>
                <li className='pw_list'>
                    <input type="password" placeholder='다시 입력 해 주세요'
                        name='repw' onChange={(e)=>{handlepw(e)}}/>
                </li>
                <li>
                    <button className='changebtn' onClick={changebtn}>변경하기</button>
                </li>
            </ul>
                   
            <ul>
                <li style={{textAlign:'center'}}>
                <button className='backbtn_admin'
                       onClick={()=>navigate('/admin')} >뒤로가기</button>
                </li>
            </ul>
        </div>
    </>
  );
}
export default Adminpwset;
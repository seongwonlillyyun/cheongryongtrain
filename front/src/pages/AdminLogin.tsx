import React, { useState } from 'react';
import '../css/admin.css'
import { Link, useNavigate } from 'react-router-dom';
import { admininfo } from '../components/interface';
import axios from 'axios';
import * as cookie from '../util/cookies'
import { jwtDecode } from 'jwt-decode';
import { Loginstore } from '../stores/Loginstore';
const AdminLogin = () => {
    const [admininfo, setadmininfo] = useState<admininfo>(
        {
            id:'',
            pw:''
        }
    )
    const {adminid, setadminid} = Loginstore()
    const navigator = useNavigate()
    const writeinfo = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setadmininfo({...admininfo, [name]:value})
    }
   const handleLogin = () =>{
    if(admininfo.id === '' || admininfo.pw === ''){
        alert('아이디 혹은 비밀번호를 입력 해 주세요')
    }  else {
        const url = 'http://127.0.0.1:8080/admininfo/login'
        axios({
            method:'post',
            url : url,
            data : admininfo
        })
        .then((res)=>{
            if(res.data.cnt === 1){
                cookie.setCookie('x-auth-jwt', res.data.token);
                const userinfo = jwtDecode(res.data.token);
                localStorage.setItem('userinfo',JSON.stringify(userinfo))
                setadminid(admininfo.id)
                alert('로그인되었습니다.')
                console.log(JSON.parse(atob(res.data.token.split(".")[1])))
                const { admin_type } = JSON.parse(atob(res.data.token.split(".")[1])); // Decode JWT
                console.log(admin_type)
                if (admin_type === "superadmin") {
                    navigator("/sadmin");
                } else {
                    navigator("/admin");
                }
            } else {
                alert('아이디 혹은 비밀번호를 확인 해 주세요')
            }
        })
        .catch(error=>console.log(error))
    }
   }
return(
    <>
        <div id='adminlogin' className='adminlogin'>
        <div className='adminlogin_header'>
            <h1 className='adminlogin_title'>관리자 로그인</h1>
        </div>
        <ul className='login_box'>
            <li className='login_list'>
                <input type="text" name='id' placeholder='아이디'
                    onChange={(e)=>{writeinfo(e)}} />
            </li>
            <li className='login_list'>
                <input type="password" name='pw' placeholder='비밀번호'
                    onChange={(e)=>{writeinfo(e)}} />
            </li>
            <li className='login_list'>
                <button className='login_btn'
                        onClick={()=>handleLogin()}>로그인</button>
            </li>
            <li>
                <Link to={'/adminsignup'}>
                    <p>관리자 계정 등록</p>
                </Link>
            </li>
        </ul>
        
    </div>
    </>
  );
}
export default AdminLogin;
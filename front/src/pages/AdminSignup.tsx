import React, { ReactHTMLElement, useRef, useState } from 'react';
import { adminsignupinfo } from '../components/interface';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
    const [adminsignupinfo, setadminsignupinfo] = useState<adminsignupinfo>(
        {
            adminname : '',
            adminid :'',
            adminpw : '',
            adminemail : ''
        }
    )
    const refs = {
        namerefs : useRef<HTMLInputElement>(null),
        idrefs: useRef<HTMLInputElement>(null),
        pwrefs : useRef<HTMLInputElement>(null),
        emailrefs : useRef<HTMLInputElement>(null)
    }
    const navigator = useNavigate();
    const writeinfo = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target
        setadminsignupinfo({...adminsignupinfo, [name]:value})
    }
    const validationCheck = (refs:any) =>{
       const idcheck = refs.idrefs.current ? refs.idrefs.current.value : '';
       const pwcheck = refs.pwrefs.current ? refs.pwrefs.current.value : '';
       const namecheck = refs.namerefs.current ? refs.namerefs.current.value : '';
       const emailcheck = refs.emailrefs.current ? refs.emailrefs.current.value : '';
       let check:boolean = true;
       if(idcheck === ''){
        alert('아이디를 입력해주세요')
        return check = false;
       } else if (pwcheck === ''){
        alert('비밀번호를 입력 해 주세요')
        return check = false; 
       } else if (namecheck === ''){
        alert ('이름을 입력해주세요')
        return check = false;
       } else if (emailcheck === ''){
        alert('이메일을 입력 해 주세요')
        return false;
       } else {
        return check;
       }
    }

    const handleSignup = () =>{
        console.log(adminsignupinfo)
        if(validationCheck(refs)){
            const url = 'http://127.0.0.1:8080/admininfo/signup'
            axios({
                method : 'post',
                url : url,
                data: adminsignupinfo
            })
            .then((res)=>{
                if(res.data.cnt == 1){
                    alert('관리자 계정이 등록되었습니다. 승인 후 이용 하실 수 있습니다!')
                    navigator('/')
                } else {
                    console.log(res.data.cnt)
                    alert('정보를 다시 확인 해 주세요')
                }
            })
            .catch((error)=>(console.log(error)))
        }
        
    }
return(
    <>
        <div id='adminsingup' className='adminsignup'>
            <div className='adminsignup_header'>
                <h1 className='adminsignup_title'>관리자 계정 등록</h1>
            </div>
            <ul className='adminsignup_content'>
                <li className='adminsignup_list'>
                    <p>이름</p>
                    <input type="text" name='adminname'
                            ref={refs.namerefs}
                        onChange={(e)=>{writeinfo(e)}} />
                </li>
                <li className='adminsignup_list'>
                    <p>아이디</p>
                    <input type="text" name='adminid'
                            ref={refs.idrefs}
                    onChange={(e)=>{writeinfo(e)}} />
                </li>
                <li className='adminsignup_list'>
                    <p>비밀번호</p>
                    <input type="password" name='adminpw'
                            ref={refs.pwrefs}
                    onChange={(e)=>{writeinfo(e)}} />
                </li>
                <li className='adminsignup_list'>
                    <p>이메일</p>
                    <input type="text" name='adminemail'
                            ref={refs.emailrefs}
                    onChange={(e)=>{writeinfo(e)}} />
                </li>
                <li className='adminsignup_list'>
                    <button className='adminsignup_btn'
                            onClick={()=>handleSignup()}>계정등록하기</button>
                </li>
            </ul>
        </div>
    </>
  );
}
export default AdminSignup;
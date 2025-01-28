import { useEffect} from 'react';
import '../css/admin.css'
import { Loginstore } from '../stores/Loginstore';
import { getUser,removeUser } from '../util/localstroage';
import { useNavigate, Link } from 'react-router-dom';


const NormalAdmin = () => {
  const {adminid, setadminid, setadmintype} = Loginstore();
  const Navigate = useNavigate()

  useEffect(()=>{
    const {id,admin_type} = getUser()
    if(id&&admin_type){
     setadminid(id);
     setadmintype(admin_type)
    }
   },[setadminid, setadmintype])
  const logout = ()=>{
    removeUser()
    Navigate('/')
  }
return(
  <>
      <div id='adminpage' className='adminpage'>
        <div>
          <h1 className='adminpage_title'>관리자 페이지</h1>
          <ul className='adminpage_infolist'>
            <li>
              <p className='adminpage_info'>{adminid}님의 관리자 페이지 입니다.</p>
            </li>
            <li>
              <button className='logout_btn'
              onClick={()=>logout()}>로그아웃</button>
            </li>
          </ul>
          
        </div>
          <ul className='adminpage_content'>
            <li>
              <p>비밀번호 변경</p>
            </li>
            <li>
              <p>공지사항 작성</p>
            </li>
            <li>
              <p>공지사항 수정</p>
            </li>
          </ul>
      </div>
    </>
  );
}
export default NormalAdmin;
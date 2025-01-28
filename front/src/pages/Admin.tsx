import { useEffect} from 'react';
import '../css/admin.css'
import { Loginstore } from '../stores/Loginstore';
import { getUser,removeUser } from '../util/localstroage';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const {adminid, setadminid,admintype,setadmintype } = Loginstore();
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
        <div className='adminpage_header'>
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
              <p onClick={()=>Navigate('/admin/adminpw')}>- 비밀번호 변경하기</p>
            </li>
            <li>
              <Link to={'/notice/write'}><p>- 공지사항 작성하기</p></Link>
            </li>
            <li>
              <Link to={'/notice/modify'}><p>- 공지사항 수정하기</p></Link>
            </li>
            { admintype === 'superadmin' ? 
              <li>
                <p onClick={()=>Navigate('/admin/adminsetting')}>- 관리자 계정 관리 하기</p>
              </li> 
                : null }
          </ul>
      </div>
    </>
  );
}
export default Admin;
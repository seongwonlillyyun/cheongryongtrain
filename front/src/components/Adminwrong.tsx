import React from 'react';
import '../css/admin.css'
import { useNavigate } from 'react-router-dom';
const Adminwrong = () => {
    const navigator = useNavigate()
return(
    <>
        <div className='wrongpage'>
            <img className='wrongpageimg' src="https://i.imgflip.com/xpkhd.jpg" alt="" />
            <button className='wrongpagebtn'
                    onClick={()=>navigator('/')}>초기화면으로 돌아가기</button>
        </div>
    </>
  );
}
export default Adminwrong;
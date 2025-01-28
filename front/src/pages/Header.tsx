import React, { useRef, useState } from 'react';
import '../css/header.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullhorn, fas } from '@fortawesome/free-solid-svg-icons'
import { faTrainSubway, faMagnifyingGlass, faUser, faCircleQuestion, faBars} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useStationStore } from '../stores/StationStore';
import { useTimeStore } from '../stores/TimeStore'; 


config.autoAddCss = false
library.add(fas)

const Header = () => {
  const searchRef = useRef(null)
  const navigator = useNavigate()
  const [result, setResult] = useState<string>('')
  const {stname,setStname} = useStationStore();
  const clearUserStation = useStationStore.persist.clearStorage;
  const {setNowDate} = useTimeStore();


  const handleChange = (text:React.ChangeEvent<HTMLInputElement>) => {
    setResult(text.target.value)
  };
  const handleStation = (event:React.MouseEvent<SVGSVGElement>)=>{
    if(result === ''){
      alert('검색어를 다시 확인 해 주세요')
      navigator('/')
    }
    else {
      navigator('/result')
      setStname(result)
      setNowDate(new Date())
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(result === ''){
        alert('검색어를 다시 확인 해 주세요')
        navigator('/')
      } else{
        navigator('/result')
        setStname(result)
        setNowDate(new Date())
      }
    }
  }
  const goingHome = ()=>{
    navigator('/')
    setResult('')
    setStname('')
    clearUserStation()
  }

return(
    <>
      <div id='header' className='header'>
        <ul className='header_title'>
          <li>
            <ul style={{'display':'flex','gap':'20px', 'justifyContent':'Center', 'alignItems':'center'}}>
              <li><FontAwesomeIcon className='trainemoji' icon={faTrainSubway} 
                    onClick={goingHome}/></li>
              <li><h1 className='header_title_text'>청 룡 열 차</h1></li>
            </ul>
          </li>
          <li>
            <ul className='header_function'>
              <li className='formobile'>
                <div className='header_search_part'>
                  <input className='header_search' type="text" placeholder='지하철역을 검색해주세요'
                          onChange={handleChange} ref={searchRef} onKeyDown={handleKeyDown} 
                          value={result}/>
                    <button className='header_search_btn'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} size='2x' 
                      onClick={handleStation}/>
                    </button>
                </div>
              </li>
              <li className='headerbtn'>
                <button className='noticebtn' onClick={()=>navigator('/notice')}>
                  <FontAwesomeIcon icon={faBullhorn} />
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Header;
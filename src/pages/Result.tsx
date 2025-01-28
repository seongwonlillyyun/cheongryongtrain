import React, { useState } from 'react';
import { useEffect } from 'react';
import {parseStringPromise} from 'xml2js';
import '../css/main.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate, faFilter} from '@fortawesome/free-solid-svg-icons';
import { Subway } from '../components/Subway';
import { useStationStore } from '../stores/StationStore';
import { useTimeStore } from '../stores/TimeStore';
import { useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { FilterStore } from '../stores/FilterStore';
import { FadeLoader } from 'react-spinners';
config.autoAddCss = false
library.add(fas)
const Result = () => {
    const [info, setInfo] = useState<string[]>([])
    const [rebtn, SetRebtn] = useState<boolean>(false)
    const [lineinfo, setLineInfo] = useState<string[]>([])
    const [filterbtn, setFilterBtn] = useState<Boolean>(false)
    const {stname} = useStationStore();
    const {setNowDate, result} = useTimeStore();
    const Navigator = useNavigate()
    const {items} = FilterStore();
    const [loading, setLoading] = useState<boolean|undefined>(true);
    let infoname:string = ''
    if(stname ==='서울'){
        infoname = '서울역'
    } else if(stname === '총신대입구(이수)'){
           infoname = '이수'
    } 
    else {
        infoname = stname
    }
    let url:string = `http://swopenapi.seoul.go.kr/api/subway/67675459757973773536796a5a4569/xml/realtimeStationArrival/0/7/${stname}`
    let infourl:string = `http://openAPI.seoul.go.kr:8088/584a4c534179737737386656667562/xml/SearchInfoBySubwayNameService/1/5/${infoname}/`
     useEffect(()=>{
      const fetchData = async()=>{
        /* 지하철 정보 */
        const res = await fetch(url);
        const result = await res.text()
        const data = await parseStringPromise(result)
        /* 지하철역 정보 */
        const infores = await fetch(infourl);
        const inforesult = await infores.text()
        const infodata = await parseStringPromise(inforesult)
        return {data, infodata}; 
      }
      fetchData()
      .then(res=>{
        const {data,infodata} = res
         if(data?.realtimeStationArrival?.RESULT[0]?.code?.[0] === 'INFO-000' && infodata?.SearchInfoBySubwayNameService?.RESULT[0]?.CODE?.[0]=== 'INFO-000') {
            /* 1. 필터 돌려서 아이디를 호선으로 변경 */
            const lines = data.realtimeStationArrival.row;
            const line = lines.filter((line:any)=>{
                switch (line.subwayId[0]) {
                    case '1001':
                        line.subwayId[0] = '1호선';
                     break;
                    case '1002':
                        line.subwayId[0] = '2호선'
                     break;
                    case '1003':
                        line.subwayId[0] = '3호선'
                     break;
                    case '1004':
                        line.subwayId[0] = '4호선'
                     break;
                    case '1005':
                        line.subwayId[0] = '5호선'
                     break;
                    case '1006':
                        line.subwayId[0] = '6호선'
                     break;
                    case '1007':
                        line.subwayId[0] = '7호선'
                     break;
                    case '1008':
                        line.subwayId[0] = '8호선'
                     break;
                    case '1009':
                        line.subwayId[0] = '9호선'
                     break;
                    case '1061':
                        line.subwayId[0] = '중앙선'
                     break;
                    case '1063':
                        line.subwayId[0] = '경의선'
                     break;
                    case '1065':
                        line.subwayId[0] = '공항철도'
                     break;
                    case '1067':
                        line.subwayId[0] = '경춘선'
                     break;
                    case '1075':
                        line.subwayId[0] = '수인분당선'
                     break;
                    case '1077':
                        line.subwayId[0] = '신분당선'
                     break;
                    case '1092':
                        line.subwayId[0] = '우이신설선'
                     break;
                    case '1093':
                        line.subwayId[0] = '서해선'
                     break;
                    case '1081':
                        line.subwayId[0] = '경강선'
                     break;
                    case '1032':
                        line.subwayId[0] = 'GTX-A'
                     break;
                    case '1094':
                        line.subwayId[0] = '신림선'
                     break; 
            }
            return line;
        })
            /* 2. 필터 유 이면 필터 */
            if(items.length !== 0){
                const filteredLines = line.filter((line: any) => {
                   return items.includes(line.subwayId[0])
                  });
                  setInfo(filteredLines); 
                  SetRebtn(false); 
                  setLineInfo(infodata.SearchInfoBySubwayNameService.row)
                  setLoading(false)
        } 
            /* 3. 필터 무 이면 그냥 넣기 */
            else {
            setInfo(lines); 
            SetRebtn(false); 
            setLineInfo(infodata.SearchInfoBySubwayNameService.row)
            setLoading(false)
        }}
           else if(data?.RESULT?.code?.[0] === 'INFO-200'){
            alert('해당하는 데이터가 없습니다.')
            Navigator('/')
            }  
         })
      .catch(error=>console.log(error))
    },[stname, rebtn, result, items])
    const refresh = () =>{
        SetRebtn(true)
        setNowDate(new Date())
    }

return(
    <>
        <div id='Result' className='Result'>
            <ul className='result_header'>
                <li>
                    <ul className='result_header_title'>
                        <li>
                            <h2 className='result_title_text'>{stname}역으로 열차 오는 중!</h2>
                            <h2 className='result_title_text_mobile'>{stname}역으로 오는 중!</h2>
                        </li>
                        <li>
                            <button onClick={refresh}>
                                <FontAwesomeIcon className='refreshbtn' icon={faArrowsRotate} size='3x' />
                            </button>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className='result_header_btnlist'>
                        <li>
                            <button className='filterbtn resultbtn'
                                    onClick={()=>setFilterBtn(!filterbtn)}>필터링하기 
                                    <FontAwesomeIcon icon={faFilter} size='lg' />
                            </button>
                         {
                            filterbtn === true? 
                            <ul className='filter'>
                                <Filter lineinfo={lineinfo}/>
                            </ul>
                            : null
                         }
                        </li>
                    </ul>
                </li>
                <li className='result_time'>
                    <p>{result}</p>
                </li>
            </ul>
            {   loading === true?
                    <FadeLoader 
                    height={20}
                    loading = {loading}
                    margin={10}
                    width={5}
                    cssOverride={{
                        margin : '50px auto',
                        
                      }}
                  /> :
                    <ul>
                        {info.map((obj,index)=>{
                            return <li key={index} ><Subway subway={obj}/></li>})} 
                    </ul>
            }
            
        </div>
    </>
  );
}
export default Result;
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrainSubway } from '@fortawesome/free-solid-svg-icons';
import { subwayInfo } from './interface';


export const Subway = ({subway}:any) => {
    
    const [info, setInfo] = useState<subwayInfo>(
        {   subwayId:'',
            bstatnNm:'',
            btrainSttus:'',
            updnLine:'',
            arvlMsg2:'',
            arvlMsg3:'',
            color:'',
            fastcolor:''
        }
    )


    useEffect(()=>{
        let linecolor:string = ''
        let fastcolor:string = 'black'
        let detailinfo:string = ''
        let linenumber:string = ''
        let time:string = ''
        switch (subway.subwayId[0]) {
            case '1호선':
                linecolor = '#0032A0';
             break;
            case '2호선':
                linecolor = '#00B140'
             break;
            case '3호선':
                linecolor = '#FC4C02'
             break;
            case '4호선':
                linecolor = '#00A9E0'
             break;
            case '5호선':
                linecolor = '#996CAC'
             break;
            case '6호선':
                linecolor = '#A9431E'
             break;
            case '7호선':
                linecolor = '#747F00'
             break;
            case '8호선':
                linecolor = '#E31C79'
             break;
            case '9호선':
                linecolor = '#8C8279'
             break;
            case '경의선':
                linecolor = '#77C4A3'
             break;
            case '공항철도':
                linecolor = '#0065B3'
             break;
            case '경춘선':
                linecolor = '#0C8E72'
             break;
            case '수인분당선':
                linecolor = '#F5A200'
             break;
            case '신분당선':
                linecolor = '#D4003B'
             break;
            case '우이신설선':
                linecolor = '#B0CE18'
             break;
            case '서해선':
                linecolor = '#8FC31F'
             break;
            case '경강선':
                linecolor = '#003DA'
             break;
            case 'GTX-A':
                linecolor = '#9A6292'
             break;
            case '신림선':
                subway.subwayId[0] = '신림선'
                linecolor = '#6789CA'
             break;
 
        }
        if(subway.btrainSttus[0] === '급행'){
            fastcolor = 'red'
        }
        if(subway.arvlMsg2[0].includes('출발')){
            detailinfo = subway.arvlMsg2[0].split(" ");
            subway.arvlMsg2[0] = detailinfo[1]
        } else if(subway.arvlMsg2[0].includes('도착')){
            detailinfo = subway.arvlMsg2[0].split(" ");
            subway.arvlMsg2[0] = detailinfo[1]
        } else if (subway.arvlMsg2[0].includes('진입')){
            detailinfo = subway.arvlMsg2[0].split(" ");
            subway.arvlMsg2[0] = detailinfo[1]
        } else if (subway.arvlMsg2[0].includes('번째')){
            linenumber = subway.arvlMsg2[0].replace(/\D/g, '');
            subway.arvlMsg2[0] = `(${linenumber}번째 전)`
        } else if(subway.arvlMsg2[0].includes('분')){
            time = subway.arvlMsg2[0].replace(/\s?\(.*\)/, "");
            subway.arvlMsg2[0] = `${time} 도착`
        }
       
        setInfo({
            subwayId:subway.subwayId[0],
            bstatnNm:subway.bstatnNm[0],
            btrainSttus:subway. btrainSttus[0],
            updnLine:subway.updnLine[0],
            arvlMsg2:subway.arvlMsg2[0],
            arvlMsg3:subway.arvlMsg3[0],
            color:linecolor,
            fastcolor:fastcolor
        })
    },[subway])

return(
    <div className='subway_result'>
        <ul className='resultlist' style={{'display':'flex'}}>
            <li className='subwayemoji'>
                <FontAwesomeIcon icon={faTrainSubway}  className='emoji' />
            </li>
            <li className='subwayinfo'>
                <ul className='information'>
                    <li className='subwaylinebottom'><p className='subwayline'><span style={{color:info.color}}>{info.subwayId}</span> {info.bstatnNm}행 <span style={{color:info.fastcolor}}>{info.btrainSttus}</span> ({info.updnLine}) </p></li>
                    <li><p className='subwayarrive'>현재 {info.arvlMsg3}역 {info.arvlMsg2}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  );
};
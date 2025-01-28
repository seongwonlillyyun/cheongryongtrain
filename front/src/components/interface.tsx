import React from 'react'

export interface subwayInfo {
    subwayId:string,
    bstatnNm:string,
    btrainSttus:string,
    updnLine:string,
    arvlMsg2:string,
    arvlMsg3:string,
    color:string,
    fastcolor:string
}

export interface subwayLine {
    linename : string,
    stationname: string;
}

export interface admininfo {
    id : string,
    pw : string
}

export interface adminsignupinfo {
    adminname : string,
    adminid : string,
    adminpw: string,
    adminemail : string
}

export interface acceptacc {
    adminid : string | null, 
    admintype : string | null,
    type: Boolean | null
}

export interface Notice {
    title:string,
    content:string,
    created_at : string
}
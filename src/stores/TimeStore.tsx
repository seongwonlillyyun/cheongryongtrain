import { create } from 'zustand'


type HandleTime = {
    result : string;
    setNowDate : (date:Date)=>void
}


export const useTimeStore = create<HandleTime>(set=>({
    result : '',
    setNowDate : (date:Date)=> {
        const year:number = date.getFullYear();
        const month:number = date.getMonth()+1;
        const day:number = date.getDate();
        const hours:number = date.getHours();
        const minutes:number = date.getMinutes();
        const seconds:number = date.getSeconds();
        const timeresult:string = 
        `** ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 
        ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} 기준 **`;  
        set({
            result : timeresult
        })
    }
}))
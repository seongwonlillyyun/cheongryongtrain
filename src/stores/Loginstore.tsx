import {create} from 'zustand'
interface LoginInfo {
    adminid : null | string,
    setadminid : (value:string | null) => void, 
    admintype : null | string,
    setadmintype : (value : string | null) => void;
}
export const Loginstore = create<LoginInfo>((set)=>({
    adminid: null ,
    setadminid: (value) =>{
        set({adminid:value})
    },
    admintype : null,
    setadmintype : (value) => {
        set({admintype:value})
    }
}))
import { useStore } from "zustand"
import {getCookie, removeCookie} from "./cookies"
import { Loginstore } from "../stores/Loginstore"

export const getUser = () : any | null =>{
    const UserInfoString = localStorage.getItem('userinfo')
    const loginToken = getCookie('x-auth-jwt')
    let userinfo:any = null
    try {
        if(UserInfoString&&loginToken){
            userinfo = JSON.parse(UserInfoString)
            return {id : userinfo.id, admin_type:userinfo.admin_type}
        }  else {
            return  null
        }  
    } catch (error) {
        console.log(error)
        return null
    }
}
export const removeUser = () => {
    removeCookie("x-auth-jwt");
    localStorage.clear();
    Loginstore.getState().setadminid(null);
    Loginstore.getState().setadmintype(null);
  };
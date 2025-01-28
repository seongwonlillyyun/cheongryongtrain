import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Station{
    stname : string;
    setStname : (name:string)=>void;
}

export const useStationStore = create(
    persist<Station>(
        
        (set)=>({
            stname:'',
            setStname:(name:string)=>{
                if(name.endsWith('역')){
                    set({stname:name.slice(0,-1)})
                }
                else if (name === '이수' || name === '총신대입구'){
                    set({stname:'총신대입구(이수)'})
                }
                else{
                    set({stname:name})
                }
                
        }}),
        {
            name:'stname',
            storage : createJSONStorage(()=>localStorage)}
      
    )
)
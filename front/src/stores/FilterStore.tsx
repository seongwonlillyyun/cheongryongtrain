import {create} from 'zustand'

type Checkbox = React.ChangeEvent<HTMLInputElement>;

interface Filter  {
    items:string[],
    handleItem : (event:Checkbox) => void,
    resetItem : ()=>void 
}


export const FilterStore = create<Filter>((set)=>({
    items : [],
    handleItem : (event)=>{
        const {value, checked} = event.target;
        set((state)=>({
            items : checked 
            ? [...state.items, value]
            :
            state.items.filter((item)=> item !== value)
        }))
    },
    resetItem : ()=>set(()=>({items:[]}))
}))
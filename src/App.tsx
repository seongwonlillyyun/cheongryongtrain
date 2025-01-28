import { useEffect} from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Root from './Root';
import Main from './pages/Main';
import Result from './pages/Result';
import { useStore } from 'zustand';
import { Loginstore } from './stores/Loginstore';
import { getUser } from './util/localstroage';

function App() {
	 const {adminid, setadminid, admintype, setadmintype} = useStore(Loginstore);
	 
	useEffect(()=>{
		const user = getUser();
		if(user){
			setadminid(user.id);
			setadmintype(user.admin_type);
		}
	},[setadminid, setadmintype])

  const router = createBrowserRouter([{
		path:"/",
		element:<Root/>,
		children : [
			{path : '/', element :<Main/>},
			{path : '/result', element :<Result/>},
		]
	}],
	{	basename: "/cheongryongtrain"}
);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

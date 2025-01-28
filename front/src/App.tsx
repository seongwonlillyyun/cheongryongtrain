import { useEffect, useState } from 'react';
import './App.css';
import {createBrowserRouter,RouterProvider,Navigate,useNavigate} from 'react-router-dom'
import Root from './Root';
import Main from './pages/Main';
import Result from './pages/Result';
import Notice from './pages/Notice';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Adminwrong  from './components/Adminwrong';
import { useStore } from 'zustand';
import { Loginstore } from './stores/Loginstore';
import { FadeLoader } from 'react-spinners';
import { getUser } from './util/localstroage';
import RequireAuth from './components/RequireAuth';
import Adminsetting from './pages/Adminsetting';
import NormalAdmin from './pages/NormalAdmin';
import Adminpwset from './pages/Adminpwset';
import WriteNotice from './pages/WriteNotice';
import NoticeDetail from './pages/NoticeDetail';
import Noticemodify from './pages/Noticemodify';
import Delete from './pages/Delete';
import ModifyNotice from './pages/ModifyNotice';


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
			{path : '/notice', element :<Notice/>},
			{path : '/notice/modify', element :<RequireAuth component={Noticemodify}/>},
			{path : '/notice/modify/write/:id', element : <RequireAuth component={ModifyNotice}/>},
			{path : '/notice/modify/delete/:id', element :<RequireAuth component={Delete}/>},
			{path : '/notice/detail/:id', element :<NoticeDetail/>},
			{path : '/admin', element : <RequireAuth component={Admin}/>},
			{path : '/notfound', element : <Adminwrong/>},
			{path : '/adminlogin', element : adminid&&admintype!=='guest'? <Navigate to = '/admin'/> : <AdminLogin/>},
			{path : '/adminsignup', element :<AdminSignup/>},
			{path : '/admin/adminsetting', element :<RequireAuth component={Adminsetting}/>},
			{path : '/admin/adminpw', element :<RequireAuth component={Adminpwset}/>},
			{path : '/notice/write', element :<RequireAuth component={WriteNotice}/>}
		]
	}]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;

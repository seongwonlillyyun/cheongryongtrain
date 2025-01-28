import React, { useState } from 'react';
import Header from './pages/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { Loginstore } from './stores/Loginstore';
import { useEffect } from 'react';



const Root = () => {
  const {adminid, setadminid} = useStore(Loginstore);

return(
    <>
              <Header/>
              <Outlet/>
    </>
  );
}
export default Root;
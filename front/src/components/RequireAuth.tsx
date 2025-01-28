import React, { Component } from 'react';
import { getUser } from '../util/localstroage';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
    component : React.FC;
}

const RequireAuth :React.FC<RequireAuthProps> = ({component:Component}) => {
    const user = getUser();
    if (!user) {
        return <Navigate to="/notfound" />;
    }

    const { id: adminid, admin_type: admin_type } = user;
    
    

    if (adminid === null) {
        return <Navigate to="/notfound" />;
    }

    if (admin_type === 'guest') {
        alert('아직 승인이 되지 않아 이용하실 수 없습니다.');
        return <Navigate to="/" />;
    }

    return <Component />; // 권한이 있는 경우 Component를 렌더링
}
export default RequireAuth;
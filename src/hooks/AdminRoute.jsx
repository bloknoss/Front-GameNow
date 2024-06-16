import React, { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export function AdminRoute({ children }) {

    const navigation = useNavigate();
    const [admin, setAdmin] = useState();
    let { isAdmin } = useAuth();

    useEffect(() => {
        isAdmin().then((res) => {

            setAdmin(res)
        })
    }, [])



    if (admin)
        return children;
    else
        navigation("/login");
}


export default AdminRoute;

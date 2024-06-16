import React, { useEffect, useState } from 'react';
import { Route, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function LoggedRoute({ children }) {

    const navigation = useNavigate();
    const [logged, setLogged] = useState();
    let { isLogged } = useAuth();

    useEffect(() => {
        isLogged().then((res) => {

            setLogged(res)
        })
    }, [])



    if (logged)
        return children;
    else
        navigation("/login");
}




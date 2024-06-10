
import {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
 let localStorageTokenRefresh = localStorage.getItem('refresh_token');
 const navigate = useNavigate();

 console.log(localStorageTokenRefresh)
    useEffect(() => {
        (async () => {
            try {
                await axios.post('http://145.239.84.6/api/v1/users/logout/',{
                refresh_token: localStorageTokenRefresh
                } ,{headers: {
                    'Content-Type': 'application/json',
                    // добавила эту строку 
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,

                }}, {withCredentials: true});

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                navigate( '/login'); 
            } catch (e) {
                console.log('logout not working', e)
            }
        })();
    }, [navigate, localStorageTokenRefresh]);

    return (
        <div></div>
    )
}

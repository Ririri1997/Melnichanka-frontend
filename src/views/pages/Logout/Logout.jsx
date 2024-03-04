
import {useEffect} from "react";
import axios from "axios";

export const Logout = () => {
 let localStorageTokenRefresh = localStorage.getItem('refresh_token');

 console.log(localStorageTokenRefresh)
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post('http://127.0.0.1:8000/api/v1/users/logout/',{
                refresh_token: localStorageTokenRefresh
                } ,{headers: {
                    'Content-Type': 'application/json',
                    // добавила эту строку 
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,

                }}, {withCredentials: true});

                console.log('logout', data)
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login'
            } catch (e) {
                console.log('logout not working', e)
            }
        })();
    }, []);

    return (
        <div></div>
    )
}

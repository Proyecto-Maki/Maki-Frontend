import {React} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const refresh = sessionStorage.getItem('refresh');

    if (!token && !refresh) {
        navigate('/iniciar-sesion');
    }

    api
        .post("logout/", {
            refresh: refresh,
        }, 
            {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            }
        )
        .then((res) => {
            if (res.status === 204) {
                console.log('Logout successful');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('refresh');
                sessionStorage.removeItem('email');
                navigate('/iniciar-sesion');
            } else {
                console.log('Error in logout');
                console.log(res.data.message);
                
            }
        })
        .catch((error) => {
            console.log(error.response ? error.response.data.detail : "Error in the server");
            console.log(error.response.data.detail);
        });
}

export default Logout;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiService";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/reducers/userSlice";
const useLogin = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleUserLogin = async (formData) =>{
        setLoading(false);
        try{
            const response = await login(formData);
            setLoading(false);
            console.log(response);
            dispatch(storeUser({user: response?.data}))
            localStorage.setItem('authToken', response.data.token);
            navigate('/home');
        }catch(error){
            setLoading(false);
            setError('Unable to login');
        }
    }
    return {handleUserLogin, loading, error};
}


export default useLogin;
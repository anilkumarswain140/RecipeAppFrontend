import { useState } from "react"
import { signUpUser } from "../api/apiService";
import { useNavigate } from "react-router-dom";


const useSignUp = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (formData) =>{
        setLoading(true);
        try{
        const data = await signUpUser(formData);
        console.log(data);
        setLoading(false);
        navigate('/login');
        }catch(error){
            setError('Failed to sign up');
            setLoading(false);
        }
    }
    return {handleSignUp, error, loading};
} 

export default useSignUp;
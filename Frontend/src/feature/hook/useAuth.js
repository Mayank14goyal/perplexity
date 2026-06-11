import { useDispatch } from "react-redux";
import { register, login, getMe } from "../auth/services/auth.api.js";
import { setUser, setLoading, setError } from "../auth/auth.slice.js"

export function useAuth(){
const dispatch = useDispatch()

async function handleRegister({email, username, password}){
    try{
        dispatch(setLoading(true))
        const data = await register({email, username, password})
        dispatch(setUser(data.user))
    } catch(err){
        dispatch(setError(err.responce?.data?.message || "registration failed"))
    } finally {
        dispatch(setLoading(false))
    }
    }

async function handleLogin({email,password}){
    try{
        dispatch(setLoading(true))
        const data = await login({email,password})
        dispatch(setUser(data.user))
    }catch(err){
        dispatch(setError(err.responce?.data?.message || "Login failed"))
    }finally{
        dispatch(setLoading(false))
    }
}

async function handleGetMe(){
    try{
        dispatch(setLoading(true))
        const data = await getMe()
        dispatch(setUser(data.user))
    }catch(err){
        dispatch(setError(err.responce?.data?.message) || "failed to fatch userData")
    }finally{
        dispatch(setLoading(false))
    }
    }

    return{
        handleGetMe,
        handleLogin,
        handleRegister
    }
}


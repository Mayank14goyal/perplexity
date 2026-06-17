import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat'
import { useEffect } from 'react'

const Dashbord = () => {

  const chat = useChat();

    const {user}= useSelector(state => state.auth)

    console.log(user)

    useEffect(()=>{
      chat.initializeSocketConnection()
    },[])
    
  return (
    <div>Dashbord</div>
  )
}

export default Dashbord
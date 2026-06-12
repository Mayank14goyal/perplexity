    import  {useSelector} from "react-redux"
    import {Navigate} from "react-router"

    const protectedd = ({children}) => {

        const user = useSelector(state => state.auth.user)
        const loading = useSelector(state => state.auth.loading)

        if(loading){
            return <div>Loading...</div>
        }

        if(!user){
            return (<Navigate to="/login" replace />)
        }
    return children
    }

    export default protectedd
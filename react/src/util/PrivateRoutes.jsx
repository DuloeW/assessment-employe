import { Navigate, Outlet } from "react-router-dom"


const PrivateRoutes = () => {
    const checkingLocalStorage = () => {
        let isAuth = localStorage.getItem("isAuth")
        return isAuth === "true"
    }
    return (
        checkingLocalStorage() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({isAllowed, children, redirectTo="/landing"}) => {

    // si no existe usuario navega a la pagina landing 
    if(!isAllowed) {
        return <Navigate to={redirectTo}/>
    }

    /* retornamos elk mismo elemento que estamos conteniendo */
  return children ? children : <Outlet />
}

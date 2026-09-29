import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <p role="status">Comprobando tu sesión...</p>
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}

export default ProtectedRoute

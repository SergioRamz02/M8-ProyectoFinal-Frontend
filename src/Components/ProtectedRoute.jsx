import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function ProtectedRoute({children}) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to='/' state={{from: location}} replace />
    }
    return children;
}
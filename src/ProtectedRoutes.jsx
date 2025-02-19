// import { Outlet, Navigate } from 'react-router-dom';
// import useAuth from './hooks/useAuth';

// const ProtectedRoutes = () => {
//     const { userState } = useAuth();
    
//     if (!userState.user || !userState.accessToken) {
//         return <Navigate to="/" replace />;
//     }
    
//     return <Outlet />;
// };

// export default ProtectedRoutes;

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoutes = () => {
    const { userState } = useAuth();
    
    if (!userState.user || !userState.accessToken) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};

export default ProtectedRoutes;
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

// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

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
import { useEffect, useState } from 'react';
import { checkAuthState } from './lib/Auth';

const ProtectedRoutes = () => {
    const { userState, setUserState } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            await checkAuthState(setUserState);
            setIsLoading(false);
        };
        init();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userState.user || !userState.accessToken) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
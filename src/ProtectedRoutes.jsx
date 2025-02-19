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
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { handleGetCurrentUser } from './lib/Auth';

const ProtectedRoutes = () => {
    const { userState, setUserState } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = async () => {
        try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                const session = await fetchAuthSession();
                const userData = await handleGetCurrentUser();

                setUserState({
                    user: userData.data.user,
                    idToken: session.tokens.idToken,
                    accessToken: session.tokens.accessToken,
                    refreshToken: session.tokens.refreshToken
                });
            }
        } catch (error) {
            console.log("No authenticated user");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    if (!userState.user || !userState.accessToken) {
        return <Navigate to="/signin" replace />;  // Changed from "/" to "/signin"
    }

    return <Outlet />;
};

export default ProtectedRoutes;
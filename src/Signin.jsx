
// import { useState } from "react";
// import { useAuth } from "./context/AuthContext";  // Changed this line
// import { handleGetCurrentUser, handleSignin } from "./lib/Auth";
// import { useNavigate } from "react-router-dom";
// import { fetchAuthSession } from "aws-amplify/auth";
// const Signin = () => {
//     const { setUserState } = useAuth();
//     const navigate = useNavigate();
//     const [error, setError] = useState("");
//     const [form, setForm] = useState({
//         username: "",
//         password: ""
//     });

//     const handleSignedIn = async (e) => {
//         e.preventDefault();
        
//         // Add validation
//         if (!form.username || !form.password) {
//             setError("Username and password are required");
//             return;
//         }

//         // Log the form data before sending
//         console.log("Form data:", { 
//             username: form.username,
//             password: form.password.replace(/./g, '*') // Mask password in logs
//         });

//         try {
//             const signedIn = await handleSignin({
//                 username: form.username.trim(), // Ensure no whitespace
//                 password: form.password
//             });
            
//             if (!signedIn.success) {
//                 setError(signedIn.error);
//                 return;
//             }

//             if (signedIn.data.isSignedIn) {
//                 const session = await fetchAuthSession();
//                 const userData = await handleGetCurrentUser();

//                 const tokens = {
//                     accessToken: session.tokens.accessToken,
//                     idToken: session.tokens.idToken,
//                     refreshToken: session.tokens.refreshToken
//                 };

//                 setUserState({
//                     user: userData.data.user,
//                     idToken: tokens.idToken,
//                     accessToken: tokens.accessToken,
//                     refreshToken: tokens.refreshToken
//                 });

//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             console.error("Sign in error:", error);
//             setError(error.message || "An error occurred during sign in");
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSignedIn} className="space-y-4">
//                 <div className="flex flex-col gap-2">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={form.username}
//                         onChange={(e) => {
//                             const value = e.target.value;
//                             console.log("Setting username:", value); // Debug log
//                             setForm(prev => ({ ...prev, username: value }));
//                         }}
//                         className="p-2 border rounded"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={form.password}
//                         onChange={(e) => {
//                             const value = e.target.value;
//                             setForm(prev => ({ ...prev, password: value }));
//                         }}
//                         className="p-2 border rounded"
//                     />
//                 </div>
//                 <button 
//                     type="submit" 
//                     className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Sign In
//                 </button>
//             </form>
//             {error && (
//                 <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
//                     <h1 className="font-bold">Error Signing In</h1>
//                     <p>{error}</p>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Signin;

// Notes:
// if the user has already signedin please make sure you check and directly redirect them to protected routes home
// if user has signed in and you try to redirect to protected routes it wont unless you make sure the logic in protected routes check for session locally. session in state variabes arent persistent

import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { checkAuthState, handleGetCurrentUser, handleSignin } from "./lib/Auth";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

const Signin = () => {
    const { setUserState } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // Check for existing session on component mount
    useEffect(() => {
        checkCurrentUser();
    }, []);

    const checkCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
                // User is already signed in, get their session
                const session = await fetchAuthSession();
                const userData = await handleGetCurrentUser();

                setUserState({
                    user: userData.data.user,
                    idToken: session.tokens.idToken,
                    accessToken: session.tokens.accessToken,
                    refreshToken: session.tokens.refreshToken
                });

                navigate("/dashboard");
            }
        } catch (error) {
            // No existing session, user needs to sign in
            console.log("No existing session");
        }
    };

    const handleSignedIn = async (e) => {
        e.preventDefault();

        try {
            const authState = await checkAuthState()
            if(authState) {
                navigate("/dashboard")
                return
            }
            
            const signedIn = await handleSignin({
                username: form.email,
                password: form.password
            });
            
            if (!signedIn.success) {
                setError(signedIn.error);
                return;
            }

            if (signedIn.data.isSignedIn) {
                const session = await fetchAuthSession();
                const userData = await handleGetCurrentUser();

                setUserState({
                    user: userData.data.user,
                    idToken: session.tokens.idToken,
                    accessToken: session.tokens.accessToken,
                    refreshToken: session.tokens.refreshToken
                });

                navigate("/dashboard");
            }
        } catch (error) {
            if (error.message === "User is already signed in") {
                // Double check if user is signed in and redirect
                checkCurrentUser();
            } else {
                setError(error.message || "An error occurred during sign in");
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSignedIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Submit</button>
            </form>
            {error && (
                <div>
                    <h1>Error Signing In</h1>
                    <p>{error}</p>
                </div>
            )}
        </>
    );
};

export default Signin;


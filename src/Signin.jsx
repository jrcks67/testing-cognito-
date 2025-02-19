// Notes:
// if the user has already signedin please make sure you check and directly redirect them to protected routes home
// if user has signed in and you try to redirect to protected routes it wont unless you make sure the logic in protected routes check for session locally. session in state variabes arent persistent

// import { useState, useEffect } from "react";
// import { useAuth } from "./context/AuthContext";
// import { checkAuthState, handleGetCurrentUser, handleSignin } from "./lib/Auth";
// import { useNavigate } from "react-router-dom";
// import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

// const Signin = () => {
//     const { setUserState } = useAuth();
//     const navigate = useNavigate();
//     const [error, setError] = useState("");
//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     // Check for existing session on component mount
//     useEffect(() => {
//         checkCurrentUser();
//     }, []);

//     const checkCurrentUser = async () => {
//         try {
//             const currentUser = await getCurrentUser();
//             if (currentUser) {
//                 // User is already signed in, get their session
//                 const session = await fetchAuthSession();
//                 const userData = await handleGetCurrentUser();

//                 setUserState({
//                     user: userData.data.user,
//                     idToken: session.tokens.idToken,
//                     accessToken: session.tokens.accessToken,
//                     refreshToken: session.tokens.refreshToken
//                 });

//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             // No existing session, user needs to sign in
//             console.log("No existing session");
//         }
//     };

//     const handleSignedIn = async (e) => {
//         e.preventDefault();

//         try {
//             const authState = await checkAuthState()
//             if(authState) {
//                 navigate("/dashboard")
//                 return
//             }
            
//             const signedIn = await handleSignin({
//                 username: form.email,
//                 password: form.password
//             });
            
//             if (!signedIn.success) {
//                 setError(signedIn.error);
//                 return;
//             }

//             if (signedIn.data.isSignedIn) {
//                 const session = await fetchAuthSession();
//                 const userData = await handleGetCurrentUser();

//                 setUserState({
//                     user: userData.data.user,
//                     idToken: session.tokens.idToken,
//                     accessToken: session.tokens.accessToken,
//                     refreshToken: session.tokens.refreshToken
//                 });

//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             if (error.message === "User is already signed in") {
//                 // Double check if user is signed in and redirect
//                 checkCurrentUser();
//             } else {
//                 setError(error.message || "An error occurred during sign in");
//             }
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSignedIn}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             {error && (
//                 <div>
//                     <h1>Error Signing In</h1>
//                     <p>{error}</p>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Signin;



import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { checkAuthState, handleGetCurrentUser, handleSignin, handleResetPassword, handleConfirmResetPassword } from "./lib/Auth";
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
    const [isResetting, setIsResetting] = useState(false);
    const [resetForm, setResetForm] = useState({
        email: "",
        verificationCode: "",
        newPassword: ""
    });
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false)

    useEffect(() => {
        checkCurrentUser();
    }, []);

    const checkCurrentUser = async () => {
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

                navigate("/dashboard");
            }
        } catch (error) {
            console.log("No existing session");
        }
    };

    const handleSignedIn = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage(""); // Clear success message on sign-in attempt
    
        try {
            const authState = await checkAuthState();
            if (authState) {
                navigate("/dashboard");
                return;
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
                checkCurrentUser();
            } else {
                setError(error.message || "An error occurred during sign in");
            }
        }
    };

    // const handleSignedIn = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const authState = await checkAuthState();
    //         if (authState) {
    //             navigate("/dashboard");
    //             return;
    //         }

    //         const signedIn = await handleSignin({
    //             username: form.email,
    //             password: form.password
    //         });

    //         if (!signedIn.success) {
    //             setError(signedIn.error);
    //             return;
    //         }

    //         if (signedIn.data.isSignedIn) {
    //             const session = await fetchAuthSession();
    //             const userData = await handleGetCurrentUser();

    //             setUserState({
    //                 user: userData.data.user,
    //                 idToken: session.tokens.idToken,
    //                 accessToken: session.tokens.accessToken,
    //                 refreshToken: session.tokens.refreshToken
    //             });

    //             navigate("/dashboard");
    //         }
    //     } catch (error) {
    //         if (error.message === "User is already signed in") {
    //             checkCurrentUser();
    //         } else {
    //             setError(error.message || "An error occurred during sign in");
    //         }
    //     }
    // };

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await handleResetPassword({
                email: resetForm.email
            });

            if (result.success) {
                setShowResetConfirm(true);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResetConfirm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await handleConfirmResetPassword({
                email: resetForm.email,
                verificationCode: resetForm.verificationCode,
                newPassword: resetForm.newPassword
            });

            if (result.success) {
                setIsResetting(false);
                setShowResetConfirm(false);
                setForm({ ...form, email: resetForm.email });
                setPasswordReset(true)
                setTimeout(()=>{
                    navigate("/signin")
                    window.location.reload()
                    window.location.reload();
                },3000)
                
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (isResetting) {
        return (
            <>
                {!showResetConfirm ? (
                    <form onSubmit={handleReset}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={resetForm.email}
                            onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                        />
                        <button type="submit">Send Reset Code</button>
                        <button type="button" onClick={() => setIsResetting(false)}>
                            Back to Sign In
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetConfirm}>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={resetForm.verificationCode}
                            onChange={(e) => setResetForm({ ...resetForm, verificationCode: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={resetForm.newPassword}
                            onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                )}
                {error && (
                    <div>
                        <h1>Error</h1>
                        <p>{error}</p>
                    </div>
                )}
            </>
        );
    }

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
                <button type="button" onClick={() => setIsResetting(true)}>
                    Forgot Password?
                </button>
            </form>
            {error && (
                <div>
                    <h1>Error Signing In</h1>
                    <p>{error}</p>
                </div>
            )}
            {
                passwordReset && (
                    <div>
                        <h3>Password Successfully Reset</h3>
                        <p>Please <a href="/signin">SignIn</a></p>
                    </div>
                )
            }
        </>
    );
};

export default Signin;
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


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import { 
//     handleMobileSignin, 
//     handleOtpVerification, 
//     handleResendOtp,
//     checkMobileAuthState 
// } from "./lib/AuthMobile";

// const TalentAuth = () => {
//     const navigate = useNavigate();
//     const { setUserState } = useAuth();
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [otp, setOtp] = useState("");
//     const [showOtpInput, setShowOtpInput] = useState(false);
//     const [error, setError] = useState("");
//     const [isNewUser, setIsNewUser] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const init = async () => {
//             const isAuthenticated = await checkMobileAuthState(setUserState);
//             if (isAuthenticated === true) {
//                 navigate("/dashboard");
//             }
//         };
//         init();
//     }, []);

//     const handlePhoneSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setIsLoading(true);

//         try {
//             const result = await handleMobileSignin({ phoneNumber });
            
//             if (result.success) {
//                 setIsNewUser(result.isNewUser);
//                 setShowOtpInput(true);
//             } else {
//                 setError(result.error);
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setIsLoading(true);

//         try {
//             const result = await handleOtpVerification({
//                 phoneNumber,
//                 otp,
//                 isNewUser
//             });

//             if (result.success) {
//                 const isAuthenticated = await checkMobileAuthState(setUserState);
//                 if (isAuthenticated === true) {
//                     navigate("/dashboard");
//                 }
//             } else {
//                 setError(result.error);
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleResendOtpClick = async () => {
//         setError("");
//         setIsLoading(true);

//         try {
//             const result = await handleResendOtp({ phoneNumber });
//             if (!result.success) {
//                 setError(result.error);
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//             {!showOtpInput ? (
//                 <form onSubmit={handlePhoneSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Phone Number
//                         </label>
//                         <div className="mt-1 relative rounded-md shadow-sm">
//                             <input
//                                 type="tel"
//                                 value={phoneNumber}
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                                 placeholder="Enter your phone number"
//                                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                                 disabled={isLoading}
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//                     >
//                         {isLoading ? "Sending..." : "Send OTP"}
//                     </button>
//                 </form>
//             ) : (
//                 <form onSubmit={handleOtpSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                             Enter OTP
//                         </label>
//                         <input
//                             type="text"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             placeholder="Enter OTP"
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                             disabled={isLoading}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//                     >
//                         {isLoading ? "Verifying..." : "Verify OTP"}
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleResendOtpClick}
//                         disabled={isLoading}
//                         className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
//                     >
//                         Resend OTP
//                     </button>
//                 </form>
//             )}
//             {error && (
//                 <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
//                     <p className="text-sm">{error}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TalentAuth;

// import React from 'react';

// const CLIENT_ID = '867vpybjp53bk6';
// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// const SCOPE = 'openid profile email';

// const TalentAuth = () => {
//   const handleLogin = () => {
//     const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=randomstring123`;
//     const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');
    
//     // Listen for message from pop-up
//     window.addEventListener('message', (event) => {
//       if (event.data.type === 'linkedin_callback') {
//         console.log('User data:', event.data.user);
//         popup.close(); // Close pop-up after receiving data
//       }
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
//       <button
//         onClick={handleLogin}
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Sign In with LinkedIn
//       </button>
//     </div>
//   );
// };

// export default TalentAuth;

// import React from 'react';

// const CLIENT_ID = '867vpybjp53bk6';
// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// // Updated scope for LinkedIn's API endpoints
// const SCOPE = 'r_liteprofile r_emailaddress';

// const TalentAuth = () => {
//   const handleLogin = () => {
//     const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=randomstring123`;
//     const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');
    
//     // Listen for message from pop-up
//     window.addEventListener('message', (event) => {
//       if (event.data.type === 'linkedin_callback') {
//         console.log('User data:', event.data.user);
//         popup.close(); // Close pop-up after receiving data
//       }
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
//       <button
//         onClick={handleLogin}
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Sign In with LinkedIn
//       </button>
//     </div>
//   );
// };

// export default TalentAuth;













// import React from 'react';
// import { Auth, signIn } from '@aws-amplify/auth';

// const CLIENT_ID = '867vpybjp53bk6';
// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// const SCOPE = 'r_liteprofile r_emailaddress';

// const TalentAuth = () => {
//   const handleLogin = async () => {
//     try {
//       const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${await generateCognitoState()}`;
      
//       const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');
      
//       window.addEventListener('message', async (event) => {
//         if (event.data.type === 'linkedin_callback') {
//           try {
//             // Exchange LinkedIn token for Cognito credentials
//             const { username } = await signIn(event.data.user.email);
//             const cognitoUser = await Auth.sendCustomChallengeAnswer(username, event.data.code);
            
//             console.log('Cognito user:', cognitoUser);
//             popup.close();
//           } catch (error) {
//             console.error('Cognito federation error:', error);
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Authentication error:', error);
//     }
//   };

//   const generateCognitoState = async () => {
//     try {
//       const session = await Auth.currentSession();
//       return Buffer.from(JSON.stringify({
//         csrf: 'randomstring123',
//         cognitoState: session.getIdToken().getJwtToken()
//       })).toString('base64');
//     } catch (error) {
//       return Buffer.from(JSON.stringify({
//         csrf: 'randomstring123'
//       })).toString('base64');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
//       <button
//         onClick={handleLogin}
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Sign In with LinkedIn
//       </button>
//     </div>
//   );
// };

// export default TalentAuth;

// // // TalentSignin.jsx
// import React from 'react';
// import { fetchAuthSession } from '@aws-amplify/auth';

// const CLIENT_ID = '867vpybjp53bk6';
// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// const SCOPE = 'r_liteprofile r_emailaddress';

// const TalentAuth = () => {
//   // Helper function to generate random string for state
//   const generateRandomString = (length = 10) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   };

//   // Generate state parameter for OAuth
//   const generateCognitoState = async () => {
//     try {
//       const session = await fetchAuthSession();
//       const idToken = session.tokens?.idToken?.toString();
      
//       const stateObj = {
//         csrf: generateRandomString(),
//         cognitoState: idToken || ''
//       };

//       // Use btoa with proper Unicode handling
//       return btoa(unescape(encodeURIComponent(JSON.stringify(stateObj))));
//     } catch (error) {
//       console.log('No existing session:', error);
//       const fallbackState = {
//         csrf: generateRandomString()
//       };
//       return btoa(unescape(encodeURIComponent(JSON.stringify(fallbackState))));
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       // Generate state parameter
//       const state = await generateCognitoState();
      
//       // Construct LinkedIn OAuth URL
//       const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${state}`;
      
//       // Open popup window
//       const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');
      
//       // Handle popup message
//       const handleMessage = async (event) => {
//         try {
//           if (event.data.type === 'linkedin_callback') {
//             // Remove event listener
//             window.removeEventListener('message', handleMessage);
            
//             // Make request to your Lambda endpoint
//             const response = await fetch(REDIRECT_URI, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 code: event.data.code,
//                 redirect_uri: REDIRECT_URI,
//                 state: state // Send state back for verification
//               })
//             });

//             const data = await response.json();
            
//             if (data.status === 'success') {
//               // Store tokens
//               localStorage.setItem('accessToken', data.data.tokens.accessToken);
//               localStorage.setItem('idToken', data.data.tokens.idToken);
//               localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
              
//               // Close popup
//               popup.close();
              
//               // Redirect to dashboard
//               window.location.href = '/dashboard';
//             } else {
//               throw new Error(data.message || 'Authentication failed');
//             }
//           }
//         } catch (error) {
//           console.error('Error processing callback:', error);
//           popup?.close();
//           // Handle error (show error message to user)
//         }
//       };

//       // Add event listener for popup message
//       window.addEventListener('message', handleMessage);
      
//       // Cleanup if popup is closed
//       const checkPopup = setInterval(() => {
//         if (popup?.closed) {
//           clearInterval(checkPopup);
//           window.removeEventListener('message', handleMessage);
//         }
//       }, 1000);

//     } catch (error) {
//       console.error('Login error:', error);
//       // Handle error (show error message to user)
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
//       <button
//         onClick={handleLogin}
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Sign In with LinkedIn
//       </button>
//     </div>
//   );
// };

// export default TalentAuth;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CLIENT_ID = '867vpybjp53bk6';
// Use window.location.origin for dynamic base URL
const REDIRECT_URI = "https://d1yrl9dxaro8f7.cloudfront.net/talent-callback";
const SCOPE = 'openid profile email';

const TalentSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const generateState = () => {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const state = generateState();
      sessionStorage.setItem('linkedin_oauth_state', state);
      
      // Store the intended destination if any
      if (location.state?.from) {
        sessionStorage.setItem('auth_redirect', location.state.from.pathname);
      }

      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=${state}`;

      const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');

      const messageHandler = async (event) => {
        if (event.data.type === 'linkedin_callback_success') {
          const { tokens, user } = event.data;
          
          // Store tokens
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('idToken', tokens.idToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          
          popup.close();
          
          // Navigate to stored redirect or dashboard
          const redirectPath = sessionStorage.getItem('auth_redirect') || '/dashboard';
          sessionStorage.removeItem('auth_redirect');
          navigate(redirectPath);
        } else if (event.data.type === 'linkedin_callback_error') {
          setError(event.data.error);
          popup.close();
        }
      };

      window.addEventListener('message', messageHandler);

      const popupCheck = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupCheck);
          window.removeEventListener('message', messageHandler);
          setIsLoading(false);
        }
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to initialize login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
      {error && (
        <div className="mb-4 text-red-500 text-center p-4 bg-red-100 rounded">
          {error}
        </div>
      )}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          'Sign In with LinkedIn'
        )}
      </button>
    </div>
  );
};

export default TalentSignin;

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

import React from 'react';

const CLIENT_ID = '867vpybjp53bk6';
const REDIRECT_URI = 'https://d1yrl9dxaro8f7.cloudfront.net/talent-callback';
const SCOPE = 'openid profile email';

const TalentAuth = () => {
  const handleLogin = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}&state=randomstring123`;
    const popup = window.open(authUrl, 'linkedinLogin', 'width=600,height=600');
    
    // Listen for message from pop-up
    window.addEventListener('message', (event) => {
      if (event.data.type === 'linkedin_callback') {
        console.log('User data:', event.data.user);
        popup.close(); // Close pop-up after receiving data
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login with LinkedIn</h2>
      <button
        onClick={handleLogin}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign In with LinkedIn
      </button>
    </div>
  );
};

export default TalentAuth;
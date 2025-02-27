// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const REDIRECT_URI = 'http://localhost:5173/talent/dashboard';
// const LAMBDA_ENDPOINT = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication';

// const TalentCallback = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');

//       if (!code) {
//         setError('No authorization code received.');
//         return;
//       }

//       try {
//         // Create axios instance with CORS configuration
//         const api = axios.create({
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true
//         });

//         // Send code to Lambda function with proper configuration
//         const response = await api.post(LAMBDA_ENDPOINT, 
//           { 
//             code, 
//             redirect_uri: REDIRECT_URI 
//           },
//           {
//             headers: {
//               'Access-Control-Allow-Origin': 'http://localhost:5173',
//               'Access-Control-Allow-Methods': 'POST, OPTIONS',
//               'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//             }
//           }
//         );

//         const { access_token, userInfo } = response.data;

//         // Validate userInfo before setting state
//         if (userInfo && userInfo.name) {
//           setUser(userInfo);
//         } else {
//           throw new Error('Invalid user data received');
//         }
//       } catch (err) {
//         console.error('Authentication error:', err);
//         setError(err.response?.data?.error || 'Authentication failed. Please try again.');
//       }
//     };

//     handleCallback();
//   }, []);

//   // Loading state component
//   const LoadingState = () => (
//     <div className="flex items-center justify-center">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       <span className="ml-2">Authenticating...</span>
//     </div>
//   );

//   // Error state component
//   const ErrorState = ({ message }) => (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//       <strong className="font-bold">Error: </strong>
//       <span className="block sm:inline">{message}</span>
//     </div>
//   );

//   // User info component
//   const UserInfo = ({ user }) => (
//     <div className="bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
//       {user.email && <p className="text-gray-600 mb-4">Email: {user.email}</p>}
//       {user.picture && (
//         <div className="mt-4">
//           <img 
//             src={user.picture} 
//             alt="Profile" 
//             className="w-24 h-24 rounded-full mx-auto shadow-md"
//             onError={(e) => e.target.style.display = 'none'}
//           />
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4">
//       {!user && !error && <LoadingState />}
//       {error && <ErrorState message={error} />}
//       {user && <UserInfo user={user} />}
//     </div>
//   );
// };

// export default TalentCallback;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// const LAMBDA_ENDPOINT = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';

// const TalentCallback = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');

//       if (!code) {
//         setError('No authorization code received.');
//         return;
//       }

//       try {
//         // Create axios instance with updated configuration
//         const response = await axios({
//           method: 'post',
//           url: LAMBDA_ENDPOINT,
//           data: { 
//             code,
//             redirect_uri: REDIRECT_URI 
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           withCredentials: false
//         });

//         const { access_token, userInfo } = response.data;

//         if (userInfo) {
//           setUser(userInfo);
//         } else {
//           throw new Error('Invalid user data received');
//         }
//       } catch (err) {
//         console.error('Authentication error:', err);
//         setError(err.response?.data?.error || 'Authentication failed. Please try again.');
//       }
//     };

//     handleCallback();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       {user ? (
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
//           <p>Email: {user.email}</p>
//           {user.picture && (
//             <img 
//               src={user.picture} 
//               alt="Profile" 
//               className="w-24 h-24 rounded-full mx-auto mt-4"
//               onError={(e) => e.target.style.display = 'none'}
//             />
//           )}
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center p-4 bg-red-100 rounded">
//           {error}
//         </div>
//       ) : (
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4">Authenticating...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TalentCallback;


// import React, { useEffect, useState } from 'react';
// import { fetchAuthSession } from '@aws-amplify/auth';
// import axios from 'axios';

// const REDIRECT_URI = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';
// const LAMBDA_ENDPOINT = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';

// const TalentCallback = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');

//       if (!code) {
//         setError('No authorization code received.');
//         return;
//       }

//       try {
//         const response = await axios({
//           method: 'post',
//           url: LAMBDA_ENDPOINT,
//           data: {
//             code,
//             redirect_uri: REDIRECT_URI
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           withCredentials: false
//         });

//         if (response.data.status === 'success') {
//           const { tokens, user: userData } = response.data.data;
          
//           // Store tokens
//           localStorage.setItem('accessToken', tokens.accessToken);
//           localStorage.setItem('idToken', tokens.idToken);
//           localStorage.setItem('refreshToken', tokens.refreshToken);
          
//           setUser(userData);
          
//           // If in popup mode, send message to opener
//           if (window.opener) {
//             window.opener.postMessage({
//               type: 'linkedin_callback',
//               code: code,
//               user: userData
//             }, '*');
//             window.close();
//           } else {
//             // Regular redirect flow
//             window.location.href = '/dashboard';
//           }
//         } else {
//           throw new Error('Invalid response received');
//         }
//       } catch (err) {
//         console.error('Authentication error:', err);
//         setError(err.response?.data?.error || 'Authentication failed. Please try again.');
//       }
//     };

//     handleCallback();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       {user ? (
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold mb-4">Welcome, {user.firstName} {user.lastName}!</h2>
//           <p>Email: {user.email}</p>
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center p-4 bg-red-100 rounded">
//           {error}
//         </div>
//       ) : (
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4">Authenticating...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TalentCallback;


// components/TalentCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LAMBDA_ENDPOINT = 'https://vpvho25ne6.execute-api.ap-south-1.amazonaws.com/authentication/auth';

const TalentCallback = () => {
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        
        // Verify state
        const storedState = sessionStorage.getItem('linkedin_oauth_state');
        sessionStorage.removeItem('linkedin_oauth_state');
        
        if (state !== storedState) {
          throw new Error('Invalid state parameter');
        }
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        const response = await axios({
          method: 'post',
          url: LAMBDA_ENDPOINT,
          data: { code },
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.status === 'success') {
          if (window.opener) {
            // If in popup, send message to parent
            window.opener.postMessage({
              type: 'linkedin_callback_success',
              tokens: response.data.data.tokens,
              user: response.data.data.user
            }, '*');
          } else {
            // If direct navigation, handle tokens and redirect
            const { tokens } = response.data.data;
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('idToken', tokens.idToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            
            // Navigate to stored redirect or dashboard
            const redirectPath = sessionStorage.getItem('auth_redirect') || '/dashboard';
            sessionStorage.removeItem('auth_redirect');
            navigate(redirectPath);
          }
        } else {
          throw new Error(response.data.message || 'Authentication failed');
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError(err.message || 'Authentication failed');
        setStatus('error');
        
        if (window.opener) {
          window.opener.postMessage({
            type: 'linkedin_callback_error',
            error: err.message
          }, '*');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      {status === 'processing' ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Processing your login...</p>
        </div>
      ) : (
        <div className="text-red-500 text-center p-4 bg-red-100 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default TalentCallback;
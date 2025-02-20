// import { signIn, signUp, resendSignUpCode, resetPassword, confirmResetPassword, getCurrentUser, confirmSignUp,  signOut,  } from "aws-amplify/auth";

// const handleSignup = async ({email,password, }) => {
//     try {
//         const { istSignUpComplete, userId } = await signUp({
//             username:email,
//             password,
//             options: {
//                 userAttributes : {
//                     email,
                    
//                 }
//             }
//         });
//         return { success: true, data: { istSignUpComplete, userId }}
//     } catch (error) {
//         return { success: false, error: error.message }
//     }

// }
// const handleConfirmSignup = async ({email, verificationCode}) => {

//     try {
//         const { isSignUpComplete } = await confirmSignUp({
//             username:email,
//             confirmationCode: verificationCode
//         });
//         return { success: true, data: {isSignUpComplete}}
//     } catch (error) {
//         return { success: false, error: error.message}
//     }

// }

// const handleResendSignupCode = async ({email}) => {

//     try {
//         const { codeSent, destination } = await resentSignUpCode({
//             username:email,
//         })
//       return { success: true, data: { codeSent, destination }}
//     } catch (error) {
//         return { success: false, error: error.message}
//     }
// }

// const handleSignin = async ({username,password}) => {

//     try {
//         const { isSignedIn, nextStep } = await signIn({
//             username,
//             password
//         });
//         return { success: true, data: { isSignedIn, nextStep } };
//     } catch ( error ) { 
//         return {success: false, error: error.message}
//     }

// }



// const handleResetPassword = async ({email}) => {
//     try {
//         const { nextStep } = await resetPassword({
//             username:email
//         })
//         return { success: true, data: { nextStep }}
//     } catch ( error ) {
//         return { success: false, error: error.message}
//     }

// };

// const handleConfirmResetPassword = async ({email, newPassword, verificationCode}) => {
//  try { 
//     await confirmResetPassword({
//         username: email,
//         newPassword,
//         confirmationCode: verificationCode
//     })
//     return { success: true }
//  } catch (error) {
//     return { success: false, error: error.message}
//  }
// }

// const handleSignout = async () => {
//     try {
//         await signOut();
//         localStorage.clear();
//         sessionStorage.clear();
//         return { success: true };

//     } catch ( error ) { 
//         return { success: false, error: error.messagen }
//     }
// }

// const handleGetCurrentUser = async () => {
//     try {
//         const user = await getCurrentUser();
//         return { success: true, data: { user }}
//     } catch ( error ) {
//         return { success: false, error: error.message }
//     }

// }
// const checkAuthState = async (setUserState) => {
//     try {
//         const currentUser = await getCurrentUser();
//         if (currentUser) {
//             const session = await fetchAuthSession();
//             const userData = await handleGetCurrentUser();

//             setUserState({
//                 user: userData.data.user,
//                 idToken: session.tokens.idToken,
//                 accessToken: session.tokens.accessToken,
//                 refreshToken: session.tokens.refreshToken
//             });

//             return true; // User is authenticated
//         }
//         return false; // No authenticated user
//     } catch (error) {
//         console.log("No authenticated user");
//         return false;
//     }
// };

// export { 
//     handleSignup,
//     handleConfirmSignup,
//     handleResendSignupCode,
//     handleSignin,
//     resendSignUpCode,
//     handleResetPassword,
//     handleConfirmResetPassword,
//     handleSignout,
//     handleGetCurrentUser,
//     checkAuthState
// }

import { 
    signIn, 
    signUp, 
    resendSignUpCode, 
    resetPassword, 
    confirmResetPassword, 
    getCurrentUser, 
    confirmSignUp,
    signOut,
    fetchAuthSession
  } from "aws-amplify/auth";
  
  /**
   * Handle user signup with custom attributes
   * @param {Object} params
   * @param {string} params.email - User's email
   * @param {string} params.password - User's password
   * @param {string} params.userType - Type of user (e.g., 'admin', 'customer')
   * @param {string} params.portal - Portal identifier (optional)
   */
  const handleSignup = async ({ email, password, userType, portal }) => {
    try {
      const { isSignUpComplete, userId } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            'custom:userType': userType,
          }
        }
      });
      return { success: true, data: { isSignUpComplete, userId } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleConfirmSignup = async ({ email, verificationCode }) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: verificationCode
      });
      return { success: true, data: { isSignUpComplete } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleResendSignupCode = async ({ email }) => {
    try {
      const { codeSent, destination } = await resendSignUpCode({
        username: email,
      });
      return { success: true, data: { codeSent, destination } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleSignin = async ({ username, password }) => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username,
        password
      });
      return { success: true, data: { isSignedIn, nextStep } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleResetPassword = async ({ email }) => {
    try {
      const { nextStep } = await resetPassword({
        username: email
      });
      return { success: true, data: { nextStep } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleConfirmResetPassword = async ({ email, newPassword, verificationCode }) => {
    try {
      await confirmResetPassword({
        username: email,
        newPassword,
        confirmationCode: verificationCode
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleSignout = async () => {
    try {
      await signOut();
      localStorage.clear();
      sessionStorage.clear();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  const handleGetCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      return { success: true, data: { user } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  /**
   * Check authentication state and get user attributes including custom attributes
   * @param {Function} setUserState - State setter function
   */
  const checkAuthState = async (setUserState) => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const session = await fetchAuthSession();
        const userData = await handleGetCurrentUser();
        
        // Extract custom attributes
        const userType = currentUser.signInUserSession?.idToken?.payload['custom:userType'];
        const portal = currentUser.signInUserSession?.idToken?.payload['custom:portal'];
  
        setUserState({
          user: userData.data.user,
          idToken: session.tokens.idToken,
          accessToken: session.tokens.accessToken,
          refreshToken: session.tokens.refreshToken,
          userType,
          portal
        });
  
        return true;
      }
      return false;
    } catch (error) {
      console.log("No authenticated user");
      return false;
    }
  };
  
  export {
    handleSignup,
    handleConfirmSignup,
    handleResendSignupCode,
    handleSignin,
    resendSignUpCode,
    handleResetPassword,
    handleConfirmResetPassword,
    handleSignout,
    handleGetCurrentUser,
    checkAuthState
  };
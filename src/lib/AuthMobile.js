import { signIn, signUp, confirmSignUp, confirmSignIn, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

/**
 * Handles mobile sign-in/sign-up process
 * @param {Object} params
 * @param {string} params.phoneNumber
 * @returns {Promise<{success: boolean, isNewUser?: boolean, data?: any, error?: string}>}
 * 
 * AWS Amplify Response Examples:
 * signIn Response: {
 *   nextStep: {
 *     signInStep: 'CONFIRM_SIGN_IN_WITH_SMS_CODE',
 *     codeDeliveryDetails: {
 *       destination: '+91********99',
 *       deliveryMedium: 'SMS',
 *       attributeName: 'phone_number'
 *     }
 *   }
 * }
 * 
 * signUp Response: {
 *   isSignUpComplete: false,
 *   nextStep: {
 *     signUpStep: 'CONFIRM_SIGN_UP',
 *     codeDeliveryDetails: {
 *       destination: '+91********99',
 *       deliveryMedium: 'SMS',
 *       attributeName: 'phone_number'
 *     }
 *   }
 * }
 */
const handleMobileSignin = async ({ phoneNumber }) => {
    try {
        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
        const defaultPassword = 'Password@123';  // Simple valid password

        try {
            const { nextStep } = await signIn({
                username: formattedPhoneNumber,
                password: defaultPassword,
                options: {
                    authFlowType: "CUSTOM_WITH_SMS"
                }
            });

            return { success: true, isNewUser: false, data: nextStep };

        } catch (error) {
            if (error.message.includes('User does not exist')) {
                const { isSignUpComplete, nextStep } = await signUp({
                    username: formattedPhoneNumber,
                    password: defaultPassword,
                    options: {
                        userAttributes: {
                            phone_number: formattedPhoneNumber
                        },
                        autoSignIn: true
                    }
                });

                return { success: true, isNewUser: true, data: nextStep };
            }
            throw error;
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
/**
 * Handles OTP verification for both new and existing users
 * @param {Object} params
 * @param {string} params.phoneNumber
 * @param {string} params.otp
 * @param {boolean} params.isNewUser
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * 
 * AWS Amplify Response Examples:
 * confirmSignUp Response: void (throws error if unsuccessful)
 * 
 * confirmSignIn Response: {
 *   isSignedIn: true,
 *   nextStep: {
 *     signInStep: 'DONE'
 *   }
 * }
 * 
 * fetchAuthSession Response: {
 *   tokens: {
 *     accessToken: string,
 *     idToken: string,
 *     refreshToken: string
 *   }
 * }
 */
const handleOtpVerification = async ({ phoneNumber, otp, isNewUser }) => {
    try {
        const formattedPhoneNumber = phoneNumber.includes('+91') ? phoneNumber : `+91${phoneNumber}`;
        
        if (isNewUser) {
            await confirmSignUp({
                username: formattedPhoneNumber,
                confirmationCode: otp
            });
        }
        
        const { isSignedIn } = await confirmSignIn({
            challengeResponse: otp
        });

        if (isSignedIn) {
            const session = await fetchAuthSession();
            return {
                success: true,
                data: {
                    isSignedIn,
                    session
                }
            };
        }
        
        return {
            success: false,
            error: 'Sign in failed'
        };
    } catch (error) {
        return { success: false, error: error.message };  // Fixed: typo in 'error'
    }
};

/**
 * Resends OTP to the provided phone number
 * @param {Object} params
 * @param {string} params.phoneNumber
 * @returns {Promise<{success: boolean, error?: string}>}
 */

const handleResendOtp = async ({ phoneNumber }) => {
    const formattedPhoneNumber = phoneNumber.includes('+91') ? phoneNumber : `+91${phoneNumber}`;
    try {
        await signIn({
            username: formattedPhoneNumber,
            password: 'Password@123',  // Same default password
            options: {
                authFlowType: 'CUSTOM_WITH_SMS'
            }
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

/**
 * Gets the current authenticated user
 * @returns {Promise<{success: boolean, data?: {user: any}, error?: string}>}
 * 
 * AWS Amplify getCurrentUser Response Example: {
 *   username: string,
 *   userId: string,
 *   signInDetails: {
 *     loginId: string,
 *     authFlowType: string
 *   }
 * }
 */
const handleGetCurrentMobileUser = async () => {
    try {
        const currentUser = await getCurrentUser();
        return {
            success: true,
            data: {
                user: currentUser
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Checks and updates the current auth state
 * @param {Function} setUserState - Function to update auth state
 * @returns {Promise<boolean|{success: boolean, error: string}>}
 */
const checkMobileAuthState = async (setUserState) => {  // Fixed: Added missing setUserState parameter
    try {
        const session = await fetchAuthSession();
        const userData = await handleGetCurrentMobileUser();
        
        if (userData.success) {
            setUserState({
                user: userData.data.user,
                idToken: session.tokens.idToken,
                accessToken: session.tokens.accessToken,
                refreshToken: session.tokens.refreshToken
            });
            return true;
        }
        return false;
    } catch (error) {
        console.log("No authenticated user");
        return { success: false, error: error.message };
    }
};

export {
    handleMobileSignin,
    handleOtpVerification,
    handleResendOtp,
    handleGetCurrentMobileUser,
    checkMobileAuthState
};
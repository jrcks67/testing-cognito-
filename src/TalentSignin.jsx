import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { 
    handleMobileSignin, 
    handleOtpVerification, 
    handleResendOtp,
    checkMobileAuthState 
} from "./lib/AuthMobile";

const TalentAuth = () => {
    const navigate = useNavigate();
    const { setUserState } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [error, setError] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const isAuthenticated = await checkMobileAuthState(setUserState);
            if (isAuthenticated === true) {
                navigate("/dashboard");
            }
        };
        init();
    }, []);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await handleMobileSignin({ phoneNumber });
            
            if (result.success) {
                setIsNewUser(result.isNewUser);
                setShowOtpInput(true);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await handleOtpVerification({
                phoneNumber,
                otp,
                isNewUser
            });

            if (result.success) {
                const isAuthenticated = await checkMobileAuthState(setUserState);
                if (isAuthenticated === true) {
                    navigate("/dashboard");
                }
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtpClick = async () => {
        setError("");
        setIsLoading(true);

        try {
            const result = await handleResendOtp({ phoneNumber });
            if (!result.success) {
                setError(result.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button
                        type="button"
                        onClick={handleResendOtpClick}
                        disabled={isLoading}
                        className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                    >
                        Resend OTP
                    </button>
                </form>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                    <p className="text-sm">{error}</p>
                </div>
            )}
        </div>
    );
};

export default TalentAuth;
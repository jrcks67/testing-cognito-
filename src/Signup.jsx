import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup, handleConfirmSignup, handleResendSignupCode } from "./lib/Auth";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await handleSignup({
        email: form.email,
        password: form.password,
        userType: "employer"
      });

      if (result.success) {
        setShowVerification(true);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await handleConfirmSignup({
        email: form.email,
        verificationCode
      });

      if (result.success) {
        navigate("/signin");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await handleResendSignupCode({
        email: form.email
      });

      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6">
        <h2 className="text-2xl mb-4">Verify Your Email</h2>
        <p className="mb-4">Please enter the verification code sent to {form.email}</p>
        
        <form onSubmit={handleVerification} className="space-y-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full p-2 border rounded"
            disabled={loading}
            required
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={loading}
            className="w-full p-2 text-blue-500 disabled:text-blue-300"
          >
            Resend Code
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="bob@sampledomain.com"
            className="w-full p-2 border rounded"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="abcnefg1234"
            className="w-full p-2 border rounded"
            disabled={loading}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">Error: {error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="text-blue-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
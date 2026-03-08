"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ submit: result.error });
        toast.error(result.error);
        setIsLoading(false);
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      const message = error.message || "Failed to login";
      setErrors({ submit: message });
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        console.error("Google sign-in error:", result.error);
        let errorMessage = "Failed to login with Google";

        if (result.error.includes("OAuthSignin")) {
          errorMessage =
            "Google OAuth configuration error. Please check environment variables.";
        } else if (result.error.includes("OAuthCallback")) {
          errorMessage =
            "Google callback error. Check redirect URI in Google Cloud Console.";
        } else if (result.error.includes("EmailSigninError")) {
          errorMessage = "Error with Google email. Please try again.";
        }

        setErrors({ submit: errorMessage });
        toast.error(errorMessage);
      } else if (result?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Google sign-in exception:", error);
      toast.error(
        "Unexpected error during Google login. Check browser console.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Login to CivicFix
            </h1>

            {errors.submit && (
              <div className="alert alert-error mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m6-2l2-2m0 0l2-2m-2 2l2-2m-2 2l-2 2"
                  />
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  disabled={isLoading}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full mt-6 text-white font-semibold"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="divider my-4">OR</div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="link link-primary font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

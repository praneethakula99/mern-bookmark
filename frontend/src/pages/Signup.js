import React, { useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        navigate("/dashboard");
      }
    };

    checkUser();
  }, [navigate]);

  const signupWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://mern-bookmark.vercel.app/dashboard",
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Create Account</h2>

      <button
        className="btn btn-danger mt-3"
        onClick={signupWithGoogle}
      >
        Sign up with Google
      </button>

      <p className="mt-3 text-muted">
        We use Google authentication for secure access.
      </p>
    </div>
  );
};

export default Signup;

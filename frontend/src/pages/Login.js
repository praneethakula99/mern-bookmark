import React, { useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login</h2>

      <button
        className="btn btn-danger mt-3"
        onClick={loginWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;

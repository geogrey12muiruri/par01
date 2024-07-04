import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSpring, animated } from "react-spring";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();  
  const [showLoginForm, setShowLoginForm] = useState(false);

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
  
        // Store the user data (including role) in your state management or context
        localStorage.setItem('authUser', JSON.stringify(data));
  
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      console.log("onSuccess called");
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      console.log("Auth User Role:", authUser.role);
      if (authUser.role === "admin") {
        console.log("Redirecting to dashboard");
        navigate("/dashboard"); // Use navigate instead of history.push
      } else {
        console.log("Redirecting to home");
        navigate("/"); // Use navigate instead of history.push
      }
    },
  
  });

  // Spring animation config for the elements
  const signUpAnimation = useSpring({
    opacity: showLoginForm ? 1 : 0,
    transform: showLoginForm ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 300, friction: 20 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetStartedClick = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
        {/* Logo */}
        <div className={`mt-16 ${showLoginForm ? "hidden" : "block"}`}>
          <img
            src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1719742729/logo1_lwsavr.png"
            alt="logo"
            className="w-48 md:w-64"
          />
        </div>

        {/* Get Started Button */}
        {!showLoginForm && (
          <button
            onClick={handleGetStartedClick}
            className="text-white bg-gradient-to-br mt-20 from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Get Started
          </button>
        )}

        {/* Login Form */}
        {showLoginForm && (
          <form
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={handleSubmit}
          >
            <img
              src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1719742729/logo1_lwsavr.png"
              alt="logo"
              className="w-48 md:w-64"
            />
            <h1 className="text-xl font-extrabold">PineHouse Suits You</h1>
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdOutlineMail />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>

            <label className="input input-bordered rounded flex items-center gap-2">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>
            <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              {isPending ? "Loading..." : "Login"}
            </button>

            {isError && <p className="text-red-500">{error.message}</p>}
          </form>
        )}

        {/* Animated Sign Up Link */}
        <animated.div style={signUpAnimation} className="mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Sign up
            </button>
          </Link>
        </animated.div>
      </div>
    </div>
  );
};

export default LoginPage;

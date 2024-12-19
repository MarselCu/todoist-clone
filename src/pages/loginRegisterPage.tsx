import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Input from "../components/input/Input";
import { googleIcon, facebookIcon, appleIcon } from "../assets/icons";
import { useState } from "react";

interface SocialAuthButton {
  text: string;
  icon: string;
  onClick: () => void;
}
const socialAuthButtons: SocialAuthButton[] = [
  {
    text: "Continue with Google",
    icon: googleIcon,
    onClick: () => {},
  },
  {
    text: "Continue with Facebook",
    icon: facebookIcon,
    onClick: () => {},
  },
  {
    text: "Continue with Apple",
    icon: appleIcon,
    onClick: () => {},
  },
];
const LoginRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const isLogin = slug === "login";

  if (slug !== "login" && slug !== "signup") {
    return <Navigate to="/404" />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (slug === "signup") {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setEmail("");
      setPassword("");
      alert("Please login again");
      return navigate("/auth/login");
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail === email && storedPassword === password) {
      return navigate("/");
    }

    alert("Invalid email or password");
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 flex flex-col gap-4">
          {/* title */}
          <h1 className="text-3xl font-bold">
            {slug === "login" ? "Log in" : "Sign Up"}
          </h1>
          <div className="p-1"></div>

          {/* body */}
          <div className="flex flex-col gap-3 w-96 h-fit">
            {socialAuthButtons.map((button, index) => (
              <Link
                to=""
                key={index}
                onClick={button.onClick}
                className="flex items-center justify-center px-4 h-12 border cursor-pointer hover:bg-cyan-50 no-underline"
              >
                <img
                  src={button.icon}
                  alt="social icon"
                  className="w-4 h-4 mr-2.5 ml-1.5"
                />
                <span className="font-bold text-lg">{button.text}</span>
              </Link>
            ))}
          </div>
          <hr className="border-transparent" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                id="LoginEmail"
                type="email"
                label="Email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                id="LoginPassword"
                type="password"
                label="Password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button className="px-4 h-12 rounded-lg bg-red-500 text-white font-bold text-lg">
                {slug === "login" ? "Log in" : "Sign Up with Email"}
              </button>
            </div>
          </form>

          {/* footer */}
          {slug === "login" && (
            <div className="text-xs text-slate-700">
              <a href="">Forgot your password?</a>
            </div>
          )}

          <div className="flex gap-1 flex-wrap text-xs text-slate-700">
            <span>
              By continuing with Google, Apple, or Email, you agree to TodoList
            </span>
            <Link to="">Terms of Service</Link>
            <span>and</span>
            <Link to="">Privacy Policy</Link>
          </div>
          <hr className="border-transparent" />
          <div className="flex justify-center gap-1 flex-wrap text-xs text-slate-700">
            {isLogin ? (
              <>
                Don't have an account?
                <Link to="/auth/signup">Sign Up</Link>
              </>
            ) : (
              <>
                Already signed up?
                <Link to="/auth/login">Go to login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegisterPage;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputCustom } from "@/components/ui/input-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity whenever email or password changes
  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // In a real app, we would authenticate the user
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-white">

      <div className="text-center mt-4 mb-6">
        <h1 className="text-2xl font-bold mb-1 text-[#304352]">SIGN IN</h1>
        <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
      </div>
      
      <div className="flex justify-center my-8">
        <h2 className="text-xl font-bold text-petapp-orange">ANABULKU</h2>
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-gray-700 mb-1">Email</p>
          <input
            type="email"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-petapp-green"
            placeholder="Input your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="text-sm text-gray-700 mb-1">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-petapp-green"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button type="button" className="text-sm text-gray-500">
            Forgot password?
          </button>
        </div>

        <ButtonCustom 
          type="submit" 
          disabled={!isFormValid}
          className={`mt-2 rounded-lg ${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-petapp-green text-white'}`}
          fullWidth
        >
          Sign In
        </ButtonCustom>

        <div className="relative mt-2 mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18" height="18">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <div className="text-center mt-6 mb-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-petapp-green font-bold">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Bottom indicator dot */}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-black rounded-full"></div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

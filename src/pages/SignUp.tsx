
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthRedirect } from "@/components/AuthRedirect";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;
    
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const { error } = await signUp(email, password, {});
        if (error) throw error;
      } catch (error: any) {
        console.error("Error signing up:", error.message);
        // Here you could add error handling, like displaying an error message
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-white">
      <AuthRedirect />

      <div className="text-center mt-4 mb-6">
        <h1 className="text-2xl font-bold mb-1 text-[#304352]">SIGN UP</h1>
        <p className="text-gray-500 text-sm">Enter your information to create an account</p>
      </div>
      
      <div className="flex justify-center my-8">
        <h2 className="text-xl font-bold text-petapp-orange">ANABULKU</h2>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
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
          Sign up
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
          onClick={() => signInWithGoogle()}
        >
          <img src="/lovable-uploads/google-logo.png" alt="Google" className="w-5 h-5" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyWiIgZmlsbD0icmVkIi8+PC9zdmc+";
            }}
          />
          <span>Sign up with Google</span>
        </button>

        <div className="text-center mt-6 mb-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-petapp-green font-bold">
              Sign in
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

export default SignUp;

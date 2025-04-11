
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputCustom } from "@/components/ui/input-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would register the user
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="text-center mb-8 mt-8">
        <h1 className="text-2xl font-bold mb-2">SIGN UP</h1>
        <p className="text-gray-500 text-sm">Create your account to access our services</p>
        
        <div className="flex justify-center my-4">
          <h2 className="text-xl font-bold text-petapp-green">ANABULKU</h2>
        </div>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <InputCustom
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputCustom
          label="Password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="text-right mb-2">
          <button type="button" className="text-sm text-gray-500">
            Forgot password?
          </button>
        </div>

        <ButtonCustom type="submit" fullWidth>
          Sign Up
        </ButtonCustom>

        <div className="relative mt-2 mb-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <ButtonCustom
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <Mail className="h-4 w-4" />
          <span>Sign up with Google</span>
        </ButtonCustom>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-petapp-green font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/slices/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, logoImg, Button, Container, Loader } from ".";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register,handleSubmit} = useForm();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
      toast.success("Logged in Successfully")
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  
  return (
    !loading ? (
    <div className="flex items-center justify-center w-full">
        <Container>
            <div className={`mx-auto w-full max-w-lg bg-white/50 backdrop-blur 
            shadow-[0_0px_10px_rgba(0,0,0,0.3)] rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={logoImg} width="100%"/>
                    </span>
                </div>

                <h2 className="text-center text-slate-800 text-2xl font-bold leading-tight">Sign in to your account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to="/signup"
                    className="font-medium text-indigo-600 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {
                    error && <p className="text-red-700 mt-8 text-center font-semibold">{error}</p>
                }

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="">
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email",{
                            required:true,
                            validate:{
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <div className="w-full text-right text-gray-600"><span className="italic">Test Email </span>: test@mail.com</div>

                        <div className="w-full relative">
                          <Input
                          label="Password: "
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("password", {
                              required: true,
                          })}
                          />
                          <span onClick={() => setShowPassword((prev)=>!prev)}
                          className="absolute right-3 top-[38px] cursor-pointer">
                              {showPassword ? 
                              <AiOutlineEyeInvisible fontSize={24} fill="#3e3e3e"/> : 
                              <AiOutlineEye fontSize={24} fill="#3e3e3e"/> }
                          </span>
                        </div>
                        <div className="w-full text-right text-gray-600"><span className="italic">Test Password </span>: 12345678</div>

                        <Button
                        type="submit"
                        className="w-full mt-2"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </Container>
    </div>
    ) :
    (
    <Loader/>
    )
  );
};

export default Login;

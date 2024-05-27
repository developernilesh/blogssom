import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, logoImg, Button, Container, Loader } from ".";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const signUp = async(data) => {
    setError("")
    setLoading(true)
    try {
        const session = await authService.createAccount(data)
        if(session){
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(login(userData))
            navigate("/")
        }

        toast.success('Account created successfully')
    } 
    catch (error) {
        setError(error.message)
    }
    setLoading(false)
  }
  return (
    !loading ? (
    <div className="flex items-center justify-center">
        <Container>
            <div className={`mx-auto w-full max-w-lg bg-white/50 
            shadow-[0_0px_6px_rgba(0,0,0,0.3)] rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={logoImg} width="100%"/>
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                    to="/login"
                    className="font-medium text-indigo-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {
                    error && <p className="text-red-600 mt-8 text-center">{error}</p>
                }

                <form onSubmit={handleSubmit(signUp)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />

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

                        <Button
                        type="submit"
                        className="w-full"
                        >Sign up</Button>
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

export default Signup;

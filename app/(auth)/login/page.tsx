"use client";

import { Context } from "@/context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Loader from "../components/designs/Loader";


type FormData = {
  email: string,
  password: string
}

const LoginPage = () => {

  const [formdata, setFormdata] = useState<FormData>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { setUser, setIsloggedin } = useContext(Context)
  const router = useRouter()
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })

  }
  const handlesubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      axios.defaults.withCredentials = true
      const { data } = await axios.post("api/auth/login", {
        email: formdata.email,
        password: formdata.password
      })
      if (data.success) {
        // Context update
        setUser(data.user)
        setIsloggedin(true)
        setLoading(false)
        // Role-based redirect
        if (data.user.role === "student") router.push("/student")
        else if (data.user.role === "admin") router.push("/admin")
      } else {
        alert(data.message)
      }

    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <Link href="/" className="absolute top-8 left-8 btn btn-ghost btn-circle">
        <ArrowLeft />
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-base-200 p-10 rounded-[2.5rem] shadow-2xl border border-white/5"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-sm text-base-content/60">Login to access your dashboard</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handlesubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="email"
                name='email'
                onChange={handlechange}
                value={formdata.email}
                placeholder="email@example.com"
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="password"
                placeholder="••••••••"
                value={formdata.password}
                name="password"
                onChange={handlechange}
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium px-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-xs checkbox-primary rounded" />
              Remember me
            </label>
            <Link href="#" className="text-primary hover:underline">Forgot Password?</Link>
          </div>


          {loading ? (<button className="primary-btn py-4 text-lg mt-4 flex items-center justify-center gap-2" type="submit">
            <Loader />
          </button>) : (<button className="primary-btn py-4 text-lg mt-4 flex items-center justify-center gap-2" type="submit">
            <LogIn className="w-5 h-5" />
            Login
          </button>)}

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;

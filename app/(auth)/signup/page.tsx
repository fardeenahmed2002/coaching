"use client";

import Loader from "@/app/(main)/components/designs/Loader";
import { Context } from "@/context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  studentClass: number | "";
  role: string;
  img: string;
};

const SignupPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isloading, setIsloading] = useState<boolean>(false);
  const { setUser, setIsloggedin } = useContext(Context);
  const router = useRouter();
  const [formdata, setFormdata] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    studentClass: "",
    role: "student",
    img: "",
  });

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormdata({ ...formdata, studentClass: Number(e.target.value) });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormdata({ ...formdata, img: url });
    }
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const form = new FormData();
      Object.entries(formdata).forEach(([key, value]) => form.append(key, value.toString()));

      const { data } = await axios.post("/api/auth/signup", form, { withCredentials: true });

      if (data.success) {
        // Context আপডেট
        setUser(data.user);
        setIsloggedin(true);

        // Role-based redirect
        if (data.user.role === "student") router.push("/student");
        else if (data.user.role === "admin") router.push("/admin");
      } else {
        alert(data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-sm text-base-content/60">Join Rashed's Academy today</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
                required
              />
            </div>
          </div>

          {/* Class */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">
              Select Class
            </label>
            <select
              name="studentClass"
              value={formdata.studentClass || ""}
              onChange={handleClassChange}
              className="select w-full rounded-2xl bg-base-100 focus:outline-primary border-none shadow-inner"
              required
            >
              <option value="" disabled>
                Choose class
              </option>
              {[6, 7, 8, 9, 10, 11].map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">
              Profile Image
            </label>
            <label className="cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-base-content/20 rounded-2xl p-6 hover:border-primary transition">
                {preview ? (
                  <img src={preview} alt="preview" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <>
                    <ImagePlus className="w-6 h-6 opacity-40" />
                    <p className="text-xs opacity-50">Click to upload image</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" hidden onChange={handleImage} />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="primary-btn py-4 text-lg mt-4 flex items-center justify-center gap-2"
          >
            {isloading ? <Loader /> : "Create Account"}
          </button>

          {/* Login link */}
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;
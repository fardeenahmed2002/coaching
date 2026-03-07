"use client";

import { Context } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, LogIn, LogOut, Menu, Moon, Sun, X, } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ScreenLoader from "./designs/ScreenLoader";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isloggedin, setIsloggedin, setUser, user } = useContext(Context)
  const [loading, setIsloading] = useState<boolean>(false)

  const navigate = useRouter()

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("courses"), path: "/courses" },
    { name: t("notices"), path: "/notices" },
    { name: t("notes"), path: "/notes" },
  ];
  const logout = async (): Promise<void> => {
    setIsloading(true)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post('/api/auth/logout')
      if (data.success) {
        setIsloggedin(false)
        setIsloading(false)
        setUser(false)
        navigate.push('/')
      }
    } catch (error) {
      console.log((error as Error).message)
    }
    finally {
      setIsloading(false)
    }
  }
  return (
    <>
      {loading && <ScreenLoader />}
      <nav className="glass-nav px-4 lg:px-16 py-4 flex items-center justify-between bg-base-100/80">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
          Rashed&apos;s Academy
        </Link>

        {/* Desktop Menu */}
        {user?.role === "student" && isloggedin && (<div>
          <Link href={"/student/exam"}> give exam </Link>
        </div>)}
        {user?.role === "admin" && isloggedin && (<div>
          <Link href={"/admin/qusmake"}> make qus </Link>
        </div>)}

        {user?.role !== "student" && user?.role !== "admin" && (
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "EN" ? "BN" : "EN")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <Globe className="w-4 h-4" />
            {language}
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle btn-sm">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Login Button */}

          {
            isloggedin ? (
              <button
                className="primary-btn flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="flex items-center primary-btn px-3">
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <span className="mx-2 opacity-60">|</span>

                <Link href="/signup" className="flex items-center gap-1">
                  <LogIn className="w-4 h-4" />
                  SignUp
                </Link>
              </div>
            )
          }
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden btn btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-base-100 border-b border-white/10 p-6 flex flex-col gap-6 lg:hidden shadow-2xl"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setLanguage(language === "EN" ? "BN" : "EN")}
                  className="btn btn-ghost gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language}
                </button>
                <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
                  {theme === "light" ? <Moon /> : <Sun />}
                </button>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  Signup
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav> </>

  );
};

export default Navbar;

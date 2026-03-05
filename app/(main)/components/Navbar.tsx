"use client";

import { Context } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, LogIn, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isloggedin } = useContext(Context)
  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("courses"), path: "/courses" },
    { name: t("notices"), path: "/notices" },
    { name: t("notes"), path: "/notes" },
  ];

  return (
    <nav className="glass-nav px-4 lg:px-16 py-4 flex items-center justify-between bg-base-100/80">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
        Rashed&apos;s Academy
      </Link>

      {/* Desktop Menu */}
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

        <Link href="/login" className="primary-btn flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          {isloggedin ? "Logout" : t("login")}
        </Link>
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
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="primary-btn text-center"
            >
              {t("login")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

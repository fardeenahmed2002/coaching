"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { name: t("home"), path: "/" },
    { name: t("courses"), path: "/courses" },
    { name: t("notices"), path: "/notices" },
    { name: t("notes"), path: "/notes" },
  ];

  return (
    <footer className="bg-dark-bg text-white py-16 px-4 lg:px-16 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            Rashed&apos;s Academy
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Empowering students with quality education and modern learning techniques. Join us to shape your future.
          </p>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <div className="flex flex-col gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-sm text-white/60 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Phone className="w-4 h-4 text-primary" />
              +880 1234 567890
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <Mail className="w-4 h-4 text-primary" />
              info@rashedsacademy.com
            </div>
            <div className="flex items-center gap-3 text-sm text-white/60">
              <MapPin className="w-4 h-4 text-primary" />
              Dhaka, Bangladesh
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold">Newsletter</h3>
          <p className="text-sm text-white/60">Subscribe to get the latest updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
            />
            <button className="primary-btn px-4 py-2">Join</button>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Rashed&apos;s Academy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

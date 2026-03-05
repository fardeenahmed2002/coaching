"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const FollowUs = () => {
  const { t } = useLanguage();

  const socials = [
    { icon: <FaFacebookF />, color: "bg-[#1877F2]", label: "Facebook" },
    { icon: <FaYoutube />, color: "bg-[#FF0000]", label: "YouTube" },
    { icon: <FaInstagram />, color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", label: "Instagram" },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-100 text-center">
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("followUs")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {socials.map((social, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-20 h-20 rounded-3xl ${social.color} text-white text-3xl flex items-center justify-center shadow-lg hover:shadow-primary/20 transition-all`}
          >
            {social.icon}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default FollowUs;

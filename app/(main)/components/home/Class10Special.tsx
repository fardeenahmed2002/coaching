"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Award, BookOpen } from "lucide-react";

const Class10Special = () => {
  const { t } = useLanguage();

  const cards = [
    { icon: <Star className="w-8 h-8" />, title: "SSC Preparation", desc: "Intensive coaching for SSC candidates." },
    { icon: <Award className="w-8 h-8" />, title: "Model Tests", desc: "Regular model tests to track progress." },
    { icon: <BookOpen className="w-8 h-8" />, title: "Special Notes", desc: "Curated notes for all major subjects." },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-dark-bg text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("class10Special")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors"
          >
            <div className="text-primary mb-6">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-white/60 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Class10Special;

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Crown, Target, Zap } from "lucide-react";

const HSCFeatured = () => {
  const { t } = useLanguage();

  const courses = [
    { title: "HSC Physics Premium", price: "$99", icon: <Zap /> },
    { title: "HSC Chemistry Elite", price: "$89", icon: <Crown /> },
    { title: "HSC Math Mastery", price: "$95", icon: <Target /> },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("hscFeatured")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2rem] border border-primary/20 overflow-hidden group"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />

            <div className="text-primary mb-8 scale-150 origin-left">
              {course.icon}
            </div>

            <h3 className="text-3xl font-bold mb-4">{course.title}</h3>
            <div className="text-4xl font-black text-primary mb-8">{course.price}</div>

            <button className="primary-btn w-full py-4 text-lg">
              {t("enrollNow")}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HSCFeatured;

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Globe, Shield, Zap } from "lucide-react";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: "Fast Learning", desc: "Accelerated learning techniques to help you master subjects quickly." },
    { icon: <Shield className="w-8 h-8" />, title: "Expert Guidance", desc: "Learn from the best instructors with years of experience." },
    { icon: <Globe className="w-8 h-8" />, title: "Global Access", desc: "Access your courses from anywhere in the world, anytime." },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("whyChooseUs")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-10 bg-base-200 rounded-3xl border border-white/5 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-base-content/60 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

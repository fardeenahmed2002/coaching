"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const NoticesPage = () => {
  const { t } = useLanguage();

  const notices = [
    { title: "SSC 2026 Model Test Schedule", date: "Oct 25, 2025", desc: "The model test for SSC 2026 batch will start from November 1st. Check the full schedule here." },
    { title: "New HSC Batch Admission Open", date: "Oct 20, 2025", desc: "Admission for the new HSC 2027 batch is now open. Early bird discounts available." },
    { title: "Special Class on Organic Chemistry", date: "Oct 15, 2025", desc: "A special 4-hour marathon class on Organic Chemistry will be held this Friday." },
    { title: "Vacation Notice: Eid-ul-Fitr", date: "Oct 10, 2025", desc: "The academy will remain closed for 7 days on the occasion of Eid-ul-Fitr." },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      <main className="grow py-24 px-4 lg:px-16 bg-base-100">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t("notices")}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {notices.map((notice, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-8 bg-base-200 rounded-3xl border border-white/5 hover:border-primary/20 transition-colors"
            >
              <div className="shrink-0">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex flex-col items-center justify-center text-primary">
                  <Calendar className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-xl font-bold">25</span>
                </div>
              </div>
              <div className="grow">
                <h3 className="text-2xl font-bold mb-3">{notice.title}</h3>
                <p className="text-base-content/60 mb-6 leading-relaxed">
                  {notice.desc}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                  {t("readMore")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default NoticesPage;

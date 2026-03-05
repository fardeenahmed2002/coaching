"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Book, Download } from "lucide-react";

const NotesPage = () => {
  const { t } = useLanguage();

  const subjects = [
    { name: "Physics", count: 12, icon: <Book className="text-blue-500" /> },
    { name: "Chemistry", count: 15, icon: <Book className="text-emerald-500" /> },
    { name: "Mathematics", count: 20, icon: <Book className="text-orange-500" /> },
    { name: "Biology", count: 10, icon: <Book className="text-pink-500" /> },
    { name: "English", count: 8, icon: <Book className="text-indigo-500" /> },
    { name: "ICT", count: 5, icon: <Book className="text-purple-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      <main className="grow py-24 px-4 lg:px-16 bg-base-100">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t("notes")}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-base-200 rounded-4xl border border-white/5 card-hover group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {subject.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-primary">{subject.count}</div>
                  <div className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Files</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-8">{subject.name}</h3>
              <button className="btn btn-outline btn-primary w-full rounded-full gap-2 group-hover:bg-primary group-hover:text-dark-bg transition-all">
                <Download className="w-4 h-4" />
                {t("download")}
              </button>
            </motion.div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default NotesPage;

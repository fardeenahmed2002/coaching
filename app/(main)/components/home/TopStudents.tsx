"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const TopStudents = () => {
  const { t } = useLanguage();

  const students = [
    { name: "Arif Hossain", badge: "GPA 5.00", img: "https://picsum.photos/seed/s1/200/200" },
    { name: "Sumaiya Akter", badge: "Gold Medalist", img: "https://picsum.photos/seed/s2/200/200" },
    { name: "Rakib Hasan", badge: "Top Scorer", img: "https://picsum.photos/seed/s3/200/200" },
    { name: "Nusrat Jahan", badge: "Best Performer", img: "https://picsum.photos/seed/s4/200/200" },
    { name: "Tanvir Ahmed", badge: "HSC Topper", img: "https://picsum.photos/seed/s5/200/200" },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-200 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("topStudents")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="flex flex-nowrap md:flex-wrap gap-8 overflow-x-auto pb-8 md:justify-center no-scrollbar">
        {students.map((student, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-64 bg-base-100 p-8 rounded-3xl text-center card-hover"
          >
            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-secondary/20">
              <Image
                src={student.img}
                alt={student.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-lg font-bold mb-2">{student.name}</h3>
            <div className="badge badge-secondary badge-outline">{student.badge}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopStudents;

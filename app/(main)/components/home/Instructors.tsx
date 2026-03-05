"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

const Instructors = () => {
  const { t } = useLanguage();

  const instructors = [
    { name: "Rashed Ahmed", role: "Founder & Lead Instructor", img: "https://picsum.photos/seed/rashed/400/400" },
    { name: "Sarah Khan", role: "Mathematics Expert", img: "https://picsum.photos/seed/sarah/400/400" },
    { name: "John Doe", role: "Physics Specialist", img: "https://picsum.photos/seed/john/400/400" },
    { name: "Emily Chen", role: "Chemistry Instructor", img: "https://picsum.photos/seed/emily/400/400" },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-200">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("meetInstructors")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {instructors.map((instructor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="card bg-base-100 overflow-hidden card-hover"
          >
            <div className="relative h-64 w-full">
              <Image
                src={instructor.img}
                alt={instructor.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
              <p className="text-sm text-base-content/60 mb-6">{instructor.role}</p>
              <button className="btn btn-primary btn-sm rounded-full w-full">
                {t("viewProfile")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const FreeCourses = () => {
  const { t } = useLanguage();

  const courses = [
    { title: "Basic English Grammar", desc: "Master the fundamentals of English grammar.", img: "https://picsum.photos/seed/grammar/200/200" },
    { title: "Mathematics for Beginners", desc: "Build a strong foundation in math.", img: "https://picsum.photos/seed/math/200/200" },
    { title: "Introduction to Physics", desc: "Explore the laws of nature.", img: "https://picsum.photos/seed/physics/200/200" },
    { title: "Chemistry Basics", desc: "Understand the elements and reactions.", img: "https://picsum.photos/seed/chemistry/200/200" },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-200">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("freeCourses")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="card bg-base-100 p-8 card-hover text-center flex flex-col items-center"
          >
            <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={course.img}
                alt={course.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">{course.title}</h3>
            <p className="text-sm text-base-content/60 mb-6 leading-relaxed">
              {course.desc}
            </p>
            <button className="btn btn-outline btn-primary btn-sm rounded-full px-6">
              {t("enrollNow")}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FreeCourses;

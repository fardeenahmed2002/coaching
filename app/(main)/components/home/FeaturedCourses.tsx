"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedCourses = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const courses = [
    { title: "Advanced Calculus", price: "$49", img: "https://picsum.photos/seed/calc/400/300" },
    { title: "Quantum Physics", price: "$59", img: "https://picsum.photos/seed/quantum/400/300" },
    { title: "Organic Chemistry", price: "$45", img: "https://picsum.photos/seed/organic/400/300" },
    { title: "English Literature", price: "$39", img: "https://picsum.photos/seed/lit/400/300" },
    { title: "Biology Masterclass", price: "$55", img: "https://picsum.photos/seed/bio/400/300" },
    { title: "Computer Science 101", price: "$69", img: "https://picsum.photos/seed/cs/400/300" },
    { title: "World History", price: "$29", img: "https://picsum.photos/seed/history/400/300" },
    { title: "Economics for All", price: "$49", img: "https://picsum.photos/seed/econ/400/300" },
    { title: "Psychology Basics", price: "$35", img: "https://picsum.photos/seed/psych/400/300" },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 3 >= courses.length ? 0 : prev + 3));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? courses.length - 3 : prev - 3));
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleCourses = courses.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl font-bold mb-4">{t("featuredCourses")}</h2>
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>
        <div className="flex gap-4">
          <button onClick={prev} className="btn btn-circle btn-outline border-white/10 hover:bg-primary hover:border-primary">
            <ChevronLeft />
          </button>
          <button onClick={next} className="btn btn-circle btn-outline border-white/10 hover:bg-primary hover:border-primary">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {visibleCourses.map((course, idx) => (
            <motion.div
              key={`${currentIndex}-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card bg-base-200 overflow-hidden card-hover"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-primary text-dark-bg font-bold px-3 py-1 rounded-full text-sm">
                  {course.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">{course.title}</h3>
                <button className="primary-btn w-full">{t("enrollNow")}</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCourses;

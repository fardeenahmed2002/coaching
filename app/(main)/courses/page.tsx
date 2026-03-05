"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const CoursesPage = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "SSC", "HSC", "Admission", "Skill Development"];

  const allCourses = [
    { title: "SSC Physics", category: "SSC", price: "$49", img: "https://picsum.photos/seed/ssc1/400/300" },
    { title: "HSC Chemistry", category: "HSC", price: "$59", img: "https://picsum.photos/seed/hsc1/400/300" },
    { title: "University Admission Math", category: "Admission", price: "$99", img: "https://picsum.photos/seed/adm1/400/300" },
    { title: "Web Development", category: "Skill Development", price: "$120", img: "https://picsum.photos/seed/skill1/400/300" },
    { title: "SSC Biology", category: "SSC", price: "$45", img: "https://picsum.photos/seed/ssc2/400/300" },
    { title: "HSC English", category: "HSC", price: "$39", img: "https://picsum.photos/seed/hsc2/400/300" },
  ];

  const filteredCourses = allCourses.filter(course => 
    (category === "All" || course.category === category) &&
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow py-24 px-4 lg:px-16 bg-base-100">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t("courses")}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 focus:outline-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`btn btn-sm rounded-full px-6 ${category === cat ? "btn-primary" : "btn-ghost bg-base-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">{course.category}</div>
                <h3 className="text-xl font-bold mb-6">{course.title}</h3>
                <button className="primary-btn w-full">{t("enrollNow")}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "BN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    home: "Home",
    courses: "Courses",
    notices: "Notices",
    notes: "Notes",
    login: "Login",
    logout: "Logout",
    heroTitle: "Empower Your Future with Rashed's Academy",
    heroSubtitle: "Quality education for a brighter tomorrow. Join our community of learners today.",
    getStarted: "Get Started",
    freeCourses: "Our Free Courses",
    whyChooseUs: "Why Choose Us",
    meetInstructors: "Meet Our Instructors",
    featuredCourses: "Featured Courses",
    class10Special: "Class 10 Special",
    hscFeatured: "HSC Featured Courses",
    topStudents: "Our Top Students",
    studentReviews: "Student Reviews",
    getInTouch: "Get In Touch",
    followUs: "Follow Us",
    enrollNow: "Enroll Now",
    viewProfile: "View Profile",
    download: "Download",
    readMore: "Read More",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Submit",
  },
  BN: {
    home: "হোম",
    courses: "কোর্সসমূহ",
    notices: "নোটিশ",
    notes: "নোটস",
    login: "লগইন",
    logout: "লগআউট",
    heroTitle: "রাশেদ'স একাডেমির সাথে আপনার ভবিষ্যৎ গড়ুন",
    heroSubtitle: "উজ্জ্বল ভবিষ্যতের জন্য মানসম্মত শিক্ষা। আজই আমাদের লার্নার্স কমিউনিটিতে যোগ দিন।",
    getStarted: "শুরু করুন",
    freeCourses: "আমাদের ফ্রি কোর্সসমূহ",
    whyChooseUs: "কেন আমাদের বেছে নেবেন",
    meetInstructors: "আমাদের ইনস্ট্রাক্টরদের সাথে পরিচিত হোন",
    featuredCourses: "সেরা কোর্সসমূহ",
    class10Special: "দশম শ্রেণীর স্পেশাল",
    hscFeatured: "এইচএসসি সেরা কোর্সসমূহ",
    topStudents: "আমাদের কৃতি শিক্ষার্থীরা",
    studentReviews: "শিক্ষার্থীদের মতামত",
    getInTouch: "যোগাযোগ করুন",
    followUs: "আমাদের অনুসরণ করুন",
    enrollNow: "এনরোল করুন",
    viewProfile: "প্রোফাইল দেখুন",
    download: "ডাউনলোড",
    readMore: "আরও পড়ুন",
    name: "নাম",
    email: "ইমেইল",
    message: "বার্তা",
    submit: "জমা দিন",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["EN"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

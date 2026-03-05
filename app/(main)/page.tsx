"use client";

import Footer from "./components/Footer";
import Class10Special from "./components/home/Class10Special";
import Contact from "./components/home/Contact";
import FeaturedCourses from "./components/home/FeaturedCourses";
import FollowUs from "./components/home/FollowUs";
import FreeCourses from "./components/home/FreeCourses";
import Hero from "./components/home/Hero";
import HSCFeatured from "./components/home/HSCFeatured";
import Instructors from "./components/home/Instructors";
import Reviews from "./components/home/Reviews";
import TopStudents from "./components/home/TopStudents";
import WhyChooseUs from "./components/home/WhyChooseUs";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Hero />
        <FreeCourses />
        <WhyChooseUs />
        <Instructors />
        <FeaturedCourses />
        <Class10Special />
        <HSCFeatured />
        <TopStudents />
        <Reviews />
        <Contact />
        <FollowUs />
      </main>
    </div>
  );
}

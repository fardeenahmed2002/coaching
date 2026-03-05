"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const Reviews = () => {
  const { t } = useLanguage();

  const reviews = [
    { name: "Kamal Uddin", text: "The best academy for SSC preparation. Highly recommended!", rating: 5, img: "https://picsum.photos/seed/r1/100/100" },
    { name: "Sultana Razia", text: "Instructors are very helpful and the notes are excellent.", rating: 5, img: "https://picsum.photos/seed/r2/100/100" },
    { name: "Abir Hasan", text: "I improved my math skills significantly after joining.", rating: 4, img: "https://picsum.photos/seed/r3/100/100" },
    { name: "Mitu Akter", text: "The model tests helped me gain confidence for the exams.", rating: 5, img: "https://picsum.photos/seed/r4/100/100" },
    { name: "Sajid Khan", text: "Great environment for learning and growing.", rating: 5, img: "https://picsum.photos/seed/r5/100/100" },
    { name: "Liza Islam", text: "Affordable courses with top-notch quality.", rating: 4, img: "https://picsum.photos/seed/r6/100/100" },
  ];

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("studentReviews")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-base-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={review.img}
                  alt={review.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-base-content/70 italic leading-relaxed">
              &quot;{review.text}&quot;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;

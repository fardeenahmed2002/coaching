"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 lg:px-16 bg-base-200">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t("getInTouch")}</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-base-100 p-10 rounded-4xl shadow-xl"
        >
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold opacity-60">{t("name")}</label>
              <input
                type="text"
                className="input input-bordered rounded-2xl bg-base-200 focus:outline-primary"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold opacity-60">{t("email")}</label>
              <input
                type="email"
                className="input input-bordered rounded-2xl bg-base-200 focus:outline-primary"
                placeholder="Your Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold opacity-60">{t("message")}</label>
              <textarea
                className="textarea textarea-bordered rounded-2xl bg-base-200 h-32 focus:outline-primary"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button className="primary-btn py-4 text-lg mt-4">{t("submit")}</button>
          </form>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-4xl overflow-hidden shadow-xl h-125 lg:h-auto"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301394!2d90.3910801!3d23.7508672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b898376d1627%3A0x11ff588f33a00262!2sDhaka!5e0!3m2!1sen!2sbd!4v1625484848484!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

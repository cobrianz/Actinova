"use client";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import faqData from "../lib/faqData";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0D0F20] text-white py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Frequently asked questions
        </h2>

        <div className="rounded-xl overflow-hidden border border-zinc-700 divide-y divide-zinc-700">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#10121F] px-6 py-4 cursor-pointer hover:bg-[#15172A] transition"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-white text-base md:text-lg">
                  {faq.question}
                </p>
                <CaretDown
                  size={20}
                  className={`text-zinc-400 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-3 text-zinc-400 text-sm md:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

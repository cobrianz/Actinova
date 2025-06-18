"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Star } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pricingData from "../lib/pricingData";
import comparisonData from "../lib/comparisonData";

export default function ComparisonTable() {
  const getPlanFeatures = (planName) => {
    const features = {};
    comparisonData.forEach((category) => {
      category.features.forEach((feature) => {
        const value = feature[planName.toLowerCase()];
        if (
          (typeof value === "boolean" && value === true) ||
          (typeof value === "number" && value > 0)
        ) {
          features[feature.name] = value;
        }
      });
    });
    return features;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] py-24 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Compare all{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              features
            </span>
          </h3>
          <p className="text-lg text-zinc-300">
            See exactly what's included in each plan
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <div className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-zinc-700/50">
                  <th className="text-left p-6 font-semibold text-white bg-gradient-to-r from-[#0F172A] to-[#1e293b]">
                    Features
                  </th>
                  {pricingData.map((plan) => (
                    <th
                      key={plan.name}
                      className="text-center p-6 font-semibold text-white bg-gradient-to-r from-[#0F172A] to-[#1e293b] min-w-[120px]"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    <tr className="border-b border-zinc-700/50">
                      <td
                        colSpan={5}
                        className="p-4 font-semibold text-[#7B68EE] bg-[#1a1f2e]/50 text-sm uppercase tracking-wide"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featIndex) => (
                      <tr
                        key={`${category.category}-${featIndex}`}
                        className="border-b border-zinc-700/30 hover:bg-[#1f2937]/50 transition-colors duration-300"
                      >
                        <td className="p-4 text-zinc-300">{feature.name}</td>
                        {["starter", "pro", "business", "enterprise"].map(
                          (key) => (
                            <td key={key} className="p-4 text-center">
                              {typeof feature[key] === "boolean" ? (
                                feature[key] ? (
                                  <Check
                                    size={20}
                                    className="text-[#7B68EE] mx-auto"
                                  />
                                ) : (
                                  <X
                                    size={20}
                                    className="text-zinc-500 mx-auto"
                                  />
                                )
                              ) : (
                                <span className="text-zinc-300 font-medium">
                                  {feature[key]}
                                </span>
                              )}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {pricingData.map((plan, index) => {
            const features = getPlanFeatures(plan.name);

            return (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                custom={index}
              >
                <Card className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 text-white">
                  <CardHeader className="p-4 bg-gradient-to-r from-[#1a1f2e] to-[#0F172A] border-b border-zinc-700/50">
                    <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                      <Star
                        size={16}
                        className="text-[#7B68EE]"
                        weight="fill"
                      />
                      {plan.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-3">
                      {Object.entries(features).map(([featureName, value]) => (
                        <li
                          key={featureName}
                          className="flex items-center justify-between text-sm text-zinc-300"
                        >
                          <span>{featureName}</span>
                          {typeof value === "boolean" ? (
                            <Check size={18} className="text-[#7B68EE]" />
                          ) : (
                            <span className="font-medium text-white">
                              {value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

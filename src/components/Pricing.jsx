"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import pricingData from "../lib/pricingData";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (price, isYearly) => {
    if (typeof price === "string") return price;
    if (price === 0) return "Free";
    const currentPrice = isYearly ? price.yearly : price.monthly;
    return isYearly ? `$${currentPrice}/year` : `$${currentPrice}/month`;
  };

  const getSavings = (plan) => {
    if (typeof plan.price.monthly === "string" || plan.price.monthly === 0)
      return null;
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    return savings > 0 ? savings : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] py-48 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#7B68EE]/3 to-transparent rounded-full"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7B68EE]/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-6">
            <Star size={16} weight="fill" className="text-[#7B68EE]" />
            <span className="text-sm font-medium text-[#7B68EE]">
              Pricing Plans
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              pricing
            </span>
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Choose the perfect plan for your business. Upgrade or downgrade at
            any time with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 p-2 bg-[#0F172A]/50 border border-zinc-700/50 rounded-2xl backdrop-blur-sm max-w-md mx-auto">
            <Label
              htmlFor="billing-toggle"
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                !isYearly
                  ? "bg-[#7B68EE] text-white font-semibold"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-[#7B68EE]"
            />
            <Label
              htmlFor="billing-toggle"
              className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                isYearly
                  ? "bg-[#7B68EE] text-white font-semibold"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Yearly
            </Label>
          </div>

          {isYearly && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <Badge className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white border-0">
                <Sparkle size={14} className="mr-1" weight="fill" />
                Save up to 2 months
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingData.map((plan, index) => {
            const savings = getSavings(plan);
            const isPopular = plan.name === "Pro";

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                custom={index}
                className="relative group"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isPopular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/20 via-[#9333EA]/10 to-[#7B68EE]/20 rounded-3xl blur-xl opacity-60"></div>
                )}

                <Card
                  className={`relative h-full bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border text-white transition-all duration-500 ${
                    isPopular
                      ? "border-[#7B68EE] shadow-2xl shadow-[#7B68EE]/25 scale-105"
                      : "border-zinc-700/50 hover:border-[#7B68EE]/30"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-t-lg"></div>
                  )}

                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white border-0 px-4 py-1 shadow-lg">
                        <Star size={14} className="mr-1" weight="fill" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 pt-8">
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </CardTitle>

                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">
                          {typeof plan.price === "string" ||
                          (isYearly
                            ? plan.price.yearly
                            : plan.price.monthly) === 0
                            ? formatPrice(plan.price, isYearly).split("/")[0]
                            : `$${
                                isYearly
                                  ? plan.price.yearly
                                  : plan.price.monthly
                              }`}
                        </span>
                        {typeof plan.price.monthly !== "string" &&
                          plan.price.monthly !== 0 && (
                            <span className="text-zinc-400 text-lg">
                              /{isYearly ? "year" : "month"}
                            </span>
                          )}
                      </div>

                      {isYearly && savings && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-[#7B68EE] font-medium mt-2"
                        >
                          💰 Save ${savings}/year
                        </motion.div>
                      )}
                    </div>

                    <CardDescription className="text-zinc-300 leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-start text-sm"
                        >
                          <Check
                            size={18}
                            className="text-[#7B68EE] mr-3 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-zinc-300 leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-6">
                    <Button
                      className={`w-full group transition-all duration-300 ${
                        isPopular
                          ? "bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:shadow-lg hover:shadow-[#7B68EE]/25 text-white"
                          : plan.name === "Enterprise"
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600"
                          : "bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-3">
              Need a custom solution?
            </h3>
            <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
              Our team is ready to help you find the perfect plan for your
              unique requirements.
            </p>
            <Button
              size="lg"
              className="bg-transparent border-2 border-[#7B68EE] text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white transition-all duration-300 group"
            >
              Contact our sales team
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

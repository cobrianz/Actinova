"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "@phosphor-icons/react";
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
import comparisonData from "../lib/comparisonData";

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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 px-4 bg-[#0D0F20] text-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/image-aWohdqEXmL0ezqIJmYM5Hq3j3RyO9q.avif')",
      }}
    >
      <motion.div
        variants={fadeUp}
        className="max-w-7xl mx-auto backdrop-blur-md bg-[#0d0f20cc] rounded-xl p-4"
      >
        {/* Pricing cards section remains unchanged */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-8xl font-bold text-white mb-4">
            Simple, transparent <br /> pricing
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business. Upgrade or downgrade at
            any time.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Label
              htmlFor="billing-toggle"
              className={!isYearly ? "font-semibold" : ""}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label
              htmlFor="billing-toggle"
              className={isYearly ? "font-semibold" : ""}
            >
              Yearly
            </Label>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save up to 2 months
              </Badge>
            )}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingData.map((plan, index) => {
            const savings = getSavings(plan);
            const isPopular = plan.name === "Pro";

            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={index}
                className="h-full"
              >
                <Card
                  className={`relative h-full bg-[#0F172A] border border-zinc-700 text-white ${
                    isPopular
                      ? "border-[#7B68EE] shadow-xl scale-105 bg-[#7c68ee44]"
                      : ""
                  } min-w-[300px]`}
                >
                  {isPopular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#7B68EE] text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">
                        {formatPrice(plan.price, isYearly)}
                      </span>
                      {typeof plan.price.monthly !== "string" &&
                        plan.price.monthly !== 0 && (
                          <span className="text-zinc-400 ml-1">
                            {isYearly ? "/year" : "/month"}
                          </span>
                        )}
                    </div>
                    {isYearly && savings && (
                      <div className="text-sm text-[#7B68EE] font-medium">
                        Save ${savings}/year
                      </div>
                    )}
                    <CardDescription className="mt-4 text-zinc-300">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start text-sm"
                        >
                          <Check
                            size={20}
                            className="text-[#7B68EE] mr-3 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-zinc-300 break-words overflow-hidden">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-6">
                    <Button
                      className={`w-full ${
                        isPopular
                          ? "bg-[#7B68EE] hover:bg-[#7c68eeb7] text-white"
                          : plan.name === "Enterprise"
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                          : "bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Modified table section with Tailwind CSS */}
        <motion.div variants={fadeUp} className="mt-20 overflow-x-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Compare all features
            </h3>
            <p className="text-lg text-zinc-300">
              See exactly what's included in each plan
            </p>
          </div>

          <table className="w-full border-collapse bg-[#0F172A] rounded-lg shadow-sm text-white overflow-hidden">
            <thead className="md:table-header-group hidden">
              <motion.tr
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="border-b border-zinc-700"
              >
                <th className="text-left p-4 font-semibold text-white bg-[#0F172A]">
                  Features
                </th>
                {pricingData.map((plan) => (
                  <th
                    key={plan.name}
                    className="text-center p-4 font-semibold text-white bg-[#0F172A] min-w-[120px]"
                    data-label={plan.name}
                  >
                    {plan.name}
                  </th>
                ))}
              </motion.tr>
            </thead>
            <tbody className="block md:table-row-group">
              {comparisonData.map((category, categoryIndex) => (
                <React.Fragment key={category.category}>
                  <motion.tr
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={categoryIndex * 0.5 + 1}
                    className="block md:table-row border-b border-zinc-700"
                  >
                    <td
                      colSpan={5}
                      className="block md:table-cell p-4 font-semibold text-white bg-[#1a1f2e] text-sm uppercase tracking-wide before:content-[attr(data-label)] before:font-semibold before:text-white"
                      data-label={category.category}
                    >
                      {category.category}
                    </td>
                  </motion.tr>
                  {category.features.map((feature, featIndex) => (
                    <motion.tr
                      key={`${category.category}-${featIndex}`}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={categoryIndex * 0.5 + featIndex * 0.2 + 1.5}
                      className="block md:table-row border-b border-zinc-700 hover:bg-[#1f2937] mb-4 md:mb-0"
                    >
                      <td
                        className="block md:table-cell p-4 text-zinc-300 break-words overflow-hidden before:content-[attr(data-label)] before:font-semibold before:text-zinc-300 before:mr-2 md:before:content-none"
                        data-label="Feature"
                      >
                        {feature.name}
                      </td>
                      {["starter", "pro", "business", "enterprise"].map(
                        (key, idx) => (
                          <td
                            key={key}
                            className="block md:table-cell p-4 text-center before:content-[attr(data-label)] before:font-semibold before:text-zinc-300 before:mr-2 md:before:content-none flex md:table-cell items-center justify-between"
                            data-label={pricingData[idx].name}
                          >
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
                              <span className="text-zinc-300 font-medium break-words overflow-hidden">
                                {feature[key]}
                              </span>
                            )}
                          </td>
                        )
                      )}
                    </motion.tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-16">
          <p className="text-zinc-300 mb-4">
            Need a custom solution? We're here to help.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent text-white border-zinc-500 hover:bg-white hover:text-zinc-900"
          >
            Contact our sales team
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

"use client";
import React, { useState } from "react";
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
import Navbar from "./Navbar";

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

  // Filter only features with true or numeric values for mobile card view
  const getPlanFeatures = (planName) => {
    const features = {};
    comparisonData.forEach((category) => {
      category.features.forEach((feature) => {
        const value = feature[planName.toLowerCase()];
        if (typeof value === "boolean" && value === true) {
          features[feature.name] = value;
        } else if (typeof value === "number" && value > 0) {
          features[feature.name] = value;
        }
      });
    });
    return features;
  };

    return (
      <div className="bg-[#0D0F20] py-[3rem]">
        <Navbar />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-16 px-4   text-white bg-cover bg-center pt-[12rem] sm:px-0 flex justify-center align-center"
        >
          <motion.div
            variants={fadeUp}
            className="max-w-7xl mx-auto backdrop-blur-md sm:w-full sm:mx-0 sm:p-0  bg-[#0d0f20cc] m-auto rounded-xl p-4"
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-7xl font-bold text-white mb-4 md:text-5xl sm:text-4xl xs:text-2xl">
                Simple, transparent <br className="hidden md:block sm:none" />{" "}
                pricing
              </h2>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
                Choose the perfect plan for your business. Upgrade or downgrade
                at any time.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20  w-ful sm:p-0">
              {pricingData.map((plan, index) => {
                const savings = getSavings(plan);
                const isPopular = plan.name === "Pro";

                return (
                  <motion.div
                    key={plan.name}
                    variants={fadeUp}
                    custom={index}
                    className="h-full flex justify-center flex-wrap md:w-full"
                  >
                    <Card
                      className={`relative max-w-[450px] h-full bg-[#0F172A] border border-zinc-700 text-white ${
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

            <motion.div variants={fadeUp} className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Compare all features
                </h3>
                <p className="text-lg text-zinc-300">
                  See exactly what's included in each plan
                </p>
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse bg-[#0F172A] overflow-hidden rounded-lg shadow-sm text-white">
                  <thead>
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
                        >
                          {plan.name}
                        </th>
                      ))}
                    </motion.tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((category, categoryIndex) => (
                      <React.Fragment key={category.category}>
                        <motion.tr
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={categoryIndex * 0.5 + 1}
                          className="border-b border-zinc-700"
                        >
                          <td
                            colSpan={5}
                            className="p-4 font-semibold text-white bg-[#1a1f2e] text-sm uppercase tracking-wide"
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
                            className="border-b border-zinc-700 hover:bg-[#1f2937]"
                          >
                            <td className="p-4 text-zinc-300 break-words overflow-hidden">
                              {feature.name}
                            </td>
                            {["starter", "pro", "business", "enterprise"].map(
                              (key, idx) => (
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
              </div>

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4">
                {pricingData.map((plan, index) => {
                  const features = getPlanFeatures(plan.name);

                  return (
                    <motion.div
                      key={plan.name}
                      variants={fadeUp}
                      custom={index}
                      className="w-full"
                    >
                      <Card className="bg-[#0F172A] border border-zinc-700 m-auto text-white max-w-[450px]">
                        <CardHeader className="p-4 bg-gray-800">
                          <CardTitle className="text-xl font-semibold text-white">
                            {plan.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <ul className="space-y-2">
                            {Object.entries(features).map(
                              ([featureName, value]) => (
                                <li
                                  key={featureName}
                                  className="flex items-center justify-between text-sm text-zinc-300"
                                >
                                  <span className="break-words">
                                    {featureName}
                                  </span>
                                  {typeof value === "boolean" ? (
                                    <Check
                                      size={20}
                                      className="text-[#7B68EE]"
                                    />
                                  ) : (
                                    <span className="font-medium">{value}</span>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
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
      </div>
    );
}

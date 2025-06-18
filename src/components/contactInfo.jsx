"use client";

import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  Globe,
  MapPin,
  Clock,
  Rocket,
  Users,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { contactMethods, companyStats } from "../lib/contactData";

const iconMap = {
  EnvelopeSimple,
  Globe,
  MapPin,
  Clock,
  Rocket,
  Users,
};

export default function ContactInfo() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1a0b2e] via-[#0d0f20] to-[#0a0b1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Multiple Ways to{" "}
            <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            Choose the method that works best for you. We're here to help
            accelerate your software success.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const MethodIcon = iconMap[method.icon];
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 text-white hover:border-[#7B68EE]/30 transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 mb-4 mx-auto">
                      <MethodIcon
                        size={24}
                        className={method.color}
                        weight="fill"
                      />
                    </div>
                    <CardTitle className="text-lg font-semibold text-white flex items-center justify-center gap-2">
                      {method.title}
                      {method.badge && (
                        <Badge className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] text-white border-0 text-xs">
                          {method.badge}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-zinc-400 text-sm mb-3">
                      {method.description}
                    </p>
                    {method.action ? (
                      <a
                        href={method.action}
                        className={`font-medium ${method.color} hover:underline`}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className={`font-medium ${method.color}`}>
                        {method.value}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Why Choose Actinova?
            </h3>
            <p className="text-zinc-300">
              Trusted by startups and businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyStats.map((stat, index) => {
              const StatIcon = iconMap[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 mb-4">
                    <StatIcon size={32} className={stat.color} weight="fill" />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-zinc-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

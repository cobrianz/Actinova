"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PaperPlaneTilt,
  User,
  EnvelopeSimple,
  ChatCircle,
  Briefcase,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formConfig } from "../lib/formData";

const iconMap = {
  User,
  EnvelopeSimple,
  ChatCircle,
  Briefcase,
  PaperPlaneTilt,
};

export default function ContactForm() {
  const [formData, setFormData] = useState(
    formConfig.fields.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const SubmitIcon = iconMap[formConfig.submitButton.icon];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] border border-zinc-700/50 text-white backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-4">
                {formConfig.title.main}{" "}
                <span className="bg-gradient-to-r from-[#7B68EE] to-[#9333EA] bg-clip-text text-transparent">
                  {formConfig.title.highlight}
                </span>
              </CardTitle>
              <p className="text-zinc-300 text-lg">{formConfig.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formConfig.fields.map((field) => {
                    const FieldIcon = iconMap[field.icon];

                    if (field.type === "textarea") {
                      return (
                        <div key={field.id} className="md:col-span-2 space-y-2">
                          <Label
                            htmlFor={field.id}
                            className="text-zinc-300 flex items-center gap-2"
                          >
                            <FieldIcon size={16} className="text-[#7B68EE]" />
                            {field.label} {field.required && "*"}
                          </Label>
                          <Textarea
                            id={field.id}
                            value={formData[field.id]}
                            onChange={(e) =>
                              handleChange(field.id, e.target.value)
                            }
                            className="bg-[#1a1f2e] border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#7B68EE] min-h-[120px]"
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        </div>
                      );
                    }

                    if (field.type === "select") {
                      return (
                        <div key={field.id} className="space-y-2">
                          <Label className="text-zinc-300 flex items-center gap-2">
                            <FieldIcon size={16} className="text-[#7B68EE]" />
                            {field.label} {field.required && "*"}
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              handleChange(field.id, value)
                            }
                          >
                            <SelectTrigger className="bg-[#1a1f2e] border-zinc-700 text-white focus:border-[#7B68EE]">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1f2e] border-zinc-700">
                              {field.options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    }

                    return (
                      <div key={field.id} className="space-y-2">
                        <Label
                          htmlFor={field.id}
                          className="text-zinc-300 flex items-center gap-2"
                        >
                          <FieldIcon size={16} className="text-[#7B68EE]" />
                          {field.label} {field.required && "*"}
                        </Label>
                        <Input
                          id={field.id}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={(e) =>
                            handleChange(field.id, e.target.value)
                          }
                          className="bg-[#1a1f2e] border-zinc-700 text-white placeholder:text-zinc-500 focus:border-[#7B68EE]"
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      </div>
                    );
                  })}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#7B68EE] to-[#9333EA] hover:shadow-lg hover:shadow-[#7B68EE]/25 text-white font-semibold py-4"
                  >
                    {formConfig.submitButton.text}
                    <SubmitIcon size={20} className="ml-2" weight="fill" />
                  </Button>
                </motion.div>
              </form>

              <div className="text-center pt-4 border-t border-zinc-700/50">
                <p className="text-sm text-zinc-400">
                  {formConfig.footer.text}{" "}
                  <a
                    href={`mailto:${formConfig.footer.email}`}
                    className="text-[#7B68EE] hover:underline"
                  >
                    {formConfig.footer.email}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

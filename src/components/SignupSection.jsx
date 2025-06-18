"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import * as Icons from "@phosphor-icons/react";
import { signupData, authFeatures } from "../lib/authData";

const iconMap = {
  ...Icons,
};

export default function SignupSection() {
  const [formData, setFormData] = useState(
    signupData.form.fields.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {})
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const requiredFields = signupData.form.fields.filter(
      (field) => field.required
    );
    for (const field of requiredFields) {
      if (!formData[field.id]) return false;
    }
    if (formData.email && !formData.email.includes("@")) return false;
    if (formData.password && formData.password.length < 8) return false;
    if (formData.password !== formData.confirmPassword) return false;
    if (!acceptTerms) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      console.log("Submitted:", formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  text-white overflow-hidden">
      <div className="flex-1 p-10 flex justify-end items-center relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {signupData.hero.title.main}
            <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
              {signupData.hero.title.highlight}
            </span>
            {signupData.hero.title.end && (
              <span className="block text-white">
                {signupData.hero.title.end}
              </span>
            )}
          </h1>
          <p className="text-lg text-zinc-300 mb-8 font-light">
            {signupData.hero.description}
          </p>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex gap-2 items-center">
              <Icons.Star size={20} className="text-[#7B68EE]" weight="fill" />
              Why developers choose Actinova
            </h3>
            <div className="space-y-3">
              {authFeatures.map((feature) => {
                const FeatureIcon = iconMap[feature.icon];
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-[#7B68EE]/5 to-[#9333EA]/5 border border-[#7B68EE]/10"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 rounded-xl border border-[#7B68EE]/20">
                      <FeatureIcon
                        size={20}
                        className="text-[#7B68EE]"
                        weight="fill"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-zinc-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="text-green-400 font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full">
              <Icons.CheckCircle
                size={12}
                className="text-[#7B68EE]"
                weight="fill"
              />
              <span className="text-[#7B68EE] font-medium">
                Enterprise Security
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl relative z-10"
        >
          <Card className="shadow-xl bg-[#0F172A]/90 backdrop-blur-md border border-zinc-700/50 px-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-2xl flex items-center justify-center mx-auto">
                <Icons.UserPlus
                  size={24}
                  className="text-white"
                  weight="bold"
                />
              </div>
              <CardTitle className="text-white text-2xl font-bold mt-4">
                {signupData.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-sm text-zinc-400 font-medium">
                {signupData.form.socialLogin.title}
              </div>
              <div className="flex justify-center gap-5">
                {signupData.form.socialLogin.providers.map((provider) => {
                  const ProviderIcon = iconMap[provider.icon];
                  return (
                    <Button
                      key={provider.name}
                      className={`flex gap-2 items-center ${provider.color}`}
                    >
                      <ProviderIcon size={18} />
                      {provider.name}
                    </Button>
                  );
                })}
              </div>
              <div className="relative">
                <Separator className="bg-zinc-700/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-[#0F172A] px-4 text-sm text-zinc-400">
                    or create account with email
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {signupData.form.fields.map((field) => {
                    const FieldIcon = iconMap[field.icon];
                    return (
                      <div key={field.id} className="space-y-2">
                        <Label className="text-zinc-200 flex gap-2 text-sm font-medium">
                          <FieldIcon size={16} className="text-[#7B68EE]" />{" "}
                          {field.label}
                        </Label>
                        {field.type === "select" ? (
                          <Select
                            onValueChange={(val) => handleChange(field.id, val)}
                          >
                            <SelectTrigger className="bg-[#1a1f2e] text-white border-zinc-700/50">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1f2e] border-zinc-700/50">
                              {field.options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="text-white"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="relative">
                            <Input
                              type={
                                field.type === "password" &&
                                ((field.id === "password" && showPassword) ||
                                  (field.id === "confirmPassword" &&
                                    showConfirmPassword))
                                  ? "text"
                                  : field.type
                              }
                              value={formData[field.id]}
                              onChange={(e) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder={field.placeholder}
                              className="bg-[#1a1f2e] text-white border-zinc-700/50 placeholder:text-zinc-500"
                              required={field.required}
                            />
                            {field.type === "password" && (
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                                onClick={() =>
                                  field.id === "password"
                                    ? setShowPassword(!showPassword)
                                    : setShowConfirmPassword(
                                        !showConfirmPassword
                                      )
                                }
                              >
                                {(field.id === "password" && showPassword) ||
                                (field.id === "confirmPassword" &&
                                  showConfirmPassword) ? (
                                  <Icons.EyeSlash size={18} />
                                ) : (
                                  <Icons.Eye size={18} />
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-start space-x-3 p-3 bg-[#1a1f2e]/50 rounded-lg border border-zinc-700/30">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="mt-1 border-2 data-[state=checked]:bg-[#7B68EE] data-[state=checked]:border-[#7B68EE]"
                  />
                  <label htmlFor="terms" className="text-sm text-zinc-300">
                    {signupData.form.terms.text}{" "}
                    <Link
                      href={signupData.form.terms.termsLink}
                      className="text-[#7B68EE] hover:text-[#9333EA] font-semibold"
                    >
                      {signupData.form.terms.termsText}
                    </Link>{" "}
                    {signupData.form.terms.and}{" "}
                    <Link
                      href={signupData.form.terms.privacyLink}
                      className="text-[#7B68EE] hover:text-[#9333EA] font-semibold"
                    >
                      {signupData.form.terms.privacyText}
                    </Link>
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !acceptTerms}
                  className="w-full bg-[#7B68EE] hover:bg-[#6A5ACD] text-white font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    "Creating account..."
                  ) : (
                    <span className="flex items-center gap-2">
                      {signupData.form.submitButton.text}
                      <Icons.ArrowRight size={18} />
                    </span>
                  )}
                </Button>
              </form>
              <div className="text-center text-sm text-zinc-300 border-t border-zinc-700/50 pt-4">
                {signupData.form.footer.text}{" "}
                <Link
                  href={signupData.form.footer.link}
                  className="text-[#7B68EE] hover:text-[#9333EA] font-semibold"
                >
                  {signupData.form.footer.linkText}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

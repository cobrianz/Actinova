"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import * as Icons from "@phosphor-icons/react";
import { loginData, authFeatures } from "../lib/authData";

const iconMap = {
  ...Icons,
};

export default function LoginSection() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    if (!formData.email.includes("@")) return;
    setIsLoading(true);
    try {
      console.log("Login submitted:", formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Trigger ${provider} login`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  text-white overflow-hidden">
      <div className="flex-1 p-10 flex justify-end items-center relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {loginData.hero.title.main}
            <span className="bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE] bg-clip-text text-transparent">
              {loginData.hero.title.highlight}
            </span>
          </h1>
          <p className="text-lg text-zinc-300 mb-8 font-light">
            {loginData.hero.description}
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
          className="w-full max-w-md relative z-10"
        >
          <Card className="shadow-xl bg-[#0F172A]/90 backdrop-blur-md border border-zinc-700/50 px-6">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl font-bold mt-4">
                {loginData.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-sm text-zinc-400 font-medium">
                {loginData.form.socialLogin.title}
              </div>
              <div className="flex justify-center gap-5">
                {loginData.form.socialLogin.providers.map((provider) => {
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
                    or continue with email
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {loginData.form.fields.map((field, index) => {
                  const FieldIcon = iconMap[field.icon];
                  return (
                    <div key={field.id} className="space-y-2">
                      <Label className="text-zinc-200 flex gap-2 text-sm font-medium">
                        <FieldIcon size={16} className="text-[#7B68EE]" />{" "}
                        {field.label}
                      </Label>
                      <div className="relative">
                        <Input
                          type={
                            field.type === "password" && showPassword
                              ? "text"
                              : field.type
                          }
                          value={formData[field.id]}
                          onChange={(e) =>
                            handleChange(field.id, e.target.value)
                          }
                          placeholder={field.placeholder}
                          className="bg-[#1a1f2e] text-white border-zinc-700/50 placeholder:text-zinc-500 pr-10"
                          required={field.required}
                        />
                        {field.type === "password" && (
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Icons.EyeSlash size={18} />
                            ) : (
                              <Icons.Eye size={18} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-[#7B68EE] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-zinc-200 font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={loginData.form.forgotPassword.link}
                    className="text-sm text-[#7B68EE] hover:text-[#9333EA] font-semibold"
                  >
                    {loginData.form.forgotPassword.text}
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#7B68EE] hover:bg-[#6A5ACD] text-white font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <span className="flex items-center gap-2">
                      {loginData.form.submitButton.text}
                      <Icons.ArrowRight size={18} />
                    </span>
                  )}
                </Button>
              </form>
              <div className="text-center text-sm text-zinc-300 border-t border-zinc-700/50 pt-4">
                {loginData.form.footer.text}{" "}
                <Link
                  href={loginData.form.footer.link}
                  className="text-[#7B68EE] hover:text-[#9333EA] font-semibold"
                >
                  {loginData.form.footer.linkText}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

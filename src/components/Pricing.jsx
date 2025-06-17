"use client"

import { useState } from "react"
import { Check, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import pricingData from "../lib/pricingData"
import comparisonData from "../lib/comparisonData"

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  const formatPrice = (price, isYearly) => {
    if (typeof price === "string") return price
    if (price === 0) return "Free"

    const currentPrice = isYearly ? price.yearly : price.monthly
    if (isYearly) {
      return `$${currentPrice}/year`
    }
    return `$${currentPrice}/month`
  }

  const getSavings = (plan) => {
    if (typeof plan.price.monthly === "string" || plan.price.monthly === 0) return null
    const monthlyCost = plan.price.monthly * 12
    const yearlyCost = plan.price.yearly
    const savings = monthlyCost - yearlyCost
    return savings > 0 ? savings : null
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business. Upgrade or downgrade at any time.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="billing-toggle" className={!isYearly ? "font-semibold" : ""}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className={isYearly ? "font-semibold" : ""}>
              Yearly
            </Label>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save up to 2 months
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pricingData.map((plan, index) => {
            const savings = getSavings(plan)
            const isPopular = plan.name === "Pro"

            return (
              <Card
                key={plan.name}
                className={`relative ${
                  isPopular ? "border-2 border-blue-500 shadow-lg scale-105" : "border border-gray-200"
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {isYearly
                        ? typeof plan.price.yearly === "string"
                          ? plan.price.yearly
                          : plan.price.yearly === 0
                            ? "Free"
                            : `$${plan.price.yearly}`
                        : typeof plan.price.monthly === "string"
                          ? plan.price.monthly
                          : plan.price.monthly === 0
                            ? "Free"
                            : `$${plan.price.monthly}`}
                    </span>
                    {typeof plan.price.monthly !== "string" && plan.price.monthly !== 0 && (
                      <span className="text-gray-500 ml-1">{isYearly ? "/year" : "/month"}</span>
                    )}
                  </div>
                  {isYearly && savings && (
                    <div className="text-sm text-green-600 font-medium">Save ${savings}/year</div>
                  )}
                  <CardDescription className="mt-4 text-gray-600">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" weight="bold" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    className={`w-full ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : plan.name === "Enterprise"
                          ? "bg-gray-900 hover:bg-gray-800 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Compare all features</h3>
            <p className="text-lg text-gray-600">See exactly what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900 bg-gray-50">Features</th>
                  {pricingData.map((plan) => (
                    <th
                      key={plan.name}
                      className="text-center p-4 font-semibold text-gray-900 bg-gray-50 min-w-[120px]"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((category, categoryIndex) => (
                  <>
                    <tr key={category.category} className="border-b border-gray-100">
                      <td
                        colSpan={5}
                        className="p-4 font-semibold text-gray-900 bg-gray-25 text-sm uppercase tracking-wide"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr
                        key={`${categoryIndex}-${featureIndex}`}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4 text-gray-700">{feature.name}</td>
                        <td className="p-4 text-center">
                          {typeof feature.starter === "boolean" ? (
                            feature.starter ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" weight="bold" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" weight="bold" />
                            )
                          ) : (
                            <span className="text-gray-700 font-medium">{feature.starter}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.pro === "boolean" ? (
                            feature.pro ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" weight="bold" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" weight="bold" />
                            )
                          ) : (
                            <span className="text-gray-700 font-medium">{feature.pro}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.business === "boolean" ? (
                            feature.business ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" weight="bold" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" weight="bold" />
                            )
                          ) : (
                            <span className="text-gray-700 font-medium">{feature.business}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof feature.enterprise === "boolean" ? (
                            feature.enterprise ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" weight="bold" />
                            ) : (
                              <X className="h-5 w-5 text-gray-300 mx-auto" weight="bold" />
                            )
                          ) : (
                            <span className="text-gray-700 font-medium">{feature.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Need a custom solution? We're here to help.</p>
          <Button variant="outline" size="lg">
            Contact our sales team
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Code, Sparkle, Lightning } from "@phosphor-icons/react";
import "@fontsource/jetbrains-mono";

const MAX_LINES = 15;

const apiExamples = {
  Mpesa: {
    language: "javascript",
    icon: "💳",
    description: "Mobile payment integration",
    code: `// Node.js (Express) - Mpesa STK Push
import express from 'express';
import axios from 'axios';
const app = express();

app.post('/mpesa', async (req, res) => {
  const token = 'YOUR_ACCESS_TOKEN';
  const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    BusinessShortCode: '174379',
    Password: '...',
    Timestamp: '...',
    TransactionType: 'CustomerPayBillOnline',
    Amount: '1',
    PartyA: '254712345678',
    PartyB: '174379',
    PhoneNumber: '254712345678',
    CallBackURL: 'https://yourdomain.com/callback',
    AccountReference: 'Test123',
    TransactionDesc: 'Payment for X'
  }, {
    headers: {
      Authorization: \`Bearer \${token}\`
    }
  });

  res.send(response.data);
});`,
  },
  Stripe: {
    language: "javascript",
    icon: "💰",
    description: "Payment processing API",
    code: `// Node.js (Express) - Stripe Payment Intent
import express from 'express';
import Stripe from 'stripe';
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');
const app = express();

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});`,
  },
  OpenAI: {
    language: "python",
    icon: "🤖",
    description: "AI-powered text generation",
    code: `# Python - OpenAI GPT-4 call
import openai

openai.api_key = "YOUR_OPENAI_API_KEY"

response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
    {"role": "user", "content": "Write a poem about the ocean."}
  ]
)

print(response['choices'][0]['message']['content'])`,
  },
  PayPal: {
    language: "javascript",
    icon: "🏦",
    description: "Global payment solutions",
    code: `// Node.js - PayPal Order API
import express from 'express';
import axios from 'axios';
const app = express();

app.post('/create-order', async (req, res) => {
  const token = 'YOUR_ACCESS_TOKEN';
  const order = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '10.00'
      }
    }]
  }, {
    headers: {
      Authorization: \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });

  res.send(order.data);
});`,
  },
  Email: {
    language: "javascript",
    icon: "📧",
    description: "Email automation service",
    code: `// Node.js - Nodemailer SMTP Email
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.sendMail({
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'Hello, this is a test email.'
}, (err, info) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Email sent:', info.response);
  }
});`,
  },
};

export default function ApiCodeShowcase() {
  const [selected, setSelected] = useState("Mpesa");
  const [copied, setCopied] = useState(false);
  const rawCode = apiExamples[selected].code;
  const lines = rawCode.split("\n");

  const displayCode =
    lines.length <= MAX_LINES
      ? rawCode
      : [...lines.slice(0, MAX_LINES - 1), "..."].join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const codeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/10 border border-[#7B68EE]/20 rounded-full mb-4">
          <Code size={16} weight="fill" className="text-[#7B68EE]" />
          <span className="text-sm font-medium text-[#7B68EE]">
            Live API Examples
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Ready-to-use <span className="text-[#7B68EE]">API Integrations</span>
        </h3>
        <p className="text-zinc-400">
          Copy, paste, and customize these production-ready code examples
        </p>
      </motion.div>

      {/* Main Container */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] rounded-3xl shadow-2xl border border-zinc-700/50 backdrop-blur-xl overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7B68EE] via-[#9333EA] to-[#7B68EE]"></div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#7B68EE]/10 to-[#9333EA]/10 rounded-full blur-xl"></div>

        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-zinc-400 text-sm font-medium">
              api-examples.js
            </div>
          </div>
          <motion.button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#7B68EE]/10 hover:bg-[#7B68EE]/20 border border-[#7B68EE]/30 rounded-lg transition-all duration-300 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-[#7B68EE]" />
                <span className="text-[#7B68EE]">Copy</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-zinc-700/50 overflow-x-auto scrollbar-hide">
          {Object.entries(apiExamples).map(([api, config]) => (
            <motion.button
              key={api}
              onClick={() => setSelected(api)}
              className={`relative px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-3 ${
                selected === api
                  ? "text-[#7B68EE] bg-[#7B68EE]/5"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-lg">{config.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{api}</div>
                <div className="text-xs opacity-70">{config.description}</div>
              </div>
              {selected === api && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7B68EE] to-[#9333EA]"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              variants={codeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-6"
            >
              <div className="relative bg-[#1a1f2e] rounded-2xl border border-zinc-700/30 overflow-hidden">
                {/* Code Content */}
                <div className="overflow-auto max-h-[400px] md:max-h-[500px] scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
                  <SyntaxHighlighter
                    language={apiExamples[selected].language}
                    style={vscDarkPlus}
                    wrapLongLines
                    customStyle={{
                      background: "transparent",
                      margin: 0,
                      padding: "1.5rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "'JetBrains Mono', monospace",
                      },
                    }}
                  >
                    {displayCode}
                  </SyntaxHighlighter>
                </div>

                {/* Language Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-[#7B68EE]/20 border border-[#7B68EE]/30 rounded-full text-xs font-medium text-[#7B68EE] backdrop-blur-sm">
                    {apiExamples[selected].language}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-zinc-700/50 bg-[#0a0f1a]/50">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Lightning size={16} className="text-[#7B68EE]" />
            <span>Production-ready code</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Sparkle size={16} className="text-[#9333EA]" />
            <span>Fully customizable</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

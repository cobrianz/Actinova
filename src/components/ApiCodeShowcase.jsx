"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "@fontsource/jetbrains-mono";

const MAX_LINES = 15;

const apiExamples = {
  Mpesa: {
    language: "javascript",
    code: `// Node.js (Express) - Mpesa STK Push
import express from 'express';
import axios from 'axios';
const app = express();

app.post('/mpesa', async (req, res) => {
  const token = 'YOUR_ACCESS_TOKEN';
  const response = await axios.post(' 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
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
    code: `// Node.js - Nodemailer SMTP Email
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
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
  const rawCode = apiExamples[selected].code;
  const lines = rawCode.split("\n");

  const displayCode =
    lines.length <= MAX_LINES
      ? rawCode
      : [...lines.slice(0, MAX_LINES - 1), "..."].join("\n");

  return (
    <div className="w-full max-w-4xl mx-auto rounded-md shadow-lg bg-[#0f172a] text-white font-mono flex flex-col overflow-hidden border border-slate-800">
      {/* Tabs */}
      <div className="flex flex-wrap text-sm border-b border-blue-900 overflow-x-auto">
        {Object.keys(apiExamples).map((api) => (
          <button
            key={api}
            onClick={() => setSelected(api)}
            className={`px-4 py-2 font-semibold transition whitespace-nowrap ${
              selected === api
                ? "text-[#7B68EE] border-b-2 border-[#7B68EE]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {api}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="flex-1 text-sm px-4 py-3 overflow-auto h-[400px] sm:h-[500px]">
        <SyntaxHighlighter
          language={apiExamples[selected].language}
          style={vscDarkPlus}
          wrapLongLines
          customStyle={{
            background: "transparent",
            height: "100%",
            margin: 0,
            padding: 0,
            fontFamily: "'JetBrains Mono', monospace",
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

      {/* Footer */}
      <div className="text-xs px-4 py-2 text-zinc-400 border-t border-zinc-700 bg-slate-900">
        Language: {apiExamples[selected].language}
      </div>
    </div>
  );
}

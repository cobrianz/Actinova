"use client";

import Link from "next/link";
import Image from "next/image";
import { GithubLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0F20] text-white px-6 md:px-12 pt-16 pb-8 border-t border-zinc-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">
        {/* Brand & Newsletter */}
        <div className="col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <Image src="/logo.png" alt="Actinova logo" width={32} height={32} />
            <span className="text-xl font-bold text-[#7B68EE]">Actinova</span>
          </div>
          <h3 className="text-sm font-semibold mb-2">Join the newsletter</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Subscribe for weekly updates. No spam ever!
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md bg-[#0f172a] border border-zinc-700 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7B68EE] hover:border-[#7B68EE] transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-white text-black text-sm rounded hover:bg-zinc-200 hover:scale-105 hover:shadow-md transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link
                href="/services"
                className="hover:text-[#7B68EE] transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="hover:text-[#7B68EE] transition"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                href="/highlights"
                className="hover:text-[#7B68EE] transition"
              >
                Highlights
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#7B68EE] transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#7B68EE] transition">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/about" className="hover:text-[#7B68EE] transition">
                About us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#7B68EE] transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-[#7B68EE] transition">
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/terms" className="hover:text-[#7B68EE] transition">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#7B68EE] transition">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#7B68EE] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-700 mt-12 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 gap-4">
          <div className="text-center md:text-left">
            <Link href="/privacy" className="hover:text-[#7B68EE] transition">
              Privacy Policy
            </Link>
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:text-[#7B68EE] transition">
              Terms of Service
            </Link>
          </div>
          <p className="text-center">
            Copyright © Actinova {new Date().getFullYear()}
          </p>
          <div className="flex gap-2 justify-center">
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-[#7B68EE] transition"
            >
              <GithubLogo size={20} className="text-white" />
            </Link>
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-[#7B68EE] transition"
            >
              <TwitterLogo size={20} className="text-white" />
            </Link>
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-[#7B68EE] transition"
            >
              <LinkedinLogo size={20} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

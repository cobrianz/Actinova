"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full z-50">
      {/* Top navigation bar */}
      <div
        className={`
          mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-3
          flex items-center justify-between rounded-3xl
          md:bg-white/10 md:backdrop-blur-md md:shadow-md
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Actinova logo" width={32} height={32} />
          <span className="text-2xl font-semibold hidden sm:inline text-white">
            Actinova
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white">
          {["Home", "Services", "Pricing", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-[#7B68EE]"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA for desktop (md+) */}
        <div className="hidden md:flex text-sm font-medium items-center gap-4">
          <Link
            href="/login"
            className="text-white px-2 py-1 hover:text-[#7B68EE] transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#7B68EE] text-white px-1 py-1 rounded hover:bg-inherit hover:text-[#7B68EE] border border-[#7B68EE] transition"
          >
            Signup
          </Link>
        </div>

        {/* Mobile CTA + Toggle (only for >500px) */}
        <div className="flex items-center gap-3 md:hidden max-[500px]:hidden flex-row-reverse">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <X size={28} weight="bold" />
            ) : (
              <List size={28} weight="bold" />
            )}
          </button>
          <Link
            href="/login"
            className="text-white hover:text-[#7B68EE] py-1 px-1 text-sm font-medium"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#7B68EE] text-white px-1 py-0.5 rounded text-sm font-normal hover:bg-inherit hover:text-[#7B68EE] border border-[#7B68EE] transition"
          >
            Signup
          </Link>
        </div>

        {/* Toggle only for ≤500px */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden min-[501px]:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <X size={28} weight="bold" />
          ) : (
            <List size={28} weight="bold" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden w-full absolute left-0 mt-2 px-4">
          <div className="bg-[#0f172a] overflow-hidden">
            {["Home", "Services", "Pricing", "About", "Contact"].map(
              (label, idx, arr) => (
                <Link
                  key={label}
                  href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-white hover:text-[#7B68EE] border-b border-zinc-700 ${
                    idx === arr.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {label}
                </Link>
              )
            )}

            {/* Bottom CTA for ≤500px */}
            <div className="px-4 pt-3 border-t border-zinc-700 min-[501px]:hidden">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-center text-white border-1 border-[#7B68EE] rounded-lg hover:bg-[#7B68EE] hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#7B68EE] text-white px-4 py-2 mt-2 rounded hover:bg-inherit hover:text-[#7B68EE] border border-[#7B68EE] transition"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

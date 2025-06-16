import Link from "next/link";
import {
  EnvelopeSimple,
  GithubLogo,
  XLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0F20] text-white px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Join the newsletter</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Get tech tips, product updates, and smart automation insights.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md bg-[#0f172a] border border-zinc-700 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7B68EE]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black text-sm rounded hover:bg-zinc-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
            <li>
              <Link href="/integrations">Integrations</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm text-zinc-400 mb-6">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition"
            >
              <GithubLogo size={20} />
            </Link>
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition"
            >
              <XLogo size={20} />
            </Link>
            <Link
              href="#"
              className="bg-zinc-800 p-2 rounded hover:bg-zinc-700 transition"
            >
              <LinkedinLogo size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-700 mt-12 pt-6 text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Actinova. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy">Privacy Policy</Link>
          <span>&bull;</span>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

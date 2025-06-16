"use client";

import highlightData from "../lib/highlightData";
import {
  Lightning,
  MagicWand,
  ChatCenteredDots,
  PuzzlePiece,
  Brain,
  ShieldCheck,
} from "@phosphor-icons/react";

const icons = {
  Lightning: <Lightning size={28} />,
  PuzzlePiece: <PuzzlePiece size={28} />,
  ChatCenteredDots: <ChatCenteredDots size={28} />,
  MagicWand: <MagicWand size={28} />,
  Brain: <Brain size={28} />,
  ShieldCheck: <ShieldCheck size={28} />,
};

export default function Highlights() {
  return (
    <section className="bg-[#0D0F20] text-white py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Highlights</h2>
        <p className="text-zinc-400 text-base md:text-lg">
          Why businesses trust Actinova: speed, flexibility, modern design, and
          expert support—delivered securely.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {highlightData.map((item, i) => (
          <div
            key={i}
            className="bg-[#111529] p-6 rounded-lg border border-zinc-700 hover:border-[#7B68EE] transition duration-300"
          >
            <div className="text-[#7B68EE] mb-4">{icons[item.icon]}</div>
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

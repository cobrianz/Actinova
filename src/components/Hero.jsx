import React from "react";
import Navbar from "./Navbar";
import ApiCodeShowcase from "./ApiCodeShowcase";
import CompanyLogoSlider from "./CompanyLogoSlider";

const Hero = () => {
  return (
    <section className="w-100% bg-[#0D0F20] text-white min-h-[100vh] hero">
      <Navbar />

      <div className="py-24 text-center flex justify-center align-center flex-col max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 gap-12">
        <h1 className="text-4xl sm:text-6xl font-bold  tracking-tight max-w-[800px] mx-auto ">
          Seamless <span className="text-[#7B68EE]">API Integrations</span> &
          Tech Advice for <span className="text-[#7B68EE]">Your Business</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          Actinova helps startups and enterprises automate workflows, integrate
          powerful APIs, and make smart software decisions — all in one place.
        </p>
        <div className="flex justify-center align-centerw-100%">
          <ApiCodeShowcase />
        </div>
        <div className="flex justify-center align-center my-8 py-8 w-100%">
          <CompanyLogoSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;

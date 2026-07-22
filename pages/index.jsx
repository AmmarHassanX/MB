import React from "react";
import { ProductRails, Testimonials, Newsletter } from "../src/components/redesign/HomeSections";
import Hero from "../src/components/home/Hero/Hero";
import Advantage from "../src/components/home/Advantage/Advantage";
import CategoryShowcase from "../src/components/home/CategoryShowcase/CategoryShowcase";
import CoverageMap from "../src/components/home/CoverageMap/CoverageMap";
import { FindStore, ContactSection } from "../src/components/home/FindStoreAndContact/FindStoreAndContact";
import Reveal from "../src/components/motion/Reveal";

export default function Home({ businessId }) {
  return (
    <main>
      <Hero />
      <Reveal><Advantage /></Reveal>
      <div id="home-products">
        <Reveal><CategoryShowcase /></Reveal>
      </div>
      <Reveal><CoverageMap /></Reveal>
      <Reveal><ProductRails businessId={businessId} /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><FindStore /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Reveal><Newsletter /></Reveal>
    </main>
  );
}

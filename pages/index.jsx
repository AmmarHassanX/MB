import React from "react";
import {
  CategoryTiles,
  FeaturesStrip,
  Newsletter,
  ProductRails,
  PromoGrid,
  Testimonials,
} from "../src/components/redesign/HomeSections";
import Hero from "../src/components/home/Hero/Hero";
import Reveal from "../src/components/motion/Reveal";

export default function Home({ businessId }) {
  return (
    <main>
      <Hero />
      <Reveal><FeaturesStrip /></Reveal>
      <div id="home-products">
        <Reveal><CategoryTiles businessId={businessId} /></Reveal>
      </div>
      <Reveal><ProductRails businessId={businessId} /></Reveal>
      <Reveal><PromoGrid businessId={businessId} /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Newsletter /></Reveal>
    </main>
  );
}

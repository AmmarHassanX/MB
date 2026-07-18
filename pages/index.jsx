import React from "react";
import {
  CategoryTiles,
  Newsletter,
  ProductRails,
  PromoGrid,
  Testimonials,
} from "../src/components/redesign/HomeSections";
import Hero from "../src/components/home/Hero/Hero";
import Advantage from "../src/components/home/Advantage/Advantage";
import Reveal from "../src/components/motion/Reveal";

export default function Home({ businessId }) {
  return (
    <main>
      <Hero />
      <Reveal><Advantage /></Reveal>
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

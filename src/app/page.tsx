'use client';

import { AppleCardsCarouselDemo } from "@/components/applecard";
import { FeaturesSectionDemo } from "@/components/feature";
import Footer from "@/components/Footer";
import TypewriterEffectSmoothDemo from "@/components/hero";

import { WobbleCardDemo } from "@/components/wobble";

export default function Home() {

  return (
    <div>
      <TypewriterEffectSmoothDemo />
      <FeaturesSectionDemo />
      <WobbleCardDemo />
      <AppleCardsCarouselDemo />
      <Footer />
    </div>
  );
}

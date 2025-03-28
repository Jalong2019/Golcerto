import React from 'react';
import { BetSlipProvider } from "@/components/context/BetSlipContext";

export default function App({ Component, pageProps }) {
  return (
    <BetSlipProvider>
      <Component {...pageProps} />
    </BetSlipProvider>
  );
}
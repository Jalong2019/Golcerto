
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?q=80&w=1200&auto=format&fit=crop",
      title: "Ganhe Bônus de Boas-Vindas",
      description: "Deposite hoje e receba 100% de bônus em sua primeira aposta!",
      buttonText: "Depositar Agora",
      buttonLink: "/Deposito"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1200&auto=format&fit=crop",
      title: "Champions League",
      description: "Apostas com as melhores odds para os jogos das oitavas de final",
      buttonText: "Apostar",
      buttonLink: "/AoVivo"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
      title: "Brasileirão 2025",
      description: "Acompanhe todos os jogos do campeonato brasileiro e aposte nos seus times favoritos",
      buttonText: "Ver Jogos",
      buttonLink: "/Home"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative rounded-lg overflow-hidden max-w-7xl mx-auto px-4">
      <div 
        className="h-[250px] md:h-[300px] relative overflow-hidden rounded-lg"
        style={{
          backgroundColor: '#111',
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{banner.title}</h2>
              <p className="text-lg text-gray-200 mb-4 max-w-xl">{banner.description}</p>
              <div>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.location.href = banner.buttonLink}
                >
                  {banner.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 border-none text-white hover:bg-black/60"
        onClick={prevBanner}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 border-none text-white hover:bg-black/60"
        onClick={nextBanner}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  );
}

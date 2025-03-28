import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PAISES = [
  { id: 'brasil', nome: 'Brasil', bandeira: '🇧🇷' },
  { id: 'argentina', nome: 'Argentina', bandeira: '🇦🇷' },
  { id: 'mundial', nome: 'Mundial', bandeira: '🌎' },
  { id: 'eua', nome: 'Estados Unidos', bandeira: '🇺🇸' },
  { id: 'uruguai', nome: 'Uruguai', bandeira: '🇺🇾' },
  { id: 'espanha', nome: 'Espanha', bandeira: '🇪🇸' },
  { id: 'italia', nome: 'Itália', bandeira: '🇮🇹' },
  { id: 'portugal', nome: 'Portugal', bandeira: '🇵🇹' },
  { id: 'paraguai', nome: 'Paraguai', bandeira: '🇵🇾' },
  { id: 'alemanha', nome: 'Alemanha', bandeira: '🇩🇪' },
  { id: 'colombia', nome: 'Colômbia', bandeira: '🇨🇴' },
  { id: 'equador', nome: 'Equador', bandeira: '🇪🇨' },
  { id: 'chile', nome: 'Chile', bandeira: '🇨🇱' },
  { id: 'africa-sul', nome: 'África do Sul', bandeira: '🇿🇦' },
  { id: 'australia', nome: 'Austrália', bandeira: '🇦🇺' },
  { id: 'belgica', nome: 'Bélgica', bandeira: '🇧🇪' },
  { id: 'china', nome: 'China', bandeira: '🇨🇳' },
  { id: 'mexico', nome: 'México', bandeira: '🇲🇽' }
];

export default function CountryFilter({ selectedCountry, onSelectCountry }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap mb-6">
      <div className="flex space-x-2 p-1">
        {PAISES.map((pais) => (
          <Button
            key={pais.id}
            variant={selectedCountry === pais.id ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => onSelectCountry(pais.id)}
          >
            <span>{pais.bandeira}</span>
            <span>{pais.nome}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
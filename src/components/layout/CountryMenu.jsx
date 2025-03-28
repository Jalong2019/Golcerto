
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Trophy
} from "lucide-react";
import { createPageUrl } from "@/utils";

// Importação centralizada via index.js
import { APIFootballService } from "@/components/services";

// Dados de fallback caso a API falhe
const FALLBACK_DATA = {
  countries: [
    {
      id: 1,
      name: "Brasil",
      flag: "🇧🇷",
      leagues: [
        { id: 71, name: "Série A", season: 2024 }
      ]
    },
    {
      id: 2,
      name: "Inglaterra",
      flag: "🇬🇧",
      leagues: [
        { id: 39, name: "Premier League", season: 2024 }
      ]
    }
  ],
  featuredLeagues: [
    {
      id: 2,
      name: "Champions League",
      icon: <Trophy className="text-yellow-500" />,
      season: 2024
    },
    {
      id: 71,
      name: "Brasileirão Série A",
      icon: <Trophy className="text-green-500" />,
      season: 2024
    },
    {
      id: 39,
      name: "Premier League",
      icon: <Trophy className="text-purple-500" />,
      season: 2024
    }
  ]
};

export default function CountryMenu() {
  const [countries, setCountries] = useState([]);
  const [featuredLeagues, setFeaturedLeagues] = useState([]);
  const [expandedCup, setExpandedCup] = useState(true);
  const [expandedCountries, setExpandedCountries] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountriesAndLeagues();
  }, []);
  
  const loadCountriesAndLeagues = async () => {
    setLoading(true);
    try {
      console.log("📌 CountryMenu: Buscando países e ligas");
      const data = await APIFootballService.getLeaguesByCountry();

      const processedCountries = Object.values(data).map(country => ({
        id: country.country_id,
        name: country.country_name,
        flag: country.flag || getCountryEmoji(country.country_code),
        leagues: country.leagues.map(league => ({
          id: league.id,
          name: league.name,
          season: league.season,
          isFeatured: league.isFeatured
        }))
      }));
      
      // Ordena países alfabeticamente
      processedCountries.sort((a, b) => a.name.localeCompare(b.name));
      
      // Extrai ligas em destaque
      const featured = [];
      processedCountries.forEach(country => {
        country.leagues.forEach(league => {
          if (league.isFeatured) {
            const icon = getLeagueIcon(league.id);
            featured.push({
              ...league,
              country: country.name,
              icon: icon
            });
          }
        });
      });
      
      setCountries(processedCountries);
      setFeaturedLeagues(featured);
      console.log(`✅ CountryMenu: Carregados ${processedCountries.length} países e ${featured.length} ligas`);
    } catch (error) {
      console.error("❌ Erro ao carregar países e ligas:", error);
      setCountries(FALLBACK_DATA.countries);
      setFeaturedLeagues(FALLBACK_DATA.featuredLeagues);
    } finally {
      setLoading(false);
    }
  };
  
  const getCountryEmoji = (countryCode) => {
    // Fallback para emojis de bandeira
    const flagEmojis = { BR: "🇧🇷", GB: "🇬🇧", ES: "🇪🇸", IT: "🇮🇹", DE: "🇩🇪", FR: "🇫🇷" };
    return flagEmojis[countryCode] || "🏳️";
  };
  
  const getLeagueIcon = (leagueId) => {
    const iconMap = {
      2: <Trophy className="text-yellow-500" />,
      71: <Trophy className="text-green-500" />,
      39: <Trophy className="text-purple-500" />
    };
    return iconMap[leagueId] || <Trophy className="text-blue-500" />;
  };

  return (
    <Card className="bg-[#2A2C2E] border-gray-700">
      <CardContent className="p-4">
        {/* Principais Competições */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center px-3 py-2 text-white"
            onClick={() => setExpandedCup(!expandedCup)}
          >
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              <span>Principais Competições</span>
            </div>
            {expandedCup ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>

          {expandedCup && (
            <div className="mt-2 space-y-1">
              {loading ? (
                <div className="py-2 px-3 text-gray-400 text-sm">Carregando...</div>
              ) : featuredLeagues.map((league) => (
                <Button
                  key={league.id}
                  variant="ghost"
                  className="w-full justify-start pl-8 text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => window.location.href = createPageUrl(`League?id=${league.id}&season=${league.season}`)}
                >
                  {league.icon && <span className="mr-2">{league.icon}</span>}
                  {league.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Países */}
        <div>
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center px-3 py-2 text-white"
            onClick={() => setExpandedCountries(!expandedCountries)}
          >
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-blue-500" />
              <span>Países</span>
            </div>
            {expandedCountries ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>

          {expandedCountries && (
            <div className="mt-2 space-y-1">
              {loading ? (
                <div className="py-2 px-3 text-gray-400 text-sm">Carregando...</div>
              ) : countries.map((country) => (
                <div key={country.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start pl-4 ${
                      selectedCountry === country.id
                        ? 'text-white bg-gray-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                    onClick={() =>
                      setSelectedCountry(selectedCountry === country.id ? null : country.id)
                    }
                  >
                    {country.flag && <span className="mr-2">{country.flag}</span>}
                    {country.name}
                    {country.leagues.length > 0 && (
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-transform ${
                          selectedCountry === country.id ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </Button>

                  {selectedCountry === country.id && country.leagues.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1">
                      {country.leagues.map((league) => (
                        <Button
                          key={league.id}
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => window.location.href = createPageUrl(`League?id=${league.id}&season=${league.season}`)}
                        >
                          {league.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

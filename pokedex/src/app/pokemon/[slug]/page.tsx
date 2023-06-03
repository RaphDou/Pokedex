"use client";

import { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
    version_group_details: {
      level_learned_at: number;
    }[];
  }[];
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  base_experience: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("about");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Extract the name from the URL
        const pathname = window.location.pathname;
        const name = pathname.split("/")[2];

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const renderPokemonInfo = () => {
    if (pokemon) {
      switch (selectedTab) {
        case "evolution":
          return (
            <div>
              {/* Afficher les informations sur l'évolution du Pokémon ici */}
            </div>
          );
        case "about":
          return (
            <div>
              {/* Afficher les informations générales sur le Pokémon ici */}
              <Typography variant="body1">Species: {pokemon.species.name}</Typography>
              <Typography variant="body1">Base Experience: {pokemon.base_experience}</Typography>
              <Typography variant="body1">Types:</Typography>
              <ul>
                {pokemon.types.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          );
        case "moves":
          return (
            <div>
              {/* Afficher les mouvements du Pokémon ici */}
              <Typography variant="body1">Moves:</Typography>
              <ul>
                {pokemon.moves.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          );
        case "characteristics":
          return (
            <div>
              {/* Afficher les caractéristiques du Pokémon ici */}
              <Typography variant="body1">Height: {pokemon.height}</Typography>
              <Typography variant="body1">Weight: {pokemon.weight}</Typography>
              <Typography variant="body1">Abilities:</Typography>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
              <Typography variant="body1">Stats:</Typography>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  return (
    <Container>
      {pokemon ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Breadcrumbs>
              <Link href="/">Home</Link>
              <Typography>{pokemon.name}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
              textAlign="center"
            >
              {/* Rectangle supérieur */}
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Typography variant="h4">{pokemon.name}</Typography>
              <Typography variant="body1">ID: {pokemon.id}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Rectangle inférieur */}
              <Box
                display="flex"
                justifyContent="center"
                mb={2}
                textAlign="center"
              >
                {/* Titres cliquables */}
                <button onClick={() => handleTabClick("evolution")}>Évolution</button>
                <button onClick={() => handleTabClick("about")}>À propos</button>
                <button onClick={() => handleTabClick("moves")}>Mouvements</button>
                <button onClick={() => handleTabClick("characteristics")}>Caractéristiques</button>
              </Box>
              {/* Contenu de l'information sélectionnée */}
              {renderPokemonInfo()}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default PokemonPage;

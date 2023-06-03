/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
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
}

interface EvolutionChain {
  evolves_to: any;
  species: {
    name: string;
    url: string;
  };
  id: number;
  baby_trigger_item: null;
  chain: {
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
    evolution_details: null;
    evolves_to: EvolutionChain[];
  };
}

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Extract the name from the URL
        const pathname = window.location.pathname;
        const name = pathname.split("/")[2];

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);

        // Fetch the evolution chain
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainResponse = await fetch(
          speciesData.evolution_chain.url
        );
        const evolutionChainData = await evolutionChainResponse.json();
        setEvolutionChain(evolutionChainData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderPokemonInfo = () => {
    if (pokemon) {
      switch (selectedTab) {
        case 0:
          return (
            <div>
              {evolutionChain && renderEvolutionChain(evolutionChain)}
            </div>
          );
        case 1:
          return (
            <div>
              {/* Afficher les informations générales sur le Pokémon ici */}
              <Typography variant="body1">
                Species: {pokemon.species.name}
              </Typography>
            </div>
          );
        case 2:
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
        case 3:
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
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const renderEvolutionChain = (chain: EvolutionChain | null) => {
    if (chain) {
      const renderEvolution = (evolution: EvolutionChain) => {
        const pokemonId = evolution.species.url.split("/")[6];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

        return (
          <li key={evolution.species.name}>
            <img src={imageUrl} alt={evolution.species.name} />
            {evolution.species.name}
            {evolution.evolves_to.length > 0 && (
              <ul>{evolution.evolves_to.map(renderEvolution)}</ul>
            )}
          </li>
        );
      };

      const renderChain = (evolutionChain: EvolutionChain) => {
        if (evolutionChain.chain) {
          const pokemonId = evolutionChain.chain.species.url.split("/")[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <ul>
              <li>
                <img
                  src={imageUrl}
                  alt={evolutionChain.chain.species.name}
                />
                {evolutionChain.chain.species.name}
                {evolutionChain.chain.evolves_to.length > 0 && (
                  <ul>{evolutionChain.chain.evolves_to.map(renderEvolution)}</ul>
                )}
              </li>
            </ul>
          );
        } else {
          return null;
        }
      };

      return (
        <div>
          <Typography variant="body1">Evolution Chain:</Typography>
          {renderChain(chain)}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Container>
      <Box
        mt={4}
        mb={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Breadcrumbs>
          <Link href="/" passHref>
            <Typography component="a">Home</Typography>
          </Link>
          <Typography>Pokémon</Typography>
        </Breadcrumbs>
        <div style={{ marginTop: "2rem" }}>
          {pokemon && (
            <Paper>
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="body1">ID: {pokemon.id}</Typography>
                <Typography variant="h4">{pokemon.name}</Typography>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ marginBottom: "1rem" }}
                />
                <Typography variant="body1">Types:</Typography>
                <ul>
                  {pokemon.types.map((type) => (
                    <li key={type.type.name}>{type.type.name}</li>
                  ))}
                </ul>
              </Box>
            </Paper>
          )}
        </div>
        <div style={{ marginTop: "1rem", width: "100%" }}>
          <Paper>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Evolution Chain" />
              <Tab label="Species" />
              <Tab label="Moves" />
              <Tab label="Stats" />
            </Tabs>
            <Box p={2}>{renderPokemonInfo()}</Box>
          </Paper>
        </div>
      </Box>
    </Container>
  );
};

export default PokemonPage;

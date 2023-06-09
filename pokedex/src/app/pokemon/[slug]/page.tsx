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
import "./pokemonPage.css"; 

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
    other: any;
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
const getBackgroundColorClass = (pokemon: Pokemon): string => {
  if (pokemon && pokemon.types.length > 0) {
    const type = pokemon.types[0].type.name; 
    switch (type) {
      case 'fire':
        return 'fire-background'; 
      case 'water':
        return 'water-background';
        case 'grass': 
        return 'grass-background'; 
        case 'normal': 
        return 'normal-background';
        case 'fighting': 
        return 'fighting-background'; 
        case 'electric': 
        return 'electric-background'; 
        case 'ice': 
        return 'ice-background'; 
        case 'poison': 
        return 'poison-background'; 
        case 'ghost': 
        return 'ghost-background'; 
        case 'ground': 
        return 'ground-background'; 
        case 'flying': 
        return 'flying-background'; 
        case 'psychic': 
        return 'psychic-background'; 
        case 'dragon': 
        return 'dragon-background'; 
        case 'bug': 
        return 'bug-background'; 
        case 'dark': 
        return 'dark-background'; 
        case 'rock': 
        return 'rock-background'; 
        case 'steel': 
        return 'steel-background';
        case 'fairy': 
        return 'fairy-background';  
        
      default:
        return 'default-background'; 
    }
  }

  return 'default-background'; // default background c'est s'il ne trouve pas de type
};

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [backgroundClass, setBackgroundClass] = useState<string>("default-background");
  
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
        setBackgroundClass(getBackgroundColorClass(data)); // Mise à jour de la classe CSS du fond en fonction du type de Pokémon
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
            <Box>
              {evolutionChain && renderEvolutionChain(evolutionChain)}
              </Box>
          );
        case 1:
          return (
            <Box>
              {/* Afficher les informations générales sur le Pokémon ici */}
              <Typography variant="h4">
                Species: {pokemon.species.name}
              </Typography>
              <Typography variant="h4" component="ul" style={{ listStyleType: "none" }}></Typography>
            </Box>
          );
        case 2:
          return (
            <Box>
              {/* Afficher les mouvements du Pokémon ici */}
              <Typography variant="h4">Moves:</Typography>
              <ul>
                {pokemon.moves.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </Box>
          );
        case 3:
          return (
            <Box>
              {/* Afficher les caractéristiques du Pokémon ici */}
              <Typography variant="h4">Height: {pokemon.height}</Typography>
              <Typography variant="h4">Weight: {pokemon.weight}</Typography>
              <Typography variant="h4">Abilities:</Typography>
              
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            
            </Box>
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
           <div key={evolution.species.name}>
            <img src={imageUrl} alt={evolution.species.name} />
            {evolution.species.name}
            {evolution.evolves_to.length > 0 && (
             <div> {evolution.evolves_to.map(renderEvolution)}</div>
            )}
          </div>
        );
      };

      const renderChain = (evolutionChain: EvolutionChain) => {
        if (evolutionChain.chain) {
          const pokemonId = evolutionChain.chain.species.url.split("/")[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return (
            <div>
              
                <img
                  src={imageUrl}
                  alt={evolutionChain.chain.species.name}
                  width={150} height={150}
                />
                {evolutionChain.chain.species.name}
                {evolutionChain.chain.evolves_to.length > 0 && (
                  <ul>{evolutionChain.chain.evolves_to.map(renderEvolution)}</ul>
                )}
              </div>
            
          );
        } else {
          return null;
        }
      };

      return (
        <div>
          <Typography variant="h4">Evolution Chain:</Typography>
          {renderChain(chain)}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Breadcrumbs>
          <Link href="/" passHref>
            <Typography component="a">Home</Typography>
          </Link>
          <Typography variant="h4">Pokémon</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
           <Paper className={`rounded-card  small-card-content box-shadow`}>
           <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              {pokemon && (
                <>
                <div className={`card-header  ${getBackgroundColorClass(pokemon)}`} style={{ width: "100%",display: "flex", justifyContent: "center"}}>
                  <Typography variant="h4"style={{color:"white"}}>#{pokemon.id}</Typography>
                  <Typography variant="h4">{pokemon.name}</Typography>
                
                 <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    style={{ marginBottom: "1rem", width: "300px", height: "300px", marginTop: "4rem"}}
                    
                  />
                  
                  <Typography variant="h4">Types:</Typography>
                  
                    {pokemon.types.map((type) => (
                      <li key={type.type.name}>{type.type.name}</li>
                    ))}
                  </div>
                </>
                
              )}
              
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonPage;

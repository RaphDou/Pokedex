"use client";

import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface PokemonCardProps {
  name?: string;
  pokemonUrl: string;
}

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

const getRandomBackground = (types: string[]): string => {
  const backgrounds = types.map((type) => `${type}.png`);
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return `/background/${backgrounds[randomIndex]}`;
};

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
    
        const types = data.types.map((typeData: any) => typeData.type.name);
        return {
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.other["official-artwork"].front_default,
          types: types,
        };
      } catch (error) {
        console.error(error);
      }
    }
    

    if (loading) {
      getData()
        .then((response) => {
          if (response) {
            setPokemon(response);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.name, loading]);

  function formatId(id: number | undefined): string {
    if (id === undefined) return "";
    if (id >= 1011) {
      const adjustedId = id - 8990;
      return adjustedId.toString();
    } else {
      return id.toString();
    }
  }
  
  
  

  return (
    <Link href={props.name ? `/pokemon/${props.name}` : "#"}>
      <Card
        sx={{
          maxWidth: 300,
          height: "400px",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
          backgroundImage: `url(${getRandomBackground(pokemon?.types || [])})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          borderRadius: "25px", // Ajoutez cette ligne pour le border-radius
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          {loading ? (
            <Skeleton variant="rectangular" height={350} />
          ) : (
            <>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                  zIndex: 2,
                  color: "#ffffff",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {pokemon?.types?.map((type) => (
                    <Box
                      key={type}
                      component="img"
                      src={`/types/${type}.png`}
                      alt={type}
                      width={30}
                      height={30}
                      sx={{ marginRight: "5px" }}
                    />
                  ))}
                </Box>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "18px", color: "#ffffff" }}>
                  #{formatId(pokemon?.id)}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height={200}
                image={pokemon?.imageUrl}
                alt={pokemon?.name}
                sx={{ objectFit: "contain", alignSelf: "flex-end", marginBottom: "8px" }}
              />
            </>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}

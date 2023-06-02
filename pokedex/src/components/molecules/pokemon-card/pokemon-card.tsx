"use client";

import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
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
}

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  async function getData() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (loading) {
      getData()
        .then((response) => {
          const pokemonFormated = {
            id: response.id,
            name: response.name,
            imageUrl: response.sprites.other["official-artwork"].front_default,
          };
          setPokemon(pokemonFormated);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Link href={props.name ? `/pokemon/${props.name}` : "#"}>
      <Card
        sx={{
          maxWidth: 300,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardActionArea>
          {loading ? (
            <>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton />
                <Skeleton width="60%" />
              </CardContent>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                height={props.name ? 140 : 350}
                image={pokemon?.imageUrl}
                alt={pokemon?.name}
                sx={{ objectFit: "cover" }}
              />
              {props.name && (
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pokemon?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                 # {pokemon?.id?.toString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Types: {/* Replace with the types data */}
                  </Typography>
                </CardContent>
              )}
            </>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}

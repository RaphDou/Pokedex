"use client";


import { PokemonListAPI } from "@/types/pokemon-api";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card/pokemon-card";
import { getData } from "@/api/pokemon-api";
import styles from "@/app/page.module.css";

const { paginationContainer } = styles;

interface PokemonListProps {
  data: PokemonListAPI;
}


export default function PokemonList(props: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(props.data.count ? props.data.count / 16 : 1)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (props.data) {
      setLoading(false);
    }

    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
  }, [props.data]);

  useEffect(() => {
    const offset = (currentPage - 1) * 16;
    getApiData(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  function getApiData(url: string) {
    setLoading(true);

    getData(url)
      .then((apiReturn) => {
        setPokemonList(apiReturn);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  return (
    <Container fixed>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {pokemonList?.results.map((pokemon) => (
                <Grid item xs={3} key={pokemon.name}>
                  <PokemonCard name={pokemon.name} pokemonUrl={pokemon.url} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <div className={paginationContainer}>
              <Pagination
                count={totalPages}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </Box>
        </>
      )}
    </Container>
  );
}

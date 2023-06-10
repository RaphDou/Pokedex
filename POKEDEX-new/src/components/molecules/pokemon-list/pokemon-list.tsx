"use client";

import { PokemonListAPI } from "@/types/pokemon-api";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
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
  const [filter, setFilter] = useState<string>("");
  const [filteredPokemonList, setFilteredPokemonList] = useState<PokemonListAPI>(props.data);
  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
  const [allPokemonList, setAllPokemonList] = useState<PokemonListAPI>(props.data);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(props.data.count ? props.data.count / 16 : 1)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {

    getApiData('https://pokeapi.co/api/v2/pokemon?limit=10000', setAllPokemonList) ;

    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    } else {
      setCurrentPage(1);
    }
  }, []);

  useEffect(() => {
    const offset = (currentPage - 1) * 16;
    getApiData(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`, setFilteredPokemonList);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  function getApiData(url: string, setFunction : Function) {
    setLoading(true);

    getData(url)
      .then((apiReturn) => {
        setFunction(apiReturn);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);

    const filteredList = allPokemonList.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
  
    setFilteredPokemonList({
      count: filteredList.length,
      results: filteredList,
    });
  };

  return (
    <Container fixed>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={handleFilterChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {filteredPokemonList?.results.map((pokemon) => (
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
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
              />
            </div>
          </Box>
        </>
      )}
    </Container>
  );
}
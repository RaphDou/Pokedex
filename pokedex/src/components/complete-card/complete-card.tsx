"use client";

import ContentCard from "../atoms/content-card/content-card";
import HeaderCard from "../atoms/header-card/header-card";

interface CompleteCardProps{
    pokemonName: string
    pokemonNumber: string
}


export default function CompleteCard(props:CompleteCardProps){
    return(<><HeaderCard pokemonName={props.pokemonName} pokemonNumber={props.pokemonNumber} /><ContentCard /></>);
}



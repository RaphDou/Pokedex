"use client";


import HeaderCard from "../header-card/header-card";



interface CompleteCardProps{
    pokemonName: string
    pokemonNumber: string
}

export default function CompleteCard(props:CompleteCardProps){
    return(<><HeaderCard pokemonName={props.pokemonName} pokemonNumber={props.pokemonNumber} /></>);
}

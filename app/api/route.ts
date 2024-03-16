import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PokemonDTO } from "../models/PokemonDTO";
import prisma from "../lib/prisma";

export async function GET(): Promise<NextResponse> {
  // const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  // const data = await res.json();
  // const pokemonDataArray: PokemonDTO[] = await Promise.all(
  //   data.results.map(async (pokemon): Promise<PokemonDTO> => {
  //     const result = await fetch(pokemon.url);
  //     const pokemonData = await result.json();
  //     return {
  //       name: pokemonData.name,
  //       id: pokemonData.id,
  //       stats: pokemonData.stats,
  //       types: pokemonData.types,
  //       cries: pokemonData.cries,
  //     };
  //   })
  // );
  // return Response.json(pokemonDataArray);

  try {
    const pokemonData: PokemonDTO[] = await prisma.pokemon.findMany({
      include: {
        stats: true,
        types: true,
      },
    });
    return NextResponse.json(pokemonData);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Internal Server Error", trace: e });
  } finally {
    await prisma.$disconnect();
  }
}

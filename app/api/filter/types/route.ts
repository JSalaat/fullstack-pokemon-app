import { NextResponse } from "next/server";
import { TypeDTO } from "../../../models/PokemonDTO";
import prisma from "../../../lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const pokemonTypes: TypeDTO[] = await prisma.pokemonType.findMany({
      select: {
        type_name: true,
      },
      distinct: ["type_name"],
    });
    return NextResponse.json(pokemonTypes);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Internal Server Error", trace: e });
  } finally {
    await prisma.$disconnect();
  }
}

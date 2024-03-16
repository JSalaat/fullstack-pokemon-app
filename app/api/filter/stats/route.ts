import { NextResponse } from "next/server";
import { StatDTO } from "../../../models/PokemonDTO";
import prisma from "../../../lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const pokemonStats: StatDTO[] = await prisma.stat.findMany({
      select: {
        stat_name: true,
      },
      distinct: ["stat_name"],
    });
    return NextResponse.json(pokemonStats);
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Internal Server Error", trace: e });
  } finally {
    await prisma.$disconnect();
  }
}

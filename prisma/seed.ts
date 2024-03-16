import { PrismaClient } from "@prisma/client";
import { PokemonData } from "./pokemonData";

const prisma = new PrismaClient();

const main = async () => {
  await Promise.all(
    PokemonData.map(async (pokemon) => {
      await prisma.pokemon.create({
        // where: { pokemonId: pokemon.id },
        data: {
          name: pokemon.name,
          pokemonId: pokemon.id,
          latest_cry: pokemon.cries.latest,
          stats: {
            create: pokemon.stats.map((stat) => {
              return {
                stat_name: stat.stat.name,
                url: stat.stat.url,
                base_stat: stat.base_stat,
                effort: stat.effort,
              };
            }),
          },
          types: {
            create: pokemon.types.map((type) => {
              return {
                type_name: type.type.name,
                url: type.type.url,
                slot: type.slot,
              };
            }),
          },
        },
        // update: {},
      });
    })
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

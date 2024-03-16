"use client";

import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Progress,
  Select,
  Tag,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { FaPlay } from "react-icons/fa";
import { useGetPokemon, useStatsFilters, useTypeFilters } from "./lib/hooks";

export default () => {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [pokemonTypes, setPokemonTypes] = React.useState([]);
  const [pokemonStats, setPokemonStats] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState([]);

  const { pokemon, isError, isLoading } = useGetPokemon();
  const { types, isTypeFilterError } = useTypeFilters();
  const { stats, isStatsFilterError } = useStatsFilters();

  useEffect(() => {
    setPokemonData((pokemon as any) ?? []);
    setPokemonTypes((types as any) ?? []);
    setPokemonStats((stats as any) ?? []);
  }, [pokemon, stats, types]);

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
  };

  if (isError || isTypeFilterError || isStatsFilterError)
    return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Box>
      <Container p="4">
        <Center>
          <Heading size="lg">Pokemon Finder</Heading>
        </Center>
      </Container>
      <Box p="10" bg="gray.100">
        <HStack spacing="5" w="100%">
          <Box flex="7">
            <FormControl>
              <FormLabel>Search By Name</FormLabel>
              <Input
                border="1px solid lightgray"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box flex="3" textAlign="right">
            <FormControl>
              <FormLabel>Sort By Stats</FormLabel>
              <Select
                border="1px solid lightgray"
                placeholder="- none -"
                onChange={(e) => {
                  const sortBy = e.target.value;
                  const statMap = {
                    hp: 0,
                    attack: 1,
                    defense: 2,
                    "special-attack": 3,
                    "special-defense": 4,
                    speed: 5,
                  };
                  setPokemonData((prevData) => [
                    ...prevData.sort(
                      (a, b) =>
                        b.stats[statMap[sortBy]].base_stat -
                        a.stats[statMap[sortBy]].base_stat
                    ),
                  ]);
                }}
              >
                {pokemonStats.map((stat) => (
                  <option value={stat.stat_name} key={stat.stat_name}>
                    {stat.stat_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </HStack>
        <HStack w="100%" mt="5">
          <Box flex="10">
            <FormControl>
              <FormLabel>Search By Type</FormLabel>
              {pokemonTypes.map((type) => (
                <Tag
                  colorScheme="blue"
                  key={type.type_name}
                  onClick={() =>
                    setSearchType(
                      searchType.includes(type.type_name)
                        ? searchType.filter((t) => t !== type.type_name)
                        : [...searchType, type.type_name]
                    )
                  }
                  px="3"
                  m="1"
                  variant={
                    searchType.includes(type.type_name) ? "solid" : "outline"
                  }
                >
                  {type.type_name}
                </Tag>
              ))}
            </FormControl>
          </Box>
        </HStack>
      </Box>
      <SimpleGrid
        bg="gray.100"
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing="5"
        p="10"
        rounded="lg"
      >
        {pokemonData
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((pokemon) => {
            if (searchType.length === 0) return pokemon;
            return pokemon.types.some((type) =>
              searchType.includes(type.type_name.toLowerCase())
            );
          })
          .map((pokemon) => (
            <Card maxW="sm" key={pokemon.id}>
              <CardBody>
                <Image
                  src={`/sprites/${pokemon.pokemonId}.svg`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "auto", height: "100px" }}
                  alt=""
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">
                    {pokemon.name.toUpperCase()}{" "}
                    <IconButton
                      variant="outline"
                      icon={<FaPlay />}
                      aria-label=""
                      onClick={() => playSound(pokemon.latest_cry)}
                    />
                  </Heading>
                  {pokemon.stats.map((stat) => {
                    return (
                      <Box key={stat.stat_name}>
                        {stat.stat_name}
                        <Progress size="sm" value={stat.base_stat} />
                      </Box>
                    );
                  })}
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <HStack spacing={3}>
                  {pokemon.types.map((type) => {
                    return <Tag key={type.type_name}>{type.type_name}</Tag>;
                  })}
                </HStack>
              </CardFooter>
            </Card>
          ))}
      </SimpleGrid>
    </Box>
  );
};

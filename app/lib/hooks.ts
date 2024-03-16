import useSWR from "swr";
import { PokemonDTO, StatDTO, TypeDTO } from "../models/PokemonDTO";
import fetcher from "./fetcher";

export const useGetPokemon = () => {
  const { data, error } = useSWR<PokemonDTO>(`/api`, fetcher);
  return {
    pokemon: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTypeFilters = () => {
  const { data, error } = useSWR<TypeDTO>(`/api/filter/types`, fetcher);
  return {
    types: data,
    isLoading: !error && !data,
    isTypeFilterError: error,
  };
};

export const useStatsFilters = () => {
  const { data, error } = useSWR<StatDTO>(`/api/filter/stats`, fetcher);
  return {
    stats: data,
    isLoading: !error && !data,
    isStatsFilterError: error,
  };
};

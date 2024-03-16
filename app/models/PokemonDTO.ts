export interface PokemonDTO {
  name: string;
  id: number;
  pokemonId: number;
  latest_cry: string;
  createdAt: Date;
  updatedAt: Date;
  stats: any[];
  types: any[];
}
export interface StatDTO {
  stat_name: string;
}

export interface TypeDTO {
  type_name: string;
}

import { Pokemon, PokemonDefinitionAttribute } from './Pokemon';

export class Pokedex {
  private pokemons: Pokemon[] = [];

  public addPokemon(pokemon: Pokemon): void {
    if (pokemon instanceof Pokemon) {
      this.pokemons.push(pokemon);
    }
  }

  public getById(id: number): Pokemon | null {
    return this.getBy('id', id);
  }

  public getByName(name: string): Pokemon | null {
    return this.getBy('name', name);
  }

  public toJSON() {
    return this.pokemons.map(poke => poke.toJSON());
  }

  public get length() {
    return this.pokemons.length;
  }

  private getBy(attribute: PokemonDefinitionAttribute, value: any): Pokemon | null {
    return this.pokemons.find(pokemon => pokemon[attribute] === value) || null;
  }
}

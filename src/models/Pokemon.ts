export interface IPokemonDefinition {
  id: number;
  name: string;
  height: number;
  weight: number;
  order: number;
}

export type PokemonDefinitionAttribute = keyof IPokemonDefinition;

export class Pokemon {
  public id: number;
  public name: string;
  public height: number;
  public weight: number;
  public order: number;

  constructor({ id, name, height, weight, order }: { id: number; name: string; height: number; weight: number; order: number }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.order = order;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      height: this.height,
      weight: this.weight,
      order: this.order,
    };
  }
}

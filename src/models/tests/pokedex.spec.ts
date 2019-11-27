import { expect } from 'chai';
import { Pokedex } from '../Pokedex';
import { Pokemon } from '../Pokemon';

describe('Pokedex class', () => {
  it('should return a pokedex instance', done => {
    // const p = new Pokemon({ id: 1, name: 'Boulou', height: 12, weight: 3, order: 1 });
    const p = new Pokedex();
    expect(p instanceof Pokedex).to.equal(true);

    done();
  });

  it('should return a pokedex instance with 2 pokemons inside', done => {
    const p = new Pokedex();
    const poke1 = new Pokemon({ id: 1, name: 'Boulou', height: 12, weight: 3, order: 1 });
    const poke2 = new Pokemon({ id: 2, name: 'Billy', height: 15, weight: 200, order: 2 });
    p.addPokemon(poke1);
    p.addPokemon(poke2);

    expect(p.length).to.equal(2);

    done();
  });
});

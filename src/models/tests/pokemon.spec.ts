import { expect } from 'chai';
import { Pokemon } from '../Pokemon';

describe('Pokemon class', () => {
  it('should return a pokemon instance', done => {
    const p = new Pokemon({ id: 1, name: 'Boulou', height: 12, weight: 3, order: 1 });
    expect(p instanceof Pokemon).to.equal(true);

    done();
  });
});

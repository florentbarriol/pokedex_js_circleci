import fastify from 'fastify';
import * as http from 'http';
import pokedexJson from './collections/pokedex.json';
import { Pokedex } from './models/Pokedex';
import { Pokemon } from './models/Pokemon';

interface IPokemonJson {
  id: number;
  identifier: string;
  height: number;
  weight: number;
  order: number;
}

const server = fastify({ logger: true });
const pokedex = new Pokedex();

pokedexJson.forEach((pokemonJson: IPokemonJson) => {
  pokedex.addPokemon(
    new Pokemon({
      id: pokemonJson.id,
      name: pokemonJson.identifier,
      height: pokemonJson.height,
      weight: pokemonJson.weight,
      order: pokemonJson.order,
    }),
  );
});

const pokemonSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    height: {
      type: 'number',
    },
    weight: {
      type: 'number',
    },
    order: {
      type: 'number',
    },
  },
};

const pokedexSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: pokemonSchema,
    },
  },
};

const optsHome = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
};

const pokedexOpts = {
  schema: {
    response: {
      200: pokedexSchema,
    },
  },
};

const pokemonOpts = {
  schema: {
    response: {
      200: pokemonSchema,
    },
  },
};

function getHomeHandler(req: fastify.FastifyRequest<http.IncomingMessage>, reply: fastify.FastifyReply<http.ServerResponse>) {
  reply.header('Content-Type', 'application/json').code(200);
  reply.send('Boulou');
}

function listAllHandler(req: fastify.FastifyRequest<http.IncomingMessage>, reply: fastify.FastifyReply<http.ServerResponse>) {
  reply.header('Content-Type', 'application/json').code(200);
  reply.send({ items: pokedex.toJSON() });
}

function getPokemonById(req: fastify.FastifyRequest<http.IncomingMessage>, reply: fastify.FastifyReply<http.ServerResponse>) {
  const id = parseInt(req.params.id, 10);
  const pokemon = pokedex.getById(id);

  if (!pokemon) {
    reply.code(404);

    return;
  }

  reply.header('Content-Type', 'application/json').code(200);
  reply.send(pokemon);

  return;
}

function getPokemonByName(req: fastify.FastifyRequest<http.IncomingMessage>, reply: fastify.FastifyReply<http.ServerResponse>) {
  const pokemon = pokedex.getByName(req.params.name);

  if (!pokemon) {
    reply.code(404);

    return;
  }

  reply.header('Content-Type', 'application/json').code(200);
  reply.send(pokemon);

  return;
}

server.get('/', optsHome, getHomeHandler);
server.get('/pokemon', pokedexOpts, listAllHandler);
server.get('/pokemon/id/:id', pokemonOpts, getPokemonById);
server.get('/pokemon/name/:name', pokemonOpts, getPokemonByName);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const host = process.env.HOST || '0.0.0.0';

server.listen(port, host, err => {
  if (err) throw err;
  console.log(`server listening on port ${port}`);
});

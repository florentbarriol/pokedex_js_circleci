FROM node:10.16.0-alpine
LABEL maintainer="coquelet.c@gmail.com"
LABEL name="pokedexJS"

WORKDIR /usr/src/app
ARG IMAGE_VERSION

ENV NODE_ENV=production
ENV PORT=3000
ENV IMAGE_VERSION=${IMAGE_VERSION:-development}

COPY . .

RUN npm i

RUN npm run build

EXPOSE $PORT

CMD ["npm", "run", "run"]

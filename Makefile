# Docker part
docker__build:
	docker build -t ${USER}/pokedex_js .

docker__up:
	docker run --name pokedex_js -p 5000:5000 ${USER}/pokedex_js

docker__stop:
	docker stop pokedex_js

docker__rm:
	docker rm pokedex_js

docker__down:  docker__stop docker__rm

docker__image-rm:
	docker image rm ${USER}/pokedex_js

# js part

install-deps:
	npm i

unit-test:
	npm test

check:
	npm run check

lint:
	npm run lint

start:
	npm start

start-dev:
	npm start:dev

build:
	npm run build

clean:
	rm -Rf build
	rm -Rf node_modules

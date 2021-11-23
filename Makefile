include .env

.PHONY: migration

migration:
	yarn typeorm migration:run

.PHONY: dev

dev:
	yarn dev

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f

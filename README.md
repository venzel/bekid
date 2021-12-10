# BeKid - Back-end

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/venzel/bekid-backend/blob/master/LICENSE)

> **BeKid** é uma aplicação para o mapeamento de emoções e auxílio no combate ao bullying escolar.<br /> <a href="http://bekid.app">👉 bekid.app</a>

<p align="center"><img src="./media/logos/bekid-v1.png" width="240" /></p>

## Autores

👉 <a href="https://www.linkedin.com/in/venzel">Edivam Enéas de Almeida Júnior</a><br />
👉 <a href="https://www.linkedin.com/in/joab-maia-383097202">Joab da Silva Maia</a>

## Backend

-   NodeJs / Express / Jest
-   Typescript
-   TypeORM / Postgres / MongoDB / Redis

## Arquitetura

### Porque Feature by Package?

Feature by Package (FBP) é uma arquitetura que utiliza conceitos do **DDD (Domain Driven Design)**, sugerida por empresas como a **Rocketseat**, com o objetivo de tornar o código mais **flexível**, **escalável** e de **manutenção simples**.

### Vantagens da arquitetura

-   **Manutenção**: Facilita o engajamento de multiplas equipe e colaboradores em um projeto;
-   **Escalável**: Facilita refatoramento do código monolítico para uma uma estrura de microserviços;
-   **SOLID**: Facilita a aplicação de todos os princípios do SOLID;
-   **Git**: Melhora o gerenciamento dos commits, evitando conflitos e etc;
-   **Testes**: Facilita o desenvolvimento de testes de unidade e integração.

### Outras informações

O projeto tem como gerencimento de pacotes o **Yarn** e o **Makefile** como automação de comandos, além disso, o Postgres, MongoDB e Redis são containers do **Docker**.

## Diagrama

\* importante observar nesse primeiro momento, apenas os relacionamentos.

<p align="center"><img src="./media/diagrams/diagram-v4.png" width="600" /></p>

## Links

👉 <a href="https://github.com/venzel/bekid-tcc">Repositório TCC</a><br />
👉 <a href="https://github.com/venzel/bekid-frontend">Repositório do front-end</a><br />
👉 [FAQ geral](./FAQ.md)

## Gitflow

<p align="center"><img src="./media/images/gitflow-v1.png" width="500" /></p>

👉 [Documentação passo a passo](./faq/gitflow.md)

## Como executar o projeto

### Pré-requisitos

-   NodeJs v16.9.1
-   Yarn v1.21.1
-   Docker v20.10.11, build dea9396
-   Docker compose v1.29.2, build 5becea4c

```bash
# Para clonar repositório
git clone https://github.com/venzel/bekid-backend

# Para entrar na pasta do projeto
cd bekid-backend

# Para subir o container do mysql na porta 3306
make up

# Para executar o projeto na porta 3000
make run
```

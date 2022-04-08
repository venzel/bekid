# GITFLOW

[Ir para README](../../README.md)

## Autor da FAQ

👉 <a href="https://www.linkedin.com/in/venzel">Edivam Enéas de Almeida Júnior</a><br />

> O Gitflow Worflow é um fluxo de trabalho do Git que auxilia o desenvolvimento contínuo de software entre a equipe envolvida.<br /><br />👉 <a href="https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow">Mais informações</a>

\* Se faz necessários os conhecimentos básicos sobre git.

## Como funciona nosso fluxo

Cada projeto e suas equipes podem optar por um determinado fluxo, abaixo é demonstrado o método que adotamos e as responsabilidade para cada membro da equipe.

![GitFlow](../images/gitflow-v1.png)

## Branchs

<p align="center">
    <img src="./media/images/gitflow-v1.png" alt="Gitflow" width="700" />
</p>

-   **user** - Envia commits apenas para o próprio user, exemplo: tiago-feature-21.
-   **develop** - Recebe merges dos users. (**Ambiente de QA**)
-   **master** 🔒 - Recebe merges da develop, no final de uma release. (**Ambiente de produção**)

### Diretrizes

\* A branch **master** 🔒 é bloqueada para receber commits de usuários.<br /> \* A branch **master** representa o software em **produção**.<br /> \* A branch **develop** representa o software em **QA**.<br /> \* Fica determinado que sempre que um merge request na branch develop for aprovado ou reprovado, a branch do usuário **NÃO** será deletada, a fim de manter o histórico de branchs.

👉 [Documentação completa do gitflow - passo a passo](./media/docs/gitflow.md)

1 - Clona o repositório

```bash
git clone https://github.com/venzel/bekid.git
```

2 - Criar uma branch com seu nome a partir da branch develop

```bash
# Tiago é um nome fictício, modifique para seu nome
git checkout -b tiago-new-feature origin/develop
```

3 - Todos os dias antes de iniciar as atividades de desenvolvimento e alteração de código, sempre fazer um pull da branch develop, para sincronizar tudo o que foi enviado para branch develop.

```bash
# Importante, estando na branch tiago
git pull origin develop
```

4 - Para enviar um commit para sua branch

```bash
# Tiago é um nome fictício, modifique para seu nome
git push origin tiago
```

5 - Para criar uma branch a partir da develop

```bash
git checkout -b tiago-new-feature
```

6 - Após a conclusão de um bloco de desenvolvimento, solicitar um push request para a nova branch

```bash
git push origin tiago-new-feature
```

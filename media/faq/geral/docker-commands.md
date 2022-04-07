# Docker commands

[FAQ](../FAQ.md)

### Informacoes do docker

```bash
$ sudo docker info
```

### Lista todos os comandos

```bash
$ sudo docker
```

## [IMAGE]

### Listar images

```bash
$ sudo docker images
```

### Listar todas as imagens que possue e que ja foram deletadas

```bash
$ sudo docker images -a
```

### Historico de images

```bash
# Verifica as camadas ou commits que foram sendo adicionados
$ docker image history <IMAGE_ID>
```

### Remover image

```bash
# Remove quantas images quiser
$ sudo docker image rm <IMAGE_ID> <IMAGE_ID> <IMAGE_ID>
```

### Fazer pull de uma image do nginx

```bash
# Na versao stable
$ sudo docker pull nginx:stable
```

## [TAG]

### Lista as images

```bash
$ sudo docker images -a
```

### Tagueia uma image

```bash
# Utilizado para fazer um push das images comitadas
$ sudo docker image tag <IMAGE_ID> venzel/nginx:latest
```

## [CONTAINER]

### Subir um container a partir de uma image

```bash
$ sudo docker container run --publish 8081:80 --detach --name xuxa nginx:stable

  # FLAGS
  # --detach: roda em background
```

### Listar os containers que estao ativos

```bash
$ sudo docker container ls
```

### Listar os containers ativos e nao ativos

```bash
$ sudo docker container ls -a
```

### Rodar um container existente

```bash
# Vai rodar na mesma porta que rodou anteriormente
$ docker container start <NAME>
$ docker container start <CONTAINER_ID>
```

### Parar um container

```bash
$ sudo docker container stop <NAME>
$ sudo docker container stop <CONTAINER_ID>
```

### Remover container

```bash
# Remove quantos containers quiser
$ sudo docker container rm <CONTAINER_ID> <CONTAINER_ID> <CONTAINER_ID>
```

### Renomear container

```bash
$ sudo docker container rename <CONTAINER_ID> <NOVO_NOME>
```

### Remover todos os containers parados

```bash
$ sudo docker container prune
```

### Lista os processos que estao rodando de um container

```bash
$ sudo docker container ls -a
$ sudo docker container top <NAME>
```

### Informacoes detalhadas de um container

```bash
# Exemplo: a porta que foi mapeada, quando foi criado, ip, etc...
$ sudo docker container ls -a
$ sudo docker container inspect <NAME>
```

### Statisticas de consumo dos containers:

```bash
# CPU, memoria, numero de processos
$ sudo docker container stats
```

## [VOLUME]

### Inspecionar um volume

```bash
$ sudo docker volume inspect <ID_VOLUME>
```

### Remover um volume

```bash
# OBS: volumes em uso, nao pode ser removido!
$ docker volume rm <ID_VOLUME>
```

## [COMMIT]

### Commit de um container

```bash
# Gera uma nova image
$ sudo docker container commit -m "install nvm" <CONTAINER_ID>
```

## [NETWORK]

### Sobe 2 containers

```bash
# OBS: na rede default que eh a bridge
$ sudo docker run -d -v $(pwd):/workspace -p 8081:8181 --name cloud81 <IMAGE_ID> --auth venzel:venzel
$ sudo docker run -d -v $(pwd):/workspace -p 8082:8181 --name cloud82 <IMAGE_ID> --auth venzel:venzel
```

### Listar as networks

```bash
$ sudo docker network ls
```

### Adicionar uma network

```bash
$ sudo docker network create rede_venzel
```

### Sobe o terceiro container na nova rede

```bash
$ sudo docker run -d -v $(pwd):/workspace -p 8083:8181 --name cloud83 --network rede_venzel <IMAGE_ID> --auth venzel:venzel

# FLAGS
# -v: caminho volume
```

### Remover network

```bash
$ sudo docker network rm <NETWORK_ID_OR_NAME>
```

### Conecta os 2 containers na nova rede venzel

```bash
$ sudo docker network connect rede_venzel cloud81
```

### Para desconectar um container de uma rede

```bash
$ sudo docker network disconnect <CONTAINER_ID_OR_NAME>
```

### Pega as informacoes da rede

```bash
$ sudo docker network inspect rede_venzel
```

### Pinga uma maquina

```bash
$ ping 172.17.0.4
```

## [USUARIO DOCKER]

### Adiciona usuario

```bash
# OBS: logado como root
$ useradd -m -s /bin/bash <usuario>
```

### Seta uma senha para o usuario

```bash
$ passwd <usuario>
```

### Dar permissao para executar o docker ao usuario

```bash
$ usermod -a -G docker <usuario>
```

### Reinicia o docker

```bash
$ systemctl restart docker
```

### Altera para o novo usuario

```bash
$ su - <usaurio>
```

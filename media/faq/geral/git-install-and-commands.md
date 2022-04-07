# Git install and commands

[FAQ](../FAQ.md)

> **Atencao:** desconsidere o uso de acentos

### Gerenciamento de versionamento

```bash
# Documentacao: https://dev.to/nishina555/how-to-ignore-files-already-managed-with-git-locally-19oo

# Exclui a gestao LOCAL do arquivo pelo git
$ git update-index --skip-worktree yarn.lock

# Restaura a gestao LOCAL do arquivo pelo git
$ git update-index --no-skip-worktree yarn.lock

# Exclui a gestao do arquivo pelo git
$ git update-index --assume-unchanged yarn.lock

# Restaura a gestao do arquivo pelo git
$ git update-index --no-assume-unchanged yarn.lock
```

### Remover arquivo do cache de gerenciamento

```bash
# Documentacao: https://dev.to/nishina555/how-to-ignore-files-already-managed-with-git-locally-19oo

# Necessario fazer um commit
$ git rm --cached yarn.lock
```

## [INSTALACAO]

#### Instala as dependencias necessarias para instalacao do git

```bash
$ apt-get install libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev
```

#### Instala o git

```bash
$ apt-get install git
```

#### Instala o meld

```bash
$ apt-get install meld
```

#### Versao do git

```bash
$ git --version
```

#### Desinstala o git e suas dependencias

```bash
$ apt-get purge --auto-remove git
```

#### Visualizar alias configurados

```bash
$ git alias
```

## [SSH]

> **Documentacao:** multiplas chaves: https://gist.github.com/jexchan/2351996

### Gera chave publica comando rapido

```bash
# IMPORTANTE: vai ser criado no diretorio atual
$ ssh-keygen -t rsa -b 4096 -C "<email>"
```

### Arquivo com a chave publica gerada

```bash
$ cat /home/<seu_usuario>/.ssh/<nome_chave>.pub
```

### [CHMOD]

```bash
# Seta a opcao filemode = false
$ git config --global core.filemode false

# Edita o arquivo config
$ sudo nano .git/config

  # ALTERA
  [core]
    filemode = false

```

### [.GITIGNORE]

```
# Forca a fazer a comitar a pasta upload
!uploads/.gitkeep
```

## [INIT]

### Inicia um novo git localmente, para trabalho em rede, toda estrutura de pastas identicas aos arquivos da .git

```bash
$ git init --bare
```

### Inicia um novo git no usuario

```bash
$ git init
```

## [REMOTE]

### Lista os remotes

```bash
$ git remote -v
```

### Adiciona um caminho remoto ao origin

```bash
$ git remote add origin <caminho_local_ou_remoto>
```

### Altera o caminho remoto do origin

```bash
$ git remote set-url origin <caminho_local_ou_remoto>
```

### Remove um remote

```bash
$ git remote rm <nome_referencia>
```

## [CONFIG]

### Lista configuracoes globais

```bash
$ git config --global -l
```

### Editar o arquivo global de configuracoes

```bash
$ git config --global --edit
```

### Informacoes de configuracoes especificas

```bash
$ git config -l
```

### Edita arquivo de configuracoes

```bash
$ nano ~/.gitconfig
```

### Adiciona as credenciais de nome

```bash
$ git config --global user.name "<nome_usuario>"
```

### Adiciona as credenciais de e-mail

```bash
$ git config --global user.email "<email_usuario>"
```

### Adicionar cache de senha

```bash
$ git config --global credential.helper cache
```

### Adicionar cache de senha com expiracao de senha

```bash
$ git config --global credential.helper 'cache --timeout=3600'
```

### Remover cache de senha

```bash
$ git config --global --unset credential.helper
```

### Modifica o editor global de quando executar: git commit (IMPORTANTE)

```bash
$ git config --global core.editor code
```

### Editar as configuracoes no editor

```bash
$ git config --global -e

  # [core]
  #  editor = code --wait
```

### Modifica o editor de gerenciamento de conflitos de merge

```bash
$ git config --global merge.tool meld
```

### Cria uma configuracao padrao para o .gitignore

> Pega um modelo ja existente, e aplica para todos os outros projetos
> Nesse caso abaixo, o modelo existente eh o arquivo: ~/.gitignore

```bash
$ git config --global core.excludesfile ~/.gitignore
```

## [ADD]

### Adiciona na staged

```bash
$ git add .
```

### Tando adiciona na staged, quanto remove no git directory, substitui: git rm e git add .

```bash
$ git add --all
```

## [REMOVE]

### Remove arquivo do working directory e git directory

> **OBS:** nao vai ser apagado do historico, apenas do commit

```bash
$ rm <file_name>
$ git rm <file_name>
```

### Remove arquivo(s) [IMPORTANTE, MUITO UTILIZADO, TESTAR MAIS]

```bash
$ git rm -rf <pata_ou_arquivo> --cached
```

### Remover da staged area

```bash
$ git restore --staged <arquivo>
```

### Remove todos os arquivos da staged

```bash
$ git restore --staged .
```

## [COMMIT]

### Commit simples

```bash
$ git commit -m "<descricao>"
```

### Commit detalhado, vai abrir o arquivo no editor, para descrever tudo

```bash
$ git commit
```

### Adiciona e comita

```bash
$ git commit -am "<descricao>"
```

### Replace do ultimo commit mantendo a mesma mensagem

> **OBS:** Remove ultimo commit

```bash
$ git commit --amend --no-edit
```

### Replace do ultimo commit alterando a mensagem

> **OBS:** Remove ultimo commit

```bash
$ git commit -m "<mensagem>" --amend
```

## [DIFF]

### Verifica modificacoes em todos os arquivos

```bash
$ git diff
```

### Verifica as modificacoes em um arquivo especifico

```bash
$ git diff <arquivo>
```

### Verifica as modificacoes ignorandos espacos

```bash
$ git diff -w
```

### Compara os arquivos da staged area com o git directory

```bash
$ git diff --staged
```

### Compara dois commits

```bash
$ git diff <comit_a> <comit_b>
```

## [BRANCH]

### Visualiza todos os branchs

```bash
$ git branch
```

### Lista todos os branchs locamente e remotamente

```bash
$ git branch -a
```

### Cria um branch

```bash
$ git branch <nome_novo_branch>
```

### Cria um branch e automaticamente e entra nele

```bash
$ git checkout -b <nome_novo_branch>
```

### Entra no branch

```bash
$ git checkout <nome_branch_existente>
```

### Deleta uma branch

```bash
$ git branch -D <nome_branch_existente>
```

### Deletar uma branch do repositior, necessario estar em outra branch, master ou outra

```bash
$ git push origin dev --delete
```

### Envia branch para o repositorio origin

```bash
$ git push origin dev
```

## [LOG]

### Historico de logs

```bash
$ git log
$ git log --oneline
$ git log --graph
```

### Logs geral

```bash
$ git log --graph --all --oneline --decorate
```

## [FETCH]

### Sincroniza os commits

```bash
$ git fetch
```

## [MERGE]

### Merge de uma branch

```bash
$ git merget <nome_branch>
```

### Merge tool

```bash
$ git mergetool
```

### Abortar um merge com conflitos

```bash
$ git merge --abort
```

## [REFLOG]

### Exibe todo historico do que foi feito no git

```bash
$ git reflog
```

## [RESET]

### Volta para um commit

```bash
$ git reset --hard <commit>
```

## [REBASE]

> **Documentacao**: [youtube.com...](https://www.youtube.com/watch?v=0MVXlGQe9nU)

### REBASE / Alterar historico de commit

```bash
# Abre os 3 ultimos commits na ordem inversa
$ git rebase -i HEAD~3

  # ABRE NO VS CODE
  # Altera um commit de pick -> reword
  # Salva o arquivo
  # Uma nova janela para renomear o commit
```

### REBASE / Comandos

```
# Comandos:
# p, pick = use commit
# r, reword = renomear commit
# e, edit = editar commit
# s, squash = unir commits, opcao de alterar descricao do commit
# f, fixup = similar ao squash, porem mantem o nome do primeiro commit
# x, exec = executa comando
# d, drop = remove commit
```

## [CHECKOUT]

### Desfazer alteracoes

> **OBS:** de arquivos ja comitados, ou seja, na working directory

```bash
$ git checkout <arquivo>
```

### Desfazer todas as alteracoes

> **OBS:** de arquivos ja comitados, ou seja, na working directory

```bash
$ git checkout .
```

### Voltar em um commit

```bash
$ git checkout <hash_commit>
```

### Voltar em um commit e ja criar uma branch (IMPORTANTE, MUITO UTIL)

```bash
$ git checkout <hash_commit> -b <nome_nova_branch>
```

### Ir para o commit do topo

```bash
$ git checkout master
```

### Copiar uma branch e jah fazer o checkout nela

```bash
$ git checkout upstream/dev -b dev
```

## [STASH]

### Adiciona as alteracoes em uma stash

> **OBS:** de arquivos ja comitados, ou seja, na working directory

```bash
$ git stash
```

### Lista os stashs

```bash
$ git stash list
```

### Ativa a ultima stash

```bash
$ git stash apply
```

### Ativa a ultima stash e dropa

```bash
$ git stash pop
```

### Exclui stash

> **OBS:** importante quando retomar as atividades, excluir as stashs

```bash
$ git stash drop <nome_stash>
```

## [ISSUE]

### Fecha issue com commit

```bash
$ git commit -m "<mensagem> - fix #<id_issue>"
```

## [CLI]

> **Documentacao:** https://github.com/github/hub

> **Tutorial:** https://www.youtube.com/watch?v=u3V7mSPkYyk&t=64s

### Instalacao

```bash
$ snap install hub --classic
```

### Configura o protocol

```bash
$ git config hub.protocol ssh
```

### Versao

```bash
$ hub version
```

### Criar um novo repositorio

```bash
$ hub create
```

### Clonar repositorio

```bash
$ hub clone <usuario>/<repositorio>
```

### Ajuda sobre issue

```bash
$ hub issue -h
```

### Exibir as issues com limite 10

```bash
$ hub issue --limit 10
```

### Exibir as issues fechadas

```bash
$ hub issue -s closed
```

### Exibir descricao da issue

```bash
$ hub issue show <id_ussue>
```

### Compartilhar o conteudo de um arquivo em uma gist

> **Atencao:** necessario o pacote xsel<br /> > **Atencao:** quando executa o comando ctrl+c eh executado

```bash
$ hub gist create --copy <arquivo> --public
```

### Listar dados da api

```bash
$ hub api users/<nome_usuario>
```

# PHP FPM install and configure

[FAQ](../FAQ.md)

## [INSTALACAO]

```bash
# Primeiro atualiza o sistema
apt-get update

# Instala as propriedades do common
apt-get -y install software-properties-common

# Adiciona o repositorio
add-apt-repository ppa:ondrej/php

# Atualiza novamente o sistema
apt-get update

# Ultimo passo, instala os modulos abaixo
sudo apt-get install php7.4-fpm php7.4-mysql php7.4-zip php7.4-gd php7.4-xml php7.4-curl

# Visualiza a versao
php -v

# Informacoes de todos os modulos instalados
sudo dpkg --get-selections | grep -v deinstall | grep php

# RESULTADO
php-common        install [IMPORTANT]
php7.4-cli        install
php7.4-common     install
php7.4-curl       install
php7.4-fpm        install
php7.4-gd         install
php7.4-json       install
php7.4-mysql      install
php7.4-opcache    install
php7.4-readline   install
php7.4-xml        install
php7.4-zip        install
```

## [SEGURANCA]

```bash
# Abre o arquivo de configuracao do php
nano /etc/php/7.4/fpm/php.ini

# BUSCA/ALTERA
# habilita e seta 0 para seguranca de acesso a arquivos
cgi.fix_pathinfo = 0
```

## [OTIMIZACAO]

```bash
# Otimiza a quantidade de processos filhos
nano /etc/php/7.4/fpm/pool.d/www.conf

# ALTERA
pm = static # Altera essa linha, por padrao eh dynamic
pm.max_children = 10 # Altera essa linha, por padrao o valor eh 5
```

## [LOG]

```bash
# Visualiza os logs do php-fpm
cat /var/log/php7.4-fpm.log
```

## [STATUS/RESTART]

```bash
# Visualiza o status do servico
service php7.4-fpm status

# Reinicializa o servico
service php7.4-fpm restart
```

## [REMOVE AND PURGE]

```bash
# O common remove todos os pacotes
sudo apt-get purge php7.4-common
```

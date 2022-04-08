# Nginx - install and configure

[INICIO](../README.md)

> **Documentacao:** [digitalocean.com...](https://www.digitalocean.com/community/tutorials/how-to-increase-pagespeed-score-by-changing-your-nginx-configuration-on-ubuntu-16-04)

## [INSTALACAO]

```bash
# Vai para raiz
cd ~/

# Lista as assinaturas
sudo apt-key list

# Adiciona a assinatura key do nginx oficial
sudo curl -O https://nginx.org/keys/nginx_signing.key && apt-key add ./nginx_signing.key

# Adiciona os repositórios da versao estavel do nginx
sudo nano /etc/apt/sources.list

# Adiciona os repositorios:
sudo deb http://nginx.org/packages/ubuntu/ focal nginx
sudo deb-src http://nginx.org/packages/ubuntu/ focal nginx

# Baixa os pacotes novos
sudo apt-get update

# Instala o NGINX
sudo apt-get install nginx
```

## [COMANDOS]

```bash
# Visualizar a versao do nginx
nginx -v

# Configuracoes ok?
nginx -t

# Status
sudo service nginx status

# Inicializa
sudo service nginx start

# Reinicia
sudo service nginx restart

# Inicializa
sudo service nginx stop
```

## [CONFIGURACOES]

### CONFIGURACOES / nginx.conf

```bash
# Edita o arquivo nginx.conf
sudo nano /etc/nginx/nginx.conf

# ALTERA
user www-data;
worker_processes 1;
```

### CONFIGURACOES / snippets (PASTA)

```bash
# Cria a pasta snippets e acessa
sudo mkdir /etc/nginx/snippets && cd /etc/nginx/snippets && ls -la
```

### CONFIGURACOES / port.conf

```bash
sudo nano /etc/nginx/snippets/port.conf

# INSERE
listen 80;

# Caso seja privado, INSERE
listen 127.0.0.1:80;
```

### CONFIGURACOES / gzip.conf

```bash
sudo nano /etc/nginx/snippets/gzip.conf

# INSERE
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_vary on;
```

### CONFIGURACOES / cfg.conf

```bash
sudo nano /etc/nginx/snippets/cfg.conf

# INSERE
location / {
        index index.php index.html index.htm;
        try_files $uri $uri/ /index.php?\$args;
}

location /nginx_status {
        access_log off;
        allow 127.0.0.1;
        deny all;
}

location ~ /\.git {
        deny all;
}

location ~ /.well-known {
        allow all;
}

location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
}

location ~ /\.ht {
        deny all;
}

gzip_types
application/atom+xml
application/javascript
application/json
application/ld+json
application/manifest+json
application/rss+xml
application/vnd.geo+json
application/vnd.ms-fontobject
application/x-font-ttf
application/x-web-app-manifest+json
application/xhtml+xml
application/xml
font/opentype
image/bmp
image/svg+xml
image/x-icon
text/cache-manifest
text/css
text/plain
text/vcard
text/vnd.rim.location.xloc
text/vtt
text/x-component
text/x-cross-domain-policy;
```

### CONFIGURACOES / fastcgi-php.conf

```bash
sudo nano /etc/nginx/snippets/fastcgi-php.conf

# INSERE
fastcgi_split_path_info ^(.+\.php)(/.+)$;
try_files $fastcgi_script_name = 404;
set $path_info $fastcgi_path_info;
fastcgi_param PATH_INFO $path_info;
fastcgi_index index.php;
include fastcgi.conf;
```

### CONFIGURACOES / fastcgi.conf

```bash
sudo nano /etc/nginx/fastcgi.conf

# INSERE
fastcgi_param SCRIPT_FILENAME           $document_root$fastcgi_script_name;
fastcgi_param QUERY_STRING              $query_string;
fastcgi_param REQUEST_METHOD            $request_method;
fastcgi_param CONTENT_TYPE              $content_type;
fastcgi_param CONTENT_LENGTH            $content_length;

fastcgi_param SCRIPT_NAME               $fastcgi_script_name;
fastcgi_param REQUEST_URI               $request_uri;
fastcgi_param DOCUMENT_URI              $document_uri;
fastcgi_param DOCUMENT_ROOT             $document_root;
fastcgi_param SERVER_PROTOCOL           $server_protocol;
fastcgi_param REQUEST_SCHEME            $scheme;
fastcgi_param HTTPS                     $https if_not_empty;

fastcgi_param GATEWAY_INTERFACE         CGI/1.1;
fastcgi_param SERVER_SOFTWARE           nginx/$nginx_version;

fastcgi_param REMOTE_ADDR               $remote_addr;
fastcgi_param REMOTE_PORT               $remote_port;
fastcgi_param SERVER_ADDR               $server_addr;
fastcgi_param SERVER_PORT               $server_port;
fastcgi_param SERVER_NAME               $server_name;

fastcgi_param REDIRECT_STATUS           200;
```

## [VIRTUAL HOST]

### VIRTUAL HOST (DEFAULT)

```bash
sudo nano /etc/nginx/conf.d/default.conf

# CONTEUDO
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;

    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### VIRTUAL HOST (PROJETO)

```bash
# Edita ou cria
sudo nano /etc/nginx/conf.d/projeto.conf

# INSERE
server
{
        include snippets/port.conf;
        include snippets/gzip.conf;

        server_name <nome>.com.br www.<nome>.com.br;
        root /var/www/<nome>/html;

        access_log /var/www/<nome>/logs/access.log;
        error_log /var/www/<nome>/logs/error.log;

        include snippets/cfg.conf;
}
```

### VIRTUAL HOST (API)

```bash
# Edita ou cria
sudo nano /etc/nginx/conf.d/api.conf

# INSERE
server {
        server_name api.venzel.com.br;
        listen 80;

        location /nginx_status {
                #stub_status on;
                #server_tokens off;
                access_log off;
                allow 127.0.0.1;
                deny all;
        }

        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_cache_bypass $http_upgrade;
        }
}
```

## [DESINSTALACAO]

```bash
# Remove o nginx e e mantém as configuracoes
sudo apt-get remove nginx nginx-common

# Remove o nginx e todas as configuracoes
sudo apt-get purge nginx nginx-common

# Apos remover o nginx executa o comando para limpar tudo
sudo apt-get autoremove
```

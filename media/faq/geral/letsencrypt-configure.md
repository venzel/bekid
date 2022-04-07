# Letsencrypt configure

[FAQ](../FAQ.md)

## Go to ~

```bash
cd ~
```

## Clone repository

```bash
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
```

## Edit .conf

```bash
sudo nano /etc/nginx/conf.d/bekid_app.conf

# INSERT
location ~ /.well-known
{
	allow all;
}
```

## Test nginx

```bash
sudo nginx -t
```

## Install ssl

```bash
# IMPORTANT: before install python 3.6
cd /opt/letsencrypt && sudo ./letsencrypt-auto certonly -a webroot --webroot-path=/var/www/bekid_app/html -d bekid.app -d www.bekid.app
```

## View ssl

```bash
ls -l /etc/letsencrypt/live/bekid.app
```

## Copile dhparam

```bash
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

## Create file to configuration

```bash
sudo nano /etc/nginx/snippets/ssl-bekid_app.conf

# INSERT
ssl_certificate /etc/letsencrypt/live/bekid.app/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/bekid.app/privkey.pem;
```

## Create SSL params

```bash
sudo nano /etc/nginx/snippets/ssl-params.conf

# INSERT
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

## Edit .conf

```bash
sudo nano /etc/nginx/conf.d/bekid_app.conf

# INSERT
server {
    ...
}
server
{
	server_name bekid_app;
	root /var/www/bekid_app/html;
	listen 443 ssl http2;
	listen [::]:443 ssl http2;
	include snippets/ssl-bekid_app.conf;
	include snippets/ssl-params.conf;
}
```

## Restart Nginx

```bash
sudo service nginx restart
```

## Monitore log nginx

```bash
sudo tail -n 20 /var/log/nginx/error.log
```

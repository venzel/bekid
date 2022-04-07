# PM2

[FAQ](../FAQ.md)

> **Atencao:** desconsiderar o uso de acentos

## Add PATH .bashrc

```bash
# Edit .bashrc
$ nano ~/.bashrc
$ nano ~/.zshrc

    # INSERT
    export PATH="$(yarn global bin):$PATH"

# Reload
$ source ~/.bashrc
$ source ~/.zshrc
```

### Install pm2 global

```bash
$ yarn global add pm2
$ npm install pm2 -g
```

### Pemitions

```bash
sudo chown <user>:<user> /home/<user>/.pm2/rpc.sock /home/<user>/.pm2/pub.sock
```

### Para rodar typescript

```bash
$ pm2 install typescript
```

### Start server pm2

```bash
# Alert: before, enter folder autofix
$ sudo pm2 start ./dist/shared/infra/http/app.js --name autofix-server
```

### Stop server pm2

```bash
# Stop
$ pm2 stop node-autofix-server

# Save, important!
$ pm2 save
```

### Add start pm2 init reboot system

```bash
$ pm2 startup ubuntu -u autofix

    # Copy result and execute
    # Require password

# Important: save all process for auto init
$ pm2 save
```

### commands pm2

```bash
# Monitore
$ pm2 monit

# List servers
$ pm2 list

# Logs
$ pm2 log
```

### Options pm2

```bash
# Start service
$ pm2 start server-autofix

# Stop service
$ pm2 stop server-autofix

# Delete service
$ pm2 delete server-autofix

# Deleta todos os servicos
$ pm2 delete all
```

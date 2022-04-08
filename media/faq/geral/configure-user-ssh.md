# Configure user SSH

[FAQ](../FAQ.md)

<hr />

## 1 SERVIDOR

### Acessa o servidor, se a chave for importada corretamente no passo anterior, nao solcita senha

```bash
ssh root@<ip_servidor_master> -p <porta>
```

### Verifique se as chaves foram importadas no acesso do cliente anteriormente

```bash
cat ~/.ssh/authorized_keys

# RESULTADO
chave criptografada
```

### Adiciona o usuario, pedira para criar uma senha, inserir dados nome etc

```bash
# Sera solicitado a senha e confirmacao de senha
adduser <nome_usuario>
```

### Confirma se o usuario foi criado

```bash
cd /home/ && ls -la
```

### Cria a pasta .ssh dentro do super usuario criado

```bash
# Cria recursivamente (-p)
mkdir -p /home/<nome_ususario>/.ssh
```

### Copia a chave do root para o super usuario criado

```bash
cp ~/.ssh/authorized_keys /home/<nome_ususario>/.ssh/authorized_keys
```

### Verifica se o arquivo foi copiado com a chave publica

```bash
cat /home/<nome_ususario>/.ssh/authorized_keys
```

### Adiciona permissao a .ssh

```bash
chown <nome_usuario>:<nome_usuario> /home/<nome_ususario>/.ssh
```

### Insere seguranca no arquivo authorized_keys

```bash
chmod 0644 ~/.ssh/authorized_keys

chmod 0644 /home/<nome_ususario>/.ssh/authorized_keys
```

### Acessa a pasta do .ssh

```bash
cd /home/<nome_ususario>/.ssh
```

### Dentro da pasta /home/<nome_usuario>/.ssh

```bash
chown <nome_ususario>:<nome_ususario> authorized_keys
```

### Adiciona o usuario ao grupo sudo

```bash
usermod -aG sudo <nome_usuario>
```

### Verifica os grupos do usuario

```bash
id <nome_usuario>
```

### Edita o arquivo do ssh novamente

```bash
nano /etc/ssh/sshd_config

# Altera a porta de 22 para outra
Port <porta>

# Permite que apenas os usuarios abaixo tenham acesso
AllowUsers <nome_usuario> <nome_usuario> <nome_usuario>

# Remove a opcao de root se logar
PermitRootLogin no

# Remove a autenticacao pelo password
PasswordAuthentication no

# Seta a autenticacao pela chave publica
PubkeyAuthentication yes
```

### Reinicia o servico de ssh

```bash
service sshd restart
```

<hr />

## 2 CLIENTE

### Acessa o super usuario (IMPORTANTE)

```bash
sudo su
```

### Verifica se o servidor possui ja uma chave publica indo em:

```bash
cd ~/.ssh/ && ls -la

# RESULTADO
authorized_keys (DEPENDE)
id_rsa
id_rsa.pub
```

### Gera as chaves publicas

```bash
ssh-keygen
```

### Verifica se a chave publica foi criada

```bash
cat ~/.ssh/id_rsa.pub
```

## Copia a chave pública gerada para o servidor master7

```bash
ssh-copy-id root@<ip_servidor_master> -p <porta>
```

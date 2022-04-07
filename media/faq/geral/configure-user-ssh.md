# Configure user SSH

[FAQ](../FAQ.md)

<hr />

## 1 SERVIDOR

### Edita o arquivo do ssh

```bash
nano /etc/ssh/sshd_config

# Altera a porta de 22 para outra
Port <porta>

# Seta
PermitRootLogin yes
PasswordAuthentication yes
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

```bash
# Copia a chave pública gerada para o servidor master
ssh-copy-id root@<ip_servidor_master> -p <porta>
```

<hr />

## 3 SERVIDOR

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
cd /home/ && ls
```

### Cria a pasta .ssh dentro do super usuario criado

```bash
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

### Insere seguranca no arquivo authorized_keys

```bash
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

### Dentro da pasta /home/ coloca o usuario no grupo sudo, usuario pode se tornar sudo

```bash
cd /home/ && usermod -aG sudo <nome_ususario>
```

### Verifica os grupos do usuario

```bash
cd /home/ && id <nome_usuario>
```

### Reinicia o servico de ssh

```bash
service sshd restart
```

Pronto!

<hr />

## 4 SERVIDOR

### Insere a permissao 0644 para o usuario root, para nao serem insisiradas novas chaves

```bash
chmod 0644 ~/.ssh/authorized_keys
```

### Edita o arquivo do ssh novamente

```bash
nano /etc/ssh/sshd_config

# ADICIONA
AllowUsers <nome_usuario>

# CONFIGURACOES
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
```

### Reinicia o servico de ssh

```bash
service sshd restart
```

Pronto!

<hr />

## 5 SERVIDOR

### Acessa o super usuario (IMPORTANTE)

```bash
sudo su
```

### Gera as chaves publicas

```bash
ssh-keygen
```

### Verifica se as chaves foram criadas

```bash
cd ~/.ssh/ && ls -la
```

# RESULTADO

authorized_keys
id_rsa
id_rsa.pub

### Exibe o valor da chave publica

```bash
cat ~/.ssh/id_rsa.pub
```

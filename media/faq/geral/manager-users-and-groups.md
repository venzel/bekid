# Manager users and groups

[FAQ](../FAQ.md)

### [SUDO]

> **Documentation**: [youtube.com...](https://www.youtube.com/watch?v=aTbEhjvlmxg)

### Edit visudo

```bash
sudo visudo
```

## [PASSWD]

### Show all users

```bash
cat /etc/passwd

# Result
root:x:10:20:desc:/proot:/bin/bash
```

### Filter users

```bash
/etc/passwd | grep venzel

# Result
root:x:10:20:desc:/proot:/bin/bash

# OPCAO
  # root => name user
  # x => password cript /etc/shadow
  # 10 => uid user
  # 20 => gid group
  # desc => cooments optional
  # proot => folder personal
  # /bin/bash => shell default
```

## [SHADOW]

### Info detail

```bash
cat /etc/shadow
```

### Filter user

```bash
cat /etc/shadow | grep venzel

# Result
venzel:!$6$43/:17830:0:99999:7::18383:

# OPCAO
  # venzel => user name
  # ! => password disable
  # $6$43 => password cripto
  # 17830 => days of change password
  # 0 => minimum days that the password can be changed
  # 99999 => days for the password to be changed
  # 7 => password expiration days
  # 18383 => sum of days for password expiration
```

## [CONFIGURATIONS]

### Important setting, edit the file below to create the home folder

```bash
nano /etc/login.defs

# INSERT
CREATE_HOME yes
```

## [ADD]

### [ADDUSER]

> Soh cria a pasta com a flag -d, porque acima foi configurado o create_home

```bash
adduser venzel
```

## [USERDEL]

### Remove user and the flag -r is used to remove all files

```bash
userdel -r venzel
```

## [PASSWD]

### Change password

```bash
passwd venzel
```

### Disable user password

```bash
passwd -l venzel
```

### Enable user password

```bash
passwd -u venzel
```

### Remove user password, only being able to login through the public key

```bash
passwd -d venzel
```

## [USERMOD]

> Documentation: http://guialinux.uniriotec.br/usermod/

### Add user to sudo group

```bash
# Sudo
usermod -aG sudo venzel

# Docker
usermod -aG docker venzel
```

### Change the user's shell, removing the login, serves for tunneling

```bash
usermod -s /usr/sbin/nologin venzel
```

### Change the user's default folder

```bash
usermod -d <caminho_pasta> <nome_usaurio>
```

### Change password expiration

```bash
usermod -e yyyy/mm/dd venzel
```

## [GROUP]

### Show all groups

```bash
cat /etc/group

# Result
sudo:x:27:mago,tiago

# OPTION
  # sudo => group name
  # x => encrypted group password, makes a point to the /etc/gshadow
  # 27 => gid group id
  # mago,tiago => members of group
```

### Add group

```bash
groupadd venzel
```

### Shows which groups a user is in

```bash
groups venzel
```

### Add user exists to an existing group too

> **OBS:** the group of the home folder is not changed

```bash
gpasswd -a venzel <group_name>
```

### Displays users in a specific group

```bash
groupmems -g <group_name> -l
```

### Remove user of group

```bash
gpasswd -d venzel <group_name>
```

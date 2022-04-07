# Git global configs

[FAQ](../FAQ.md)

### Edit file

```bash
git config --global --edit
```

```
[users]
	name = venzel
	email = eneas.eng@yahoo.com

[core]
	editor = code
	excludesfile = ~/.gitignore_global
	filemode = false
	packedGitLimit = 512m
	packedGitWindowSize = 512m
	compression = 0

[pack]
	deltaCacheSize = 128m
	packSizeLimit = 128m
	windowMemory = 128m

[push]
	default = current
	rebase = true

[branch]
	autosetuprebase = always

[commit]
	template = ~/.gitmessage

[color]
	ui = true

[color "status"]
	added = green
	changed = yellow
	untracked = red

[color "branch"]
	current = white
	remote = red

[color "diff"]
	meta = yellow
	old = red
	new = green

[alias]
	edit = config --global --edit
	e = config --global --edit

	lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

    a = add --all

	p = push
	po = push origin
	pom = push origin master

    c = commit -m
    ca = commit --amend --no-edit

    d = diff
    ds = diff --stat
    dc = diff --cached

    s = status -s
    st = status -s

    co = checkout
    cob = checkout -b
    com = checkout master

	rf = restore # Restore file
	ra = restore . # Restore all

    b = "!git for-each-ref --sort='-authordate' --format='%(authordate)%09%(objectname:short)%09%(refname)' refs/heads | sed -e 's-refs/heads/--'"
	l = "!git config -l | grep alias | cut -c 7-"

[user]
	name = venzel
	email = eneas.eng@yahoo.com

[http]
	postbuffer = 5m
```

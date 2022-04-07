# Dump Postgres with Docker

[FAQ](../FAQ.md)

## Backup

```bash
docker exec -t postgres-bekid pg_dumpall -c -U bekid > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```

## Restore

```bash
cat db.sql | docker exec -i postgres-bekid psql -U bekid
```

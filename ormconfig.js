const { mongodb_host, mongodb_port, mongodb_db_name, mongodb_user, mongodb_password } = require('./src/configs/mongodb');
const { postgres_host, postgres_port, postgres_db_name, postgres_user, postgres_password } = require('./src/configs/postgres');

module.exports = [
    {
        name: 'default',
        type: 'postgres',
        host: postgres_host,
        port: postgres_port,
        database: postgres_db_name,
        username: postgres_user,
        password: postgres_password,
        synchronize: true,
        entities: ['src/modules/**/infra/typeorm/postgres/entities/*.ts'],
        migrations: ['src/shared/infra/typeorm/postgres/migrations/*.ts'],
        cli: {
            migrationsDir: 'src/shared/infra/typeorm/postgres/migrations',
        },
    },
    {
        name: 'mongodb',
        type: 'mongodb',
        host: mongodb_host,
        port: mongodb_port,
        database: mongodb_db_name,
        username: mongodb_user,
        password: mongodb_password,
        synchronize: true,
        logging: false,
        useUnifiedTopology: true,
        entities: ['src/modules/**/infra/typeorm/mongodb/schemas/*.ts'],
    },
];

require('dotenv/config');

const environment = process.env.NODE_ENV;

const patch = environment === 'development' ? '.' : '/app';
const folder = environment === 'development' ? 'src' : 'dist';
const file = environment === 'development' ? 'ts' : 'js';

const { mongodb_host, mongodb_port, mongodb_db_name, mongodb_user, mongodb_password } = require('./' + folder + '/configs/mongodb');
const { postgres_host, postgres_port, postgres_db_name, postgres_user, postgres_password } = require('./' + folder + '/configs/postgres');

module.exports = [
    {
        name: 'default',
        type: 'postgres',
        host: environment === 'development' ? 'localhost' : postgres_host,
        port: postgres_port,
        database: postgres_db_name,
        username: postgres_user,
        password: postgres_password,
        synchronize: true,
        entities: [patch + '/' + folder + '/modules/**/infra/typeorm/postgres/entities/*.' + file],
        migrations: [patch + '/' + folder + 'shared/infra/typeorm/postgres/migrations/*.' + file],
        cli: {
            migrationsDir: patch + '/' + folder + '/shared/infra/typeorm/postgres/migrations',
        },
    },
    {
        name: 'mongodb',
        type: 'mongodb',
        host: environment === 'development' ? 'localhost' : mongodb_host,
        port: mongodb_port,
        database: mongodb_db_name,
        username: mongodb_user,
        password: mongodb_password,
        synchronize: true,
        logging: false,
        useUnifiedTopology: true,
        entities: [patch + '/' + folder + '/modules/**/infra/typeorm/mongodb/schemas/*.' + file],
    },
];

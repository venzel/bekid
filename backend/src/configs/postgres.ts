interface IPostgresConfigDTO {
    postgres_host: string;
    postgres_port: string;
    postgres_db_name: string;
    postgres_user: string;
    postgres_password: string;
}

const _postgresHost = (): string => {
    const env = process.env.POSTGRES_HOST;
    if (!env) throw new Error('Error in var ambient: POSTGRES_HOST!');
    return env;
};

const _postgresPort = (): string => {
    const env = process.env.POSTGRES_PORT;
    if (!env) throw new Error('Error in var ambient: POSTGRES_PORT!');
    return env;
};

const _postgresDBName = (): string => {
    const env = process.env.POSTGRES_DB_NAME;
    if (!env) throw new Error('Error in var ambient: POSTGRES_DB_NAME!');
    return env;
};

const _postgresUser = (): string => {
    const env = process.env.POSTGRES_USER;
    if (!env) throw new Error('Error in var ambient: POSTGRES_USER!');
    return env;
};

const _postgresPassword = (): string => {
    const env = process.env.POSTGRES_PASSWORD;
    if (!env) throw new Error('Error in var ambient: POSTGRES_PASSWORD!');
    return env;
};

const config: IPostgresConfigDTO = {
    postgres_host: _postgresHost(),
    postgres_port: _postgresPort(),
    postgres_db_name: _postgresDBName(),
    postgres_user: _postgresUser(),
    postgres_password: _postgresPassword(),
};

const { postgres_host, postgres_port, postgres_db_name, postgres_user, postgres_password } = config;

export { postgres_host };
export { postgres_port };
export { postgres_db_name };
export { postgres_user };
export { postgres_password };

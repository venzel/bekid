interface ITokenConfigDTO {
    token_secret: string;
    token_secret_refresh: string;
    token_expires: number;
}

const _tokenSecret = (): string => {
    const env = process.env.TOKEN_SECRET;
    if (!env) throw new Error('Error in var ambient: TOKEN_SECRET!');
    return env;
};

const _tokenSecretRefresh = (): string => {
    const env = process.env.TOKEN_SECRET_REFRESH;
    if (!env) throw new Error('Error in var ambient: TOKEN_SECRET_REFRESH!');
    return env;
};

const _tokenExpires = (): number => {
    const env = process.env.TOKEN_EXPIRES;
    if (!env) throw new Error('Error in var ambient: TOKEN_EXPIRES!');
    return Number(env);
};

const config: ITokenConfigDTO = {
    token_secret: _tokenSecret(),
    token_secret_refresh: _tokenSecretRefresh(),
    token_expires: _tokenExpires(),
};

const { token_secret, token_secret_refresh, token_expires } = config;

export { token_secret };
export { token_secret_refresh };
export { token_expires };

import 'reflect-metadata';
import 'dotenv/config';
import express, { Express } from 'express';

import { connection } from '../../../database/Connection';
import { middleware } from './Middleware';

class App {
    public execute(): Express {
        const app: Express = express();

        connection.use(app);

        middleware.use(app);

        return app;
    }
}

const app = new App();

export { app };

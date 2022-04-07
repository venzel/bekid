import express, { Express } from 'express';
import { route } from './Route';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import '../../containers';
import * as Sentry from '@sentry/node';
import { sentry_dsn } from '../../../configs/sentry';
import { environment } from '../../../configs/geral';
import { avatars_folder } from '../../../configs/storage';
import { exception } from './Exception';

class Middleware {
    public use(app: Express): void {
        app.use(cors());

        if (environment !== 'development') {
            Sentry.init({ dsn: sentry_dsn, tracesSampleRate: 1.0 });

            app.use(Sentry.Handlers.requestHandler());
        }

        app.use(helmet());

        app.use(morgan('dev'));

        app.use(express.urlencoded({ extended: true }));

        app.use('/file', express.static(avatars_folder));

        app.use(express.json());

        app.use(route.execute());

        if (environment !== 'development') {
            app.use(Sentry.Handlers.errorHandler());
        }

        app.use(exception);
    }
}

const middleware = new Middleware();

export { middleware };

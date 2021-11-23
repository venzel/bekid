import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider';
import { AppException } from '@shared/exceptions/AppException';

class AuthenticateUserMiddleware {
    public authenticate(req: Request, _: Response, next: NextFunction): any {
        const schemaToken: string | undefined = req.headers.authorization;

        if (!schemaToken) {
            throw new AppException('Token not provided!', 404);
        }

        const parts: string[] = schemaToken.split(' ');

        if (parts.length !== 2) {
            throw new AppException('Token parts invalid!', 403);
        }

        const [schema, token] = parts;

        if (schema !== 'Bearer') {
            throw new AppException('Token parts invalid!', 403);
        }

        // TODO: aqui
        const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

        const payload = tokenProvider.validateToken(token);

        req.auth = payload.user;

        return next();
    }
}

export { AuthenticateUserMiddleware };

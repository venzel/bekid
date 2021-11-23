import { Request, Response, NextFunction } from 'express';

class ListUsersValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        // TODO: aqui
        const { count } = req.query;

        return next();
    }
}

export { ListUsersValidator };

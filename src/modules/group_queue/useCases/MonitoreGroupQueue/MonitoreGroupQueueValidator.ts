import { Request, Response, NextFunction } from 'express';

class MonitoreGroupQueueValidator {
    public validate(_: Request, __: Response, next: NextFunction): any {
        return next();
    }
}

export { MonitoreGroupQueueValidator };

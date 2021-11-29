import { Request, Response, NextFunction } from 'express';

import { IRoleDTO } from '../dtos/IRoleDTO';
import { AppException } from '@shared/exceptions/AppException';

class RoleUserMiddleware {
    public role(roles: IRoleDTO | IRoleDTO[]): any {
        return function (req: Request, _: Response, next: NextFunction): any {
            const { role } = req.auth;

            if (typeof roles === 'string' && roles !== 'ALL' && role !== roles) {
                throw new AppException(`Not authorized for this sector, only ${roles}!`, 401);
            } else if (typeof roles === 'object' && !roles.includes(role as IRoleDTO)) {
                throw new AppException(`Not authorized for this sector, only ${roles.join(', ')}!`, 401);
            }

            return next();
        };
    }
}

export { RoleUserMiddleware };

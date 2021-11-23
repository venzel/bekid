import { Request, Response, NextFunction } from 'express';
import { IRoleDTO } from '../dtos/IRoleDTO';
import { AppException } from '@shared/exceptions/AppException';

class RoleUserMiddleware {
    public role(roles: IRoleDTO[]): any {
        return function (req: Request, _: Response, next: NextFunction): any {
            const { role } = req.auth;

            if (!roles.includes(role as IRoleDTO)) {
                throw new AppException(`Not authorized for this sector, only ${roles.join(', ')}!`, 403);
            }

            return next();
        };
    }
}

export { RoleUserMiddleware };

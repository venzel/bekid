import { Request, Response, NextFunction } from 'express';

import { IFindAllUsersContainNameDTO } from '@modules/user/dtos/IFindAllUsersContainName';
import { AppException } from '@shared/exceptions/AppException';

class FindAllUsersContainNameValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name } = req.query;

        const data = {
            name,
        } as IFindAllUsersContainNameDTO; // Important, force typing in this case: QUERY STRING!

        if (!name || data.name.length < 3 || data.name.length > 20) {
            throw new AppException(`User name ${name} invalid!`);
        }

        return next();
    }
}

export { FindAllUsersContainNameValidator };

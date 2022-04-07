import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { FindAllUsersContainNameService } from './FindAllUsersContainNameService';
import { generateStatus } from '@shared/helpers/status';
import { IFindAllUsersContainNameDTO } from '@modules/user/dtos/IFindAllUsersContainName';

class FindAllUsersContainNameController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.query;

        const service = container.resolve(FindAllUsersContainNameService);

        const data = {
            name,
        } as IFindAllUsersContainNameDTO; // Important, force typing in this case: QUERY STRING!

        const user = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, users listed!');

        const docs = classToClass(user);

        return res.status(statusCode).json({ status, docs });
    }
}

export { FindAllUsersContainNameController };

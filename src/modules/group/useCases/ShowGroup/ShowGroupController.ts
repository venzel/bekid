import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ShowGroupService } from './ShowGroupService';
import { generateStatus } from '@shared/helpers/status';

class ShowGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const groupId = req.params.id?.toString();

        const service = container.resolve(ShowGroupService);

        const group = await service.execute(groupId);

        const status = generateStatus(false, 200, 'Succesfully showed group!');

        const doc = classToClass(group);

        return res.status(200).json({ status, doc });
    }
}

export { ShowGroupController };

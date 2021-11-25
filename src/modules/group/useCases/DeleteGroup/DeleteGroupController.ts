import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { DeleteGroupService } from './DeleteGroupService';
import { generateStatus } from '@shared/helpers/status';

class DeleteGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const groupId = req.params.id?.toString();

        const service = container.resolve(DeleteGroupService);

        const group = await service.execute(groupId);

        const status = generateStatus(false, 200, 'Succesfully deleted group!');

        const doc = classToClass(group);

        return res.status(200).json({ status, doc });
    }
}

export { DeleteGroupController };

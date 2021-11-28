import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteGroupService } from './DeleteGroupService';
import { generateStatus } from '@shared/helpers/status';

class DeleteGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const groupId = req.params.id?.toString();

        const service = container.resolve(DeleteGroupService);

        const group = await service.execute(groupId);

        const codeStatus = 202;

        const status = generateStatus(false, codeStatus, 'Succesfully deleted group!');

        const doc = classToClass(group);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { DeleteGroupController };

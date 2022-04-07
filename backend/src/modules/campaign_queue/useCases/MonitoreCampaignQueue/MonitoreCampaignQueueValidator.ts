import { Request, Response, NextFunction } from 'express';

class MonitoreCampaignQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        return next();
    }
}

export { MonitoreCampaignQueueValidator };

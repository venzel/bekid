import { injectable, inject } from 'tsyringe';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async handle(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        const { name } = data;

        /* Create campaign */

        const createdCampaign = await this._campaignRepository.create({ name });

        /* Return the campaign created */

        return createdCampaign;
    }
}

export { CreateCampaignService };

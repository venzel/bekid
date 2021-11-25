import { injectable, inject } from 'tsyringe';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateCampaignService {
    constructor(
        @inject('CampaignRepository') private _campaignRepository: ICampaignRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        const { name } = data;

        /* Generate campaign id provider */

        const generateCampaignId = this._generateIdProvider.generateId();

        /* End generate campaign id provider */

        const createdCampaign = await this._campaignRepository.create({ campaign_id: generateCampaignId, name });

        /* Return the campaign created */

        return createdCampaign;
    }
}

export { CreateCampaignService };

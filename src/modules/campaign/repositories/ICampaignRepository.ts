import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';

interface ICampaignRepository {
    findOneById(campaignId: string): Promise<ICampaignEntity | undefined>;

    create(data: ICreateCampaignDTO): Promise<ICampaignEntity>;

    save(campaign: ICampaignEntity): Promise<ICampaignEntity>;

    delete(campaign: ICampaignEntity): Promise<ICampaignEntity>;

    list(): Promise<ICampaignEntity[]>;
}

export { ICampaignRepository };

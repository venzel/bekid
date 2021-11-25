interface ICampaignEntity {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { ICampaignEntity };

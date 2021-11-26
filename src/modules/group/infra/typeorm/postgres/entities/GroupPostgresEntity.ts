import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('GROUPS')
class GroupPostgresEntity implements IGroupEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @DeleteDateColumn()
    public deleted_at: Date | null;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy('hash');
        }
    }
}

export { GroupPostgresEntity };

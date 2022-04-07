import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { GroupPostgresEntity } from '@modules/group/infra/typeorm/postgres/entities/GroupPostgresEntity';
import { idGenerator } from '@shared/helpers/helperIdService';

@Entity('group_queue')
class GroupQueuePostgresEntity implements IGroupQueueEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public group_id: string;

    @ManyToOne(() => GroupPostgresEntity)
    @JoinColumn({ name: 'group_id' })
    public group: GroupPostgresEntity;

    @Column()
    public user_id: string;

    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = idGenerator();
        }
    }
}

export { GroupQueuePostgresEntity };
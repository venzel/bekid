import { Entity, PrimaryColumn, ManyToMany, JoinTable, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';

@Entity('GROUPS')
class GroupPostgresEntity implements IGroupEntity {
    @PrimaryColumn()
    public id: string;

    @ManyToMany(() => UserPostgresEntity)
    @JoinTable({
        name: 'GROUPS_USERS',
        joinColumns: [{ name: 'group_id' }],
        inverseJoinColumns: [{ name: 'user_id' }],
    })
    public users: UserPostgresEntity[];

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
            this.id = GenerateId.strategy();
        }
    }
}

export { GroupPostgresEntity };

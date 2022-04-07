import { Entity, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { idGenerator } from '@shared/helpers/helperIdService';

@Entity('groups')
class GroupPostgresEntity implements IGroupEntity {
    @PrimaryColumn()
    public id: string;

    @Expose({ name: 'manage_id' })
    @Column()
    public user_id: string;

    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @ManyToMany(() => UserPostgresEntity)
    @JoinTable({
        name: 'groups_users',
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

    constructor() {
        if (!this.id) {
            this.id = idGenerator();
        }
    }
}

export { GroupPostgresEntity };
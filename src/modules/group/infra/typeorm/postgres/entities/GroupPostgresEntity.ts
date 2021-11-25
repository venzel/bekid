import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { Expose } from 'class-transformer';

@Entity('GROUPS')
class GroupPostgresEntity implements IGroupEntity {
    @Expose({ name: 'group_id' })
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
}

export { GroupPostgresEntity };

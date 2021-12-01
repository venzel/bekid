import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('actors')
class ActorPostgresEntity implements IActorEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public slug: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy();
        }
    }
}

export { ActorPostgresEntity };
